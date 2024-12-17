import { 
  Controller, 
  Get, 
  Post, 
  Delete,
  Param, 
  Req, 
  Res, 
  UseInterceptors, 
  UploadedFile,
  UseGuards
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

import { DocumentsService } from './documents.service';
import { fileUploadOptions } from '../utils/file-upload';
import { AuthGuard } from '../auth/auth.guard';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseGuards(AuthGuard)  
  @UseInterceptors(FileInterceptor('file', fileUploadOptions))
  async uploadDocument(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const userId = req.user.id; 
    return this.documentsService.uploadDocument(file, userId);
  }

  @Get('list')
  @UseGuards(AuthGuard)  
  async getDocuments(@Req() req) {
    const userId = req.user.id;
    return this.documentsService.getDocumentsByUser(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)  
  async getDocument(@Param('id') docId: number) {
    return this.documentsService.getDocumentById(docId);
  }

  @Get(':id/download')
  @UseGuards(AuthGuard)  
  async downloadDocument(@Param('id') docId: number, @Res() res) {
    const document = await this.documentsService.getDocumentById(docId);
    if (!document) {
      return res.status(404).send('Document not found');
    }
    
    const filePath = path.join(__dirname, '..', '..', 'uploads', `${document.filename}-with-text.txt`);
    const content = `${document.extractedText}\n\nLLM Response:\n${document.llmResponse}`;

    fs.writeFileSync(filePath, content);

    res.download(filePath, `${document.filename}-with-text.txt`, () => {
      fs.unlinkSync(filePath);
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteDocument(@Param('id') docId: number) {
    try {
      return await this.documentsService.deleteDocument(docId);
    } catch (error) {
      throw error;
    }
  }
}