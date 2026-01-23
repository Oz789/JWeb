import './leftSidePanel.css';
import { useNavigate } from 'react-router-dom';



type LeftPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LeftPanel({ isOpen, onClose }: LeftPanelProps) {

  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="leftPanel__backdrop" onClick={onClose} />}

      <aside className={`leftPanel ${isOpen ? 'open' : ''}`}>
        <div className="leftPanel__header">JUPEE</div>

        <nav className="leftPanel__nav">
        <button className="leftPanel__item" onClick={() => { navigate('/'); onClose(); }}>
          ＋ New Chat
        </button>

        <button className="leftPanel__item" onClick={() => { navigate('/classes'); onClose(); }}>
          My Classes
        </button>

        <button className="leftPanel__item" onClick={() => { navigate('/assignments'); onClose(); }}>
          My Assignments
        </button>

        <button className="leftPanel__item" onClick={() => { navigate('/projects'); onClose(); }}>
          Projects
        </button>

        </nav>
      </aside>
    </>
  );
}
