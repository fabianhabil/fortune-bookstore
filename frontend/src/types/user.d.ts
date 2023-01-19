export interface UserDataType {
    alamat: string;
    email: string;
    name: string;
    phone: string;
    role?: number;
    saldo?: number;
    userId?: number;
    tglLahir: Date;
}

export interface UserRegisterType extends UserDataType {
    password: string;
    confirmPassword: string;
}
