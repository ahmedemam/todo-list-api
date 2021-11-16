import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUpdateTodoDto {
    @ApiProperty()
    @IsString()
    title: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    done: boolean;
}