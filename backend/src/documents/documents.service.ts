import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { Document } from '@prisma/client';

import { LlmService } from '../llm/llm.service';
import { OcrService } from '../ocr/ocr.service';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly ocrService: OcrService,
    private readonly llmService: LlmService,
  ) {}

  async uploadDocument(file: Express.Multer.File, userId: number): Promise<Document> {
    const fileUrl = `http://localhost:8000/uploads/${file.filename}`;
    const filePath = path.join(__dirname, '..', '..', 'uploads', file.filename);

    let extractedText: string | null = null;

    if (file.mimetype === 'text/plain') {
      extractedText = await fs.promises.readFile(filePath, 'utf8');
    } else {
      extractedText = await this.ocrService.processOcr(filePath);
    }

    const llmResponse = await this.llmService.getContextOrExplanation(extractedText);

    const document = await this.prismaService.document.create({
      data: {
        userId,
        filename: file.originalname,
        fileUrl,
        extractedText: extractedText || null,
        llmResponse: llmResponse || null,
      },
    });

    fs.unlinkSync(filePath);

    return document;
  }

  async getDocumentsByUser(userId: number): Promise<Document[]> {
    return this.prismaService.document.findMany({
      where: { userId },
    });
  }

  async getDocumentById(docId: number): Promise<Document | null> {
    return this.prismaService.document.findUnique({
      where: { id: Number(docId) },
    });
  }
}
