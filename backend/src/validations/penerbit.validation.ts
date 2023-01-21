import { IsString, MaxLength } from 'class-validator';

export class PenerbitDTO {
    @IsString()
    @MaxLength(64)
    nama!: string;
}
