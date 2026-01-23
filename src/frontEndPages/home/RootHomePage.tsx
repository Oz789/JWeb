import { useRef, useState } from 'react';
import { useChatState } from '../../library/chats/useChatState';
import BrandHeader from '../../components/logoHeader/logoHeader';
import BottomBar from '../../components/bottombar/bottomBar';
import TopLeftControl from '../../components/leftController/leftController';
import LeftSidePanel from '../../components/LeftPanel/leftSidePanel';
import MainChat from '../../components/mainChat/mainChat';
import SubchatPanel from '../../components/subchatPanels/subchatPanel';

import { assistantService, threadOptionsService } from '../../library/services';

import './RootHomePage.css';

export default function RootHomePage() {
  const { state, actions } = useChatState();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState('');
  const activeThread = state.activeThreadId ? state.threadsById[state.activeThreadId] : null;


  function onPickImageClick() {
    fileInputRef.current?.click();
  }

  function onFilePicked(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

   
    actions.addMainMessage(
      'assistant',
      `Image uploaded (${file.name}). I can analyze it or answer questions about it.`,
    );

    e.target.value = '';
  }

async function handleSend() {
  const trimmed = message.trim();
  if (!trimmed) return;

  
  actions.addMainMessage('user', trimmed);
  setMessage('');

  //(mocked for now)
  const assistantText = await assistantService.reply(trimmed);

  const assistantMsg = actions.addMainMessage(
    'assistant',
    assistantText,
  );

  // (mocked for now)
  const suggestions = await threadOptionsService.suggest(assistantText);

  actions.setThreadOptionsForMessage(
    assistantMsg.id,
    suggestions.map((s) => ({
      title: s.title,
      anchorMessageId: assistantMsg.id,
      seedContext: s.seedContext,
    })),
  );
}


return (
  <div className="rootPage">
    <TopLeftControl onClick={() => setIsPanelOpen(true)} />
    <BrandHeader title="JUPEE" />

    <LeftSidePanel
      isOpen={isPanelOpen}
      onClose={() => setIsPanelOpen(false)}
    />

    <MainChat
      messages={state.main}
      optionsByMessageId={state.optionsByMessageId}
      onClickThreadOption={(option) => {
        actions.createAndOpenThread({
          title: option.title,
          anchorMessageId: option.anchorMessageId,
          seedAssistantText: `Let’s focus on: ${option.title}`,
        });
      }}
    />

    <SubchatPanel
  isOpen={!!state.activeThreadId}
  thread={activeThread}
  onClose={() => actions.closeThread()}
  onSendMessage={(threadId, role, text) => {
    actions.addThreadMessage(threadId, role, text);
  }}
/>



    <BottomBar
      message={message}
      onMessageChange={setMessage}
      onUploadClick={onPickImageClick}
      onSend={handleSend}
    />

    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={onFilePicked}
      className="hiddenFileInput"
    />
  </div>
);

}