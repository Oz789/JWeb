import './ThreadChips.css';

export type ThreadChip = {
  id: string;
  title: string;
};

type ThreadChipsProps = {
  chips: ThreadChip[];
  onClickChip: (chipId: string) => void;
};

export default function ThreadChips({ chips, onClickChip }: ThreadChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div className="threadChips">
      {chips.map((c) => (
        <button
          key={c.id}
          className="threadChip"
          type="button"
          onClick={() => onClickChip(c.id)}
        >
          {c.title}
        </button>
      ))}
    </div>
  );
}
