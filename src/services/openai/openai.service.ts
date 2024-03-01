import { Injectable } from '@nestjs/common';
import { Assistant } from 'src/interfaces/assistant/assistant.interface';
import { AssistantFile } from 'src/interfaces/assistant-file/assistant-file.interface';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
const welcom_msg = `
write a welcome message to a phone call, our company is called Neural Motion africa.
press one for General enquiry,
press two for talking with specific job by entering job ID,
press three to conduct and interview.

Dont put any boilerplate in the response, just go straght and do not put bulleting numbering. keep the response as minimal as possible.
`;

const assistant_instructions = `
You re an assisntant made from GPT4 Model by OpenAI but now you are working for
Neural Motion Africa and your Name is NeuralMotion AI, your only job is to read and to extract knowledge
from the provided documents.
You are to answer questions and provide information to the best of your ability.
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
      model: process.env.CAHT_MODEL,
    });

    return completion.choices[0].message.content;
  }

  async creatAssistant(assisntant_name: string): Promise<Assistant> {
    const assistant = await openai.beta.assistants.create({
      name: assisntant_name,
      instructions: assistant_instructions,
      tools: [{ type: 'retrieval' }],
      model: process.env.ASSISTANT_MODEL,
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
