import { IsInt, Min } from 'class-validator';

export class CreateTransaksiDTO {
    @IsInt()
    @Min(0)
    jumlahBuku!: number;

    @IsInt()
    @Min(0)
    total!: number;

    @IsInt()
    bukuId!: number;
}

export class BayarTransaksiDTO {
    @IsInt()
    transaksiId!: number;

    @IsInt()
    bukuId!: number;

    @IsInt()
    @Min(0)
    jumlahBuku!: number;
}

export class EditTransaksiDTO {
    @IsInt()
    transaksiId!: number;

    @IsInt()
    statusTransaksi!: number;
}
