import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

import { SignInDTO, SignUpDTO } from './dtos/auth';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

    async signUp(data: SignUpDTO) {
        const userExists = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            }
        })

        if (userExists) {
            throw new UnauthorizedException('User email already exists!');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.prismaService.user.create({ 
            data: {
                ...data,
                password: hashedPassword,
            } 
        });
        
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
    
    async signIn(data: SignInDTO) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            }
        })

        if (!user) {
            throw new UnauthorizedException('Invalid Credentials!');
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password)
        
        if (!passwordMatch){
            throw new UnauthorizedException('Invalid Credentials!');
        }

        const accessToken = await this.jwtService.signAsync({
            id: user.id,
            name: user.name,
            email: user.email,
        });

        return  {accessToken};
    }
}
