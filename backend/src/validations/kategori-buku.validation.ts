import { IsString, MaxLength } from 'class-validator';

export class KategoriBukuDTO {
    @IsString()
    @MaxLength(64)
    nama!: string;
}
