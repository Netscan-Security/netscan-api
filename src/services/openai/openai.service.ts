import { Injectable } from '@nestjs/common';
import { Assistant } from 'src/interfaces/assistant/assistant.interface';
import { AssistantFile } from 'src/interfaces/assistant-file/assistant-file.interface';
import OpenAI from 'openai';
import config from 'src/config';

const openai = new OpenAI({ apiKey: config.openai.apiKey });
const welcom_msg = `
write a welcome message 
`;

const assistant_instructions = `
You re an assistant made from GPT4 Model by OpenAI but now you are working for
`;

@Injectable()
export class OpenaiService {
  async getHello(): Promise<string> {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'hello' }],
      model: 'gpt-3.5-turbo-0125',
    });

    return completion.choices[0].message.content;
  }

  async welcome(): Promise<string> {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: welcom_msg }],
      model: config.openai.chatModel,
    });

    return completion.choices[0].message.content;
  }

  async creatAssistant(assisntant_name: string): Promise<Assistant> {
    const assistant = await openai.beta.assistants.create({
      name: assisntant_name,
      instructions: assistant_instructions,
      tools: [{ type: 'retrieval' }],
      model: config.openai.assistantModel,
    });

    return {
      assistant_id: assistant.id,
      assistant_name: assistant.name,
    };
  }

  async associateFile(
    assistant_id: string,
    file_id: string,
  ): Promise<AssistantFile> {
    const updateAssistant = await openai.beta.assistants.files.create(
      assistant_id,
      {
        file_id: file_id,
      },
    );

    return {
      id: updateAssistant.id,
      object: updateAssistant.object,
      created_at: updateAssistant.created_at,
      assistant_id: updateAssistant.assistant_id,
    };
  }
}
