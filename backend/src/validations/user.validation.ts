import {
    IsString,
    MaxLength,
    IsEmail,
    IsNumberString,
    IsDateString,
} from 'class-validator';

/**
 * - (?=.*\d) is checking for numbers between 0-9.
 * - (?=.*[A-Z]) is checking for uppercase characters.
 * - (?=.*[a-z]) is checking for lowercase characters.
 * - (?=.*[\\?!@#$%^&*()\-_=+{};:,<>.]) is checking for special characters.
 * - {8,64} means a minimum of 8 characters, and maximum of 64 characters.
 */
// eslint-disable-next-line max-len
// const passwordRegex = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\\?!@#$%^&*()\-_=+{};:,<>.]).{8,64}/;

export class LoginDTO {

    @IsEmail()
    @MaxLength(64)
    email!: string;

    @IsString()
    password!: string;

}

export class RegisterDTO extends LoginDTO {

    @IsString()
    @MaxLength(64)
    name!: string;

    @IsNumberString()
    @MaxLength(32)
    phone!: string;

    @IsString()
    @MaxLength(255)
    alamat!: string;

    @IsDateString()
    tglLahir!: Date;

}