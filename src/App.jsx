import { Route, Routes } from 'react-router-dom';
import HomeView from './pages/HomeView.jsx';
import DashboardView from './pages/DashboardView.jsx';
import LoginView from './pages/LoginView.jsx';
import ResumeBuilderView from './pages/ResumeBuilderView.jsx';
import PreviewView from './pages/PreviewView.jsx';
import MainLayout from './layouts/MainLayout.jsx';

const App = () => {
  return (
  <Routes>
    <Route path="/" element={<HomeView />} />

      <Route path="app" element={<MainLayout />}> 
        <Route index element={<DashboardView />} />
         <Route path="resumebuilder" element={<ResumeBuilderView />} />
      </Route>

      <Route path="/login" element={<LoginView />} />
      <Route path="/view/:resumeId" element={<PreviewView />} />
      

  </Routes>
  );
};
  
export default App;
