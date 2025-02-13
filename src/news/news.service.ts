import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from './news.model';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News) private newsModel: typeof News) {}

  // 🔹 Yangilik yaratish
  async createNews(data: any) {
    return this.newsModel.create(data);
  }

  // 🔹 Barcha yangiliklarni olish
  async getAllNews() {
    return this.newsModel.findAll();
  }

  // 🔹 ID bo'yicha yangilikni olish
  async getNewsById(id: number) {
    const news = await this.newsModel.findByPk(id);
    if (!news) throw new NotFoundException('News not found');
    return news;
  }

  // 🔹 Yangilikni yangilash
  async updateNews(id: number, data: any) {
    const news = await this.getNewsById(id);
    return news.update(data);
  }

  // 🔹 Yangilikni o‘chirish
  async deleteNews(id: number) {
    const news = await this.getNewsById(id);
    await news.destroy();
    return { message: 'News deleted successfully' };
  }

  // 🔹 Rasm yuklash
  async uploadImage(id: number, imagePath: string) {
    const news = await this.getNewsById(id);
    news.image = imagePath;
    return news.save();
  }
}
