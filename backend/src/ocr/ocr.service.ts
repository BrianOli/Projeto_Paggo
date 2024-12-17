import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';
import { fromPath } from 'pdf2pic';

@Injectable()
export class OcrService {
  async processOcr(filePath: string): Promise<string> {
    if (filePath.endsWith('.pdf')) {
      const pdfConverter = fromPath(filePath, {
        density: 300, 
        saveFilename: 'converted', 
        savePath: './uploads', 
        format: 'png',
      });

      const page1 = await pdfConverter(1);
      const imagePath = page1.path;

      return await this.processImage(imagePath);
    }

    return await this.processImage(filePath);
  }

  private async processImage(imagePath: string): Promise<string> {
    try {
      const { data } = await Tesseract.recognize(imagePath, 'eng', {
        logger: (info) => console.log(info),
      });

      return data.text;
    } catch (error) {
      console.error('Erro ao processar a imagem:', error);
      throw new Error('Não foi possível processar a imagem.');
    }
  }
}
