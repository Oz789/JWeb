import { useRef, useState } from 'react';
import BrandHeader from '../../components/logoHeader/logoHeader';
import BottomBar from '../../components/bottombar/bottomBar';
import TopLeftControl from '../../components/leftController/leftController';
import './RootHomePage.css';

type QuestionCard = {
  id: string;
  title: string;
  status?: 'unanswered' | 'in_progress' | 'done';
};

export default function RootHomePage() {
  const [message, setMessage] = useState('');
  const [questions, setQuestions] = useState<QuestionCard[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function onPickImageClick() {
    fileInputRef.current?.click();
  }

  function onFilePicked(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setQuestions([
      { id: 'q1', title: '1) Problem 1', status: 'unanswered' },
      { id: 'q2', title: '2) Problem 2', status: 'unanswered' },
      { id: 'q3', title: '3) Problem 3', status: 'unanswered' },
    ]);

    e.target.value = '';
  }

  return (
    <div className="rootPage">
      <TopLeftControl onClick={() => console.log('Open sidebar')} />
        <BrandHeader />

      <main className="rootMain">
        {}
      </main>

      <BottomBar
        message={message}
        onMessageChange={setMessage}
        onUploadClick={onPickImageClick}
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
