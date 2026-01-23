import { useEffect, useMemo, useRef, useState } from 'react';
import type { Thread } from '../../types/chat';
import { assistantService } from '../../library/services';
import './SubchatPanel.css';

type SubchatPanelProps = {
  isOpen: boolean;
  thread: Thread | null;
  onClose: () => void;

  onSendMessage: (threadId: string, role: 'user' | 'assistant', text: string) => void;
};

export default function SubchatPanel({
  isOpen,
  thread,
  onClose,
  onSendMessage,
}: SubchatPanelProps) {
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  const title = useMemo(() => thread?.title ?? 'Subchat', [thread?.title]);

  useEffect(() => {
    if (!isOpen) setText('');
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread?.messages.length, isOpen]);

  async function handleSend() {
    if (!thread) return;
    const trimmed = text.trim();
    if (!trimmed) return;

    onSendMessage(thread.id, 'user', trimmed);
    setText('');

    const assistantText = await assistantService.reply(trimmed);
    onSendMessage(thread.id, 'assistant', assistantText);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSend();
  }

  return (
    <>
      <div className={`subchatOverlay ${isOpen ? 'isOpen' : ''}`} onClick={onClose} />
      <aside className={`subchatPanel ${isOpen ? 'isOpen' : ''}`}>
        <header className="subchatHeader">
          <button className="subchatBackBtn" onClick={onClose} type="button">
            ← Back
          </button>
          <div className="subchatTitle">{title}</div>
          <div className="subchatHeaderSpacer" />
        </header>

        <div className="subchatBody">
          {!thread ? (
            <div className="subchatEmpty">No thread selected.</div>
          ) : thread.messages.length === 0 ? (
            <div className="subchatEmpty">Start this subchat…</div>
          ) : (
            thread.messages.map((m) => (
              <div
                key={m.id}
                className={`subchatMsg ${m.role === 'user' ? 'isUser' : 'isAssistant'}`}
              >
                <div className="subchatBubble">{m.text}</div>
              </div>
            ))
          )}
          <div ref={endRef} />
        </div>

        <footer className="subchatComposer">
          <input
            className="subchatInput"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Message subchat…"
          />
          <button className="subchatSendBtn" onClick={handleSend} type="button" aria-label="Send">
            ↑
          </button>
        </footer>
      </aside>
    </>
  );
}
