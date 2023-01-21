import {
    IsDateString,
    IsDecimal,
    IsEnum,
    IsNumber,
    IsString,
    MaxLength
} from 'class-validator';
import { BahasaBuku } from '../database/entities/buku.entity';
import { Double } from 'typeorm';

export class EditBukuDTO {
    @IsString()
    @MaxLength(64)
    nama!: string;

    @IsString()
    @MaxLength(128)
    deskripsi!: string;

    @IsNumber()
    harga!: number;

    @IsNumber()
    stok!: number;

    @IsNumber()
    jumlahHalaman!: number;

    @IsDecimal()
    berat!: Double;

    @IsDecimal()
    lebar!: Double;

    @IsDecimal()
    panjang!: Double;
}

export class CreateBukuDTO extends EditBukuDTO {
    @IsDateString()
    tanggalTerbit!: Date;

    @IsEnum(BahasaBuku)
    bahasa!: BahasaBuku;

    @IsString()
    penerbitId!: string;

    @IsNumber()
    kategoriBukuId!: number;
}
