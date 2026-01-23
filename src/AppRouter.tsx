import { Routes, Route, Navigate } from 'react-router-dom';
import RootHomePage from './frontEndPages/home/RootHomePage';
import MyClassesPage from './frontEndPages/myClasses/MyClassesPage';
import MyAssignmentsPage from './frontEndPages/myAssignments/MyAssignmentsPage';
import ProjectsPage from './frontEndPages/projects/MyProjectsPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RootHomePage />} />
      <Route path="/classes" element={<MyClassesPage />} />
      <Route path="/assignments" element={<MyAssignmentsPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
