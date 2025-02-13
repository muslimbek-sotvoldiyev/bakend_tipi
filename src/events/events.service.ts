import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from './events.model';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event) private eventModel: typeof Event) {}

  // 🔹 Event yaratish
  async createEvent(data: any) {
    return this.eventModel.create(data);
  }

  // 🔹 Barcha eventlarni olish
  async getAllEvents() {
    return this.eventModel.findAll();
  }

  // 🔹 ID bo‘yicha eventni olish
  async getEventById(id: number) {
    const event = await this.eventModel.findByPk(id);
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  // 🔹 Eventni yangilash
  async updateEvent(id: number, data: any) {
    const event = await this.getEventById(id);
    return event.update(data);
  }

  // 🔹 Eventni o‘chirish
  async deleteEvent(id: number) {
    const event = await this.getEventById(id);
    await event.destroy();
    return { message: 'Event deleted successfully' };
  }

  // 🔹 Rasm yuklash
  async uploadImage(id: number, imagePath: string) {
    const event = await this.getEventById(id);
    event.image = imagePath;
    return event.save();
  }
}
