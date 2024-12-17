import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { Document } from '@prisma/client';

import { LlmService } from '../llm/llm.service';
import { OcrService } from '../ocr/ocr.service';

@Injectable()
export class DocumentsService {
  private acceptedFormats = ['.png', '.jpg', '.jpeg', '.bmp', '.tiff', '.txt']; 

  constructor(
    private readonly prismaService: PrismaService,
    private readonly ocrService: OcrService,
    private readonly llmService: LlmService,
  ) {}

  private validateFileFormat(file: Express.Multer.File): boolean {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    return this.acceptedFormats.includes(fileExtension);
  }

  async uploadDocument(file: Express.Multer.File, userId: number): Promise<Document> {
    if (!this.validateFileFormat(file)) {
      fs.unlinkSync(path.join(__dirname, '..', '..', 'uploads', file.filename));
      throw new Error('Formato de arquivo não suportado. Use PNG, JPG, JPEG, BMP, TIFF ou TXT.');
    }

    const fileUrl = `http://localhost:8000/uploads/${file.filename}`;
    const filePath = path.join(__dirname, '..', '..', 'uploads', file.filename);

    let extractedText: string | null = null;

    try {
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

    } catch (err) {
      console.error('Erro no processamento do arquivo:', err.message);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      throw new Error('Erro ao processar o arquivo. Tente novamente mais tarde.');
    }
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

  async deleteDocument(docId: number) {
    const document = await this.prismaService.document.findUnique({
      where: { id: Number(docId) },
    });

    if (!document) {
      throw new NotFoundException('Documento não encontrado');
    }

    await this.prismaService.document.delete({
      where: { id: Number(docId) },
    });

    return { message: 'Documento deletado com sucesso!' };
  }
}
