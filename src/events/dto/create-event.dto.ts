import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEventDto {
   @IsString()
   @IsNotEmpty()
   name: string

   @IsString()
   @IsNotEmpty()
   date: string

   @IsString()
   @IsNotEmpty()
   description: string

   @IsOptional()
   @IsString()
   image?: string; 
}
