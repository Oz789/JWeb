export type Role = 'user' | 'assistant';

export type Message = {
  id: string;
  role: Role;
  text: string;
  createdAt: number;
};

export type ThreadOption = {
  id: string;
  title: string;
  anchorMessageId: string; 
  seedContext?: string;    
};


export type Thread = {
  id: string;
  title: string;
  anchorMessageId: string;
  messages: Message[];
  createdAt: number;
};

/**
 * One "workspace" chat: a main chat plus any number of subchat threads
 */
export type ChatState = {
  main: Message[];
  threadsById: Record<string, Thread>;
  optionsByMessageId: Record<string, ThreadOption[]>;
  activeThreadId: string | null;
};
