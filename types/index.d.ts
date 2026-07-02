interface Job {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
}

interface Resume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: Feedback;
  createdAt?: number;
}

interface FSItem {
  id?: string;
  name: string;
  path: string;
  type?: string;
  size?: number;
  createdAt?: number;
  updatedAt?: number;
}

interface PuterUser {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  [key: string]: unknown;
}

interface ChatMessage {
  role: string;
  content:
    | string
    | Array<{
        type?: string;
        text?: string;
        puter_path?: string;
        [key: string]: unknown;
      }>;
}

interface PuterChatOptions {
  model?: string;
  [key: string]: unknown;
}

interface AIResponse {
  message?: {
    content: string | Array<{ text?: string; [key: string]: unknown }>;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface KVItem {
  key: string;
  value?: string;
  [key: string]: unknown;
}

interface Feedback {
  overallScore: number;
  ATS: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
    }[];
  };
  toneAndStyle: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  content: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  structure: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  skills: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
}
