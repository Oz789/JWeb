import { useMemo, useState } from 'react';
import type { ChatState, Message, Role, Thread, ThreadOption } from '../../types/chat';

function uid() {
  return crypto.randomUUID();
}

function now() {
  return Date.now();
}

export function useChatState() {
  const [state, setState] = useState<ChatState>({
    main: [],
    threadsById: {},
    optionsByMessageId: {},
    activeThreadId: null,
  });

  const actions = useMemo(() => {
    return {
    
      reset: () => {
        setState({
          main: [],
          threadsById: {},
          optionsByMessageId: {},
          activeThreadId: null,
        });
      },

      
      addMainMessage: (role: Role, text: string) => {
        const msg: Message = { id: uid(), role, text, createdAt: now() };
        setState((s) => ({ ...s, main: [...s.main, msg] }));
        return msg;
      },

     
      setThreadOptionsForMessage: (anchorMessageId: string, options: Omit<ThreadOption, 'id'>[]) => {
        const normalized: ThreadOption[] = options.map((o) => ({
          id: uid(),
          ...o,
          anchorMessageId,
        }));

        setState((s) => ({
          ...s,
          optionsByMessageId: {
            ...s.optionsByMessageId,
            [anchorMessageId]: normalized,
          },
        }));

        return normalized;
      },

     
      createAndOpenThread: (params: { title: string; anchorMessageId: string; seedAssistantText?: string }) => {
        const threadId = uid();

        const starterMessages: Message[] = params.seedAssistantText
          ? [{ id: uid(), role: 'assistant', text: params.seedAssistantText, createdAt: now() }]
          : [];

        const thread: Thread = {
          id: threadId,
          title: params.title,
          anchorMessageId: params.anchorMessageId,
          messages: starterMessages,
          createdAt: now(),
        };

        setState((s) => ({
          ...s,
          threadsById: { ...s.threadsById, [threadId]: thread },
          activeThreadId: threadId,
        }));

        return thread;
      },

      
      openThread: (threadId: string) => {
        setState((s) => ({ ...s, activeThreadId: threadId }));
      },

    
      closeThread: () => {
        setState((s) => ({ ...s, activeThreadId: null }));
      },

     
      addThreadMessage: (threadId: string, role: Role, text: string) => {
        const msg: Message = { id: uid(), role, text, createdAt: now() };

        setState((s) => {
          const thread = s.threadsById[threadId];
          if (!thread) return s;

          return {
            ...s,
            threadsById: {
              ...s.threadsById,
              [threadId]: { ...thread, messages: [...thread.messages, msg] },
            },
          };
        });

        return msg;
      },

      
      getActiveThread: (s: ChatState) => {
        if (!s.activeThreadId) return null;
        return s.threadsById[s.activeThreadId] ?? null;
      },
    };
  }, []);

  return { state, actions };
}
