import type { ThreadOptionsService } from '../library/services/threadOptions';
export const mockThreadOptionsService: ThreadOptionsService = {
  async suggest(_text: string) {
    return [
      { title: 'Explain in simpler terms' },
      { title: 'Give an example' },
      { title: 'Key terms & definitions' },
      { title: 'Common mistakes to avoid' },
    ];
  },
};
