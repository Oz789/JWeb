import TopLeftControl from '../../components/leftController/leftController';
import LogoHeader from '../../components/logoHeader/logoHeader';
import BottomBar from '../../components/bottombar/bottomBar';
import LeftSidePanel from '../../components/LeftPanel/leftSidePanel';
import './mainPageLayouts.css';

type PageLayoutProps = {
  headerTitle: string;

  // drawer
  isPanelOpen: boolean;
  onOpenPanel: () => void;
  onClosePanel: () => void;

  // chat bar 
  showBottomBar?: boolean;
  message?: string;
  onMessageChange?: (v: string) => void;
  onUploadClick?: () => void;
  onSend?: () => void;

  //header
  showHeaderDivider?: boolean;
  children: React.ReactNode;
};

export default function PageLayout({
  headerTitle,
  isPanelOpen,
  onOpenPanel,
  onClosePanel,
  showBottomBar = true,
  message = '',
  onMessageChange = () => {},
  onUploadClick = () => {},
  onSend = () => {},
  showHeaderDivider = false,
  children,
}: PageLayoutProps) {
  return (
    <div className="pageLayout">
      <TopLeftControl onClick={onOpenPanel} />
      <LogoHeader title={headerTitle} />

      {showHeaderDivider ? <div className="headerDivider" /> : null}

      <LeftSidePanel isOpen={isPanelOpen} onClose={onClosePanel} />

      <main className="pageMain">{children}</main>

      {showBottomBar ? (
        <BottomBar
          message={message}
          onMessageChange={onMessageChange}
          onUploadClick={onUploadClick}
          onSend={onSend}
          
        />
      ) : null}
    </div>
  );
}
