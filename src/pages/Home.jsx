import React, { useState } from 'react';
import { Heart, Upload, Activity, Clock, LogOut } from 'lucide-react';
import  UploadReport  from './UploadReport';
import  ReportsList  from './ReportsList';
import  ManualVitals  from './ManualVitals';
import  Timeline from './Timeline';
import  ReportDetails  from './ReportDetails';

const Home = () => {
  const [currentView, setCurrentView] = useState('reports');

  const handleSignOut = () => {
    // You can replace this with your own logout logic
    localStorage.removeItem('authToken');
    window.location.href = '/signin';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HealthMate</h1>
                <p className="text-xs text-gray-600">Your Health Companion</p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-8 bg-white rounded-xl shadow-sm p-2 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setCurrentView('reports')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              currentView === 'reports'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Reports</span>
          </button>

          <button
            onClick={() => setCurrentView('upload')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              currentView === 'upload'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>

          <button
            onClick={() => setCurrentView('vitals')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              currentView === 'vitals'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Add Vitals</span>
          </button>

          <button
            onClick={() => setCurrentView('timeline')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              currentView === 'timeline'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Timeline</span>
          </button>
        </nav>

        <div className="transition-all duration-300">
          {currentView === 'reports' && <ReportsList />}
          {currentView === 'upload' && <UploadReport />}
          {currentView === 'vitals' && <ManualVitals />}
          {currentView === 'timeline' && <Timeline />}
        </div>
      </div>
    </div>
  );
};

export default Home;
