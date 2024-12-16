import { IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";

export class SignUpDTO {
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class SignInDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}