import { Module } from '@nestjs/common';

import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { OcrService } from '../ocr/ocr.service';
import { LlmService } from '../llm/llm.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [DocumentsController],
  providers: [DocumentsService, OcrService, LlmService, PrismaService],
})
export class DocumentsModule {}
