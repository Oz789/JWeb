import type { AssistantService } from '../library/services/assistant';

export const mockAssistantService: AssistantService = {
  async reply(userText: string) {
    await new Promise((r) => setTimeout(r, 600));
    return `Mock reply: I understand your question about "${userText}".`;
  },
};
