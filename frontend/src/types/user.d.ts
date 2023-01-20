export interface UserDataType {
    userId?: number;
    name: string;
    email: string;
    alamat: string;
    saldo?: number;
    tglLahir: Date;
    phone: string;
    role?: number;
}

export interface UserRegisterType extends UserDataType {
    password: string;
    confirmPassword: string;
}
