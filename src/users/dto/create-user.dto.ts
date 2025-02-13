import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
   @IsString()
   @IsNotEmpty()
   full_name: string

   @IsString()
   @IsEmail()
   @IsNotEmpty()
   email: string

   @IsString()
   @IsNotEmpty()
   password: string

   @IsString()
   @IsNotEmpty()
   role: string

   @IsOptional()
   @IsString()
   avatar?: string; 

}
