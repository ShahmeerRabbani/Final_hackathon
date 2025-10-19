import React, { useEffect, useState } from 'react';
import { FileText, Calendar, Loader, AlertCircle, ExternalLink } from 'lucide-react';
import ReportDetails from './ReportDetails';
import axios from 'axios';

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  // Simulate fetching reports
  useEffect(() => {
    setTimeout(() => {
      setReports([
        {
          id: 1,
          title: 'Blood Test Report - July',
          report_type: 'blood_test',
          report_date: '2025-07-20',
          file_path: 'reports/bloodtest-july.pdf',
          ai_summary: {
            summary_english: 'Your blood test results are mostly normal with slightly low Vitamin D.',
            summary_urdu: 'Aap ke test results aam tor par normal hain, Vitamin D thoda kam hai.',
            abnormal_values: ['Low Vitamin D level'],
            questions_for_doctor: ['Should I take Vitamin D supplements?', 'Any dietary changes needed?'],
            foods_to_avoid: ['Processed foods', 'Sugary drinks'],
            foods_to_eat: ['Leafy greens', 'Fatty fish', 'Egg yolks'],
            home_remedies: ['Morning sunlight exposure', 'Daily walk for 20 mins'],
          },
        },
        {
          id: 2,
          title: 'X-Ray Chest Report',
          report_type: 'xray',
          report_date: '2025-06-15',
          file_path: 'reports/xray-chest.pdf',
          ai_summary: {
            summary_english: 'X-ray shows mild congestion. No serious abnormality detected.',
            abnormal_values: ['Mild congestion in upper lobe'],
            foods_to_eat: ['Warm fluids', 'Honey with ginger'],
            home_remedies: ['Steam inhalation', 'Avoid cold drinks'],
          },
        },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const getReportTypeLabel = (type) => {
    const labels = {
      blood_test: 'Blood Test',
      xray: 'X-Ray',
      ultrasound: 'Ultrasound',
      prescription: 'Prescription',
      other: 'Other',
    };
    return labels[type] || type;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (selectedReport) {
    return <ReportDetails report={selectedReport} onClose={() => setSelectedReport(null)} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-red-800">{error}</p>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reports Yet</h3>
        <p className="text-gray-600">
          Abhi tak koi report upload nahi hui. Upload tab se apni pehli report add karen.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Medical Reports</h2>
        <p className="text-gray-600">Apni saari reports yahan dekhen</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer p-5 border border-gray-100 group"
            onClick={() => setSelectedReport(report)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                {getReportTypeLabel(report.report_type)}
              </span>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
              {report.title}
            </h3>

            <div className="flex items-center text-sm text-gray-600 mb-3">
              <Calendar className="w-4 h-4 mr-1.5" />
              {formatDate(report.report_date)}
            </div>

            {report.ai_summary?.summary_english && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {report.ai_summary.summary_english}
              </p>
            )}

            <div className="flex items-center text-sm text-emerald-600 font-medium group-hover:gap-2 transition-all">
              <span>View Details</span>
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsList;
