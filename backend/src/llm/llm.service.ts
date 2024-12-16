import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class LlmService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Certifique-se de ter sua chave da OpenAI no .env
    });
  }

  async getContextOrExplanation(extractedText: string): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um assistente que fornece contexto e explicações.',
        },
        {
          role: 'user',
          content: `Forneça contexto ou uma explicação para o seguinte texto: ${extractedText}`,
        },
      ],
    });

    return completion.choices[0].message.content.trim();
  }
}
