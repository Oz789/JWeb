export type AssistantService = {
  reply(userText: string): Promise<string>;
};
