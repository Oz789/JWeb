import { useEffect, useMemo, useRef } from 'react';
import type { Thread } from '../../types/chat';
import './SubchatCanvas.css';

type Props = {
  thread: Thread | null;
  onBack: () => void;
};

export default function SubchatCanvas({ thread, onBack }: Props) {
  const endRef = useRef<HTMLDivElement | null>(null);
  const title = useMemo(() => thread?.title ?? 'Subchat', [thread?.title]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread?.messages.length]);

  return (
    <div className="subchatCanvas">
      <header className="subchatCanvas__header">
        <button className="subchatCanvas__backBtn" onClick={onBack} type="button">
          ← Back
        </button>
        <div className="subchatCanvas__title">{title}</div>
        <div className="subchatCanvas__spacer" />
      </header>

      <div className="subchatCanvas__body">
        {!thread ? (
          <div className="subchatCanvas__empty">No thread selected.</div>
        ) : thread.messages.length === 0 ? (
          <div className="subchatCanvas__empty">Start this subchat…</div>
        ) : (
          thread.messages.map((m) => (
            <div
              key={m.id}
              className={`subchatCanvas__msg ${m.role === 'user' ? 'isUser' : 'isAssistant'}`}
            >
              <div className="subchatCanvas__bubble">{m.text}</div>
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}
