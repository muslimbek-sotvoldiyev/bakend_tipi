import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'events' })
export class Event extends Model<Event> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  date: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
  
  @Column({ type: DataType.STRING, allowNull: false })
  image: string;
}
