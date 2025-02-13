import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNewsDto {
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
