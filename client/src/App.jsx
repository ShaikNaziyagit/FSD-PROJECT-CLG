import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import GlobalCampus3DBackground from './components/three/GlobalCampus3DBackground';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <div className="relative min-h-screen text-slate-100 bg-[#0c0a08] selection:bg-orange-500/35 selection:text-orange-100">
            {/* Live 3D Realistic Campus Building background running for entire application */}
            <GlobalCampus3DBackground />

            {/* Application Content Routes */}
            <div className="relative z-10 min-h-screen flex flex-col">
              <AppRoutes />
            </div>
          </div>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
