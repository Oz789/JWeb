export type ThreadSuggestion = {
  title: string;
  seedContext?: string;
};

export type ThreadOptionsService = {
  suggest(text: string): Promise<ThreadSuggestion[]>;
};
