import './leftController.css';

type TopLeftControlProps = {
  onClick?: () => void;
};

export default function TopLeftControl({ onClick }: TopLeftControlProps) {
  return (
    <button
      className="topLeftControl"
      onClick={onClick}
      aria-label="Open navigation"
    >
      ≡
    </button>
  );
}
