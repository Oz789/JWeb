import { useEffect, useRef } from 'react';
import type { Message, ThreadOption } from '../../types/chat';
import ThreadChips from '../threadChips/threadChips';
import './MainChat.css';

type MainChatProps = {
  messages: Message[];
  optionsByMessageId: Record<string, ThreadOption[]>;
  onClickThreadOption: (option: ThreadOption) => void;
};

export default function MainChat({
  messages,
  optionsByMessageId,
  onClickThreadOption,
}: MainChatProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className="mainChat">
      <div className="mainChat__list">
        {messages.length === 0 ? (
          <div className="mainChat__empty">Start a conversation…</div>
        ) : (
          messages.map((m) => {
            const opts = optionsByMessageId[m.id] ?? [];
            const showChips = m.role === 'assistant' && opts.length > 0;

            return (
              <div
                key={m.id}
                className={`mainChat__msgBlock ${
                  m.role === 'user' ? 'isUser' : 'isAssistant'
                }`}
              >
                <div
                  className={`mainChat__msg ${
                    m.role === 'user' ? 'isUser' : 'isAssistant'
                  }`}
                >
                  <div className="mainChat__bubble">{m.text}</div>
                </div>

                {showChips ? (
                  <ThreadChips
                    chips={opts.map((o) => ({ id: o.id, title: o.title }))}
                    onClickChip={(chipId) => {
                      const found = opts.find((o) => o.id === chipId);
                      if (found) onClickThreadOption(found);
                    }}
                  />
                ) : null}
              </div>
            );
          })
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}
