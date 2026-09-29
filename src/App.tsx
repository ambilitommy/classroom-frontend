import {
  Refine,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { dataProvider } from "./providers/data";
import { Layout } from "./components/refine-ui/layout/layout";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import "./App.css";
import Dashboard from "./pages/dashboard";
import { BookOpen, GraduationCap, Home } from "lucide-react";
import SubjectsList from "./pages/subjects/list";
import SubjectsCreate from "./pages/subjects/create";
import DepartmentsList from "./pages/departments/list";
import DepartmentViewPage from "./pages/departments/view";
import ClassList from "./pages/classes/list";
import ClassCreate from "./pages/classes/create";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "qPVlmY-DyfUzT-g8lPHl",
              }}
              resources={[
                { name: 'dashboard', list: '/', meta: { label: 'Home', icon: <Home /> } },
                { name: 'departments', list: '/departments', create: '/departments/create', show: '/departments/:id', meta: { label: 'Departments', icon: <BookOpen /> } },
                { name: 'subjects', list: '/subjects', create: '/subjects/create', meta: { label: 'Subjects', icon: <BookOpen /> } },
                { name: 'classes', list: '/classes', create: '/classes/create', meta: { label: 'Classes', icon: <GraduationCap /> } },
              ]}
            >
              <Routes>
                <Route element={
                  <Layout><Outlet /></Layout>
                }>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="departments">
                    <Route index element={<DepartmentsList />} />
                    <Route path=":id" element={<DepartmentViewPage />} />
                  </Route>
                  <Route path="subjects">
                    <Route index element={<SubjectsList />} />
                    <Route index element={<SubjectsCreate />} />
                  </Route>
                  <Route path="classes">
                    <Route index element={<ClassList />} />
                    <Route path="create" element={<ClassCreate />} />
                  </Route>
                </Route>
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
