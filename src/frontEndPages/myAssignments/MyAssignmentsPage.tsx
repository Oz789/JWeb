import { useState } from 'react';
import PageLayout from '../../components/layouts/mainPageLayouts';

export default function MyAssignmentsPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <PageLayout
      headerTitle="My Assignments"
      isPanelOpen={isPanelOpen}
      onOpenPanel={() => setIsPanelOpen(true)}
      onClosePanel={() => setIsPanelOpen(false)}
      showBottomBar={false}
      showHeaderDivider={true}
    >
      <div style={{ padding: 24 }}>
        {/* assignments list goes here */}
      </div>
    </PageLayout>
  );
}
