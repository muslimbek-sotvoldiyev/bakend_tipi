import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Bunday email mavjud!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    } as CreationAttributes<User>);

    return { message: 'Foydalanuvchi ro‘yxatdan o‘tdi', user };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Email yoki parol noto‘g‘ri!');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email yoki parol noto‘g‘ri!');
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { message: 'Muvaffaqiyatli login', token };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');
    return user;
  }

  async updateUser(id: number, updateUserDto: Partial<CreateUserDto>) {
    const user = await this.findOne(id);
    await user.update(updateUserDto);
    return user.reload();
  }

  async deleteUser(id: number) {
    const user = await this.findOne(id);
    await user.destroy();
    return { message: 'Foydalanuvchi o‘chirildi' };
  }

  async uploadAvatar(id: number, filePath: string) {
    const user = await this.findOne(id);
    user.avatar = filePath;
    await user.save();
    return { message: 'Avatar yuklandi', avatar: filePath };
  }
}
