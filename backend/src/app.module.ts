import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { DocumentsModule } from './documents/documents.module';
import { OcrModule } from './ocr/ocr.module';
import { LlmModule } from './llm/llm.module';

@Module({
  imports: [
    AuthModule,
    DocumentsModule,
    OcrModule,
    LlmModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
