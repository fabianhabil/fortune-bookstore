import {
    IsDateString,
    IsDecimal,
    IsEnum,
    IsNumber,
    IsString,
    MaxLength
} from 'class-validator';
import { BahasaBuku } from '../database/entities/buku.entity';

export class EditBukuDTO {
    @IsString()
    @MaxLength(64)
    name!: string;

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
    berat!: number;

    @IsDecimal()
    lebar!: number;

    @IsDecimal()
    panjang!: number;
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
