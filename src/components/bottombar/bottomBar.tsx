import './BottomBar.css';

type BottomBarProps = {
  message: string;
  onMessageChange: (v: string) => void;
  onUploadClick: () => void;
  onSend: () => void;
};

export default function BottomBar({
  message,
  onMessageChange,
  onUploadClick,
  onSend,
}: BottomBarProps) {
  return (
    <footer className="bottomBar">
      <button
        className="bottomBar__uploadBtn"
        onClick={onUploadClick}
        aria-label="Upload"
      >
        Upload <span className="bottomBar__plus">+</span>
      </button>

      <div className="bottomBar__inputWrap">
        <input
          className="bottomBar__textInput"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSend();
          }}
          placeholder="Ask a question..."
        />
      </div>
    </footer>
  );
}
