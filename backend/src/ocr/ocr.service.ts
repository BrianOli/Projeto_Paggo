import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';

@Injectable()
export class OcrService {
  async processOcr(filePath: string): Promise<string> {
    try {
      const { data: { text } } = await Tesseract.recognize(
        filePath,
        'eng',
        {
          logger: (m) => console.log(m),
        },
      );
      return text;
    } catch (error) {
      console.error('Error processing OCR:', error);
      throw new Error('Failed to process OCR');
    }
  }
}
