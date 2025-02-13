import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewsService } from './news.service';
import {Multer} from "multer"
import { storage } from 'src/upload/upload.config';
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  async createNews(@Body() data: any) {
    return this.newsService.createNews(data);
  }

  @Get()
  async getAllNews() {
    return this.newsService.getAllNews();
  }

  @Get(':id')
  async getNewsById(@Param('id') id: string) {
    return this.newsService.getNewsById(Number(id));
  }

  @Put(':id')
  async updateNews(@Param('id') id: string, @Body() data: any) {
    return this.newsService.updateNews(Number(id), data);
  }

  @Delete(':id')
  async deleteNews(@Param('id') id: string) {
    return this.newsService.deleteNews(Number(id));
  }

  @Post(':id/upload-image')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async uploadImage(@Param('id') id: string, @UploadedFile() file: Multer.File) {
    return this.newsService.uploadImage(Number(id), file.filename);
  }
}
