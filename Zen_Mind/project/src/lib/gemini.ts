import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDkUIP2nnVhRF61BOOA2XOS_uenKkYK49c';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getChatResponse(message: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: 'act as my therapist and mental health specialist in the chat from now',
        },
        {
          role: 'model',
          parts: "I'll be your therapeutic support, offering a safe space for discussion and guidance. How can I help you today?",
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in chat response:', error);
    return 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.';
  }
}