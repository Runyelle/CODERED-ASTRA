import { Company } from '@/types/company';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export async function getAllCompanies(): Promise<Company[]> {
  const response = await fetch(`${API_BASE_URL}/companies/demo`);
  if (!response.ok) {
    throw new Error('Failed to fetch companies');
  }
  return response.json();
}

export async function getCompanyById(id: number): Promise<Company> {
  const response = await fetch(`${API_BASE_URL}/companies/demo/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch company');
  }
  return response.json();
}

export interface ChatMessage {
  question: string;
}

export interface ChatResponse {
  answer: string;
}

export async function askAboutCompanies(question: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });
  if (!response.ok) {
    throw new Error('Failed to get answer');
  }
  const data: ChatResponse = await response.json();
  return data.answer;
}
