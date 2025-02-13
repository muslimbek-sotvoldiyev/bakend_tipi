import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/upload/upload.config';
import { EventsService } from './events.service';
import {Multer} from "multer"

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async createEvent(@Body() data: any) {
    return this.eventsService.createEvent(data);
  }

  @Get()
  async getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Get(':id')
  async getEventById(@Param('id') id: string) {
    return this.eventsService.getEventById(Number(id));
  }

  @Put(':id')
  async updateEvent(@Param('id') id: string, @Body() data: any) {
    return this.eventsService.updateEvent(Number(id), data);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    return this.eventsService.deleteEvent(Number(id));
  }

  @Post(':id/upload-image')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async uploadImage(@Param('id') id: string, @UploadedFile() file: Multer.File) {
    return this.eventsService.uploadImage(Number(id), file.filename);
  }
}
