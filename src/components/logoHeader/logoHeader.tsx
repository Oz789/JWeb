import './logoHeader.css';

type LogoHeaderProps = {
  title: string;
};

export default function LogoHeader({ title }: LogoHeaderProps) {
  return <div className="logoHeader">{title}</div>;
}
