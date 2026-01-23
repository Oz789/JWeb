import { useState } from 'react';
import PageLayout from '../../components/layouts/mainPageLayouts';

export default function MyClassesPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <PageLayout
      headerTitle="My Classes"
      isPanelOpen={isPanelOpen}
      onOpenPanel={() => setIsPanelOpen(true)}
      onClosePanel={() => setIsPanelOpen(false)}
      showBottomBar={false}
      showHeaderDivider={true}
    >
      <div style={{ padding: 24 }}>
        {/* classes list goes here */}
      </div>
    </PageLayout>
  );
}
