import React, { useEffect, useState } from 'react';
import { Calendar, FileText, Activity, Loader, AlertCircle } from 'lucide-react';

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    try {
      // Simulate API delay
      setTimeout(() => {
        const mockReports = [
          {
            id: 1,
            date: '2025-10-15',
            type: 'report',
            data: {
              title: 'Blood Test Report',
              report_type: 'blood_test',
              ai_summary: {
                summary_english: 'Your blood test shows normal results.',
                summary_urdu: 'Aapka khoon test bilkul normal hai.',
              },
            },
          },
          {
            id: 2,
            date: '2025-10-10',
            type: 'vital',
            data: {
              vitals_data: {
                bp_systolic: 120,
                bp_diastolic: 80,
                weight: 70,
                heart_rate: 72,
              },
              notes: 'All readings normal',
            },
          },
        ];

        setTimeline(mockReports);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load timeline');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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

  const formatVitalsData = (vitalsData) => {
    const parts = [];
    if (vitalsData.bp_systolic && vitalsData.bp_diastolic) {
      parts.push(`BP: ${vitalsData.bp_systolic}/${vitalsData.bp_diastolic}`);
    }
    if (vitalsData.blood_sugar) {
      parts.push(`Sugar: ${vitalsData.blood_sugar} mg/dL`);
    }
    if (vitalsData.weight) {
      parts.push(`Weight: ${vitalsData.weight} kg`);
    }
    if (vitalsData.temperature) {
      parts.push(`Temp: ${vitalsData.temperature}°F`);
    }
    if (vitalsData.heart_rate) {
      parts.push(`HR: ${vitalsData.heart_rate} bpm`);
    }
    if (vitalsData.oxygen_level) {
      parts.push(`O2: ${vitalsData.oxygen_level}%`);
    }
    return parts.join(' • ');
  };

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

  if (timeline.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Timeline Entries Yet</h3>
        <p className="text-gray-600">Upload reports or add vitals to see your health timeline.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Health Timeline</h2>
        <p className="text-gray-600">View your complete health history</p>
      </div>

      <div className="space-y-4">
        {timeline.map((entry, index) => (
          <div key={entry.id} className="relative">
            {index !== timeline.length - 1 && (
              <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gray-200" />
            )}

            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 p-3 rounded-full ${
                    entry.type === 'report' ? 'bg-emerald-100' : 'bg-blue-100'
                  }`}
                >
                  {entry.type === 'report' ? (
                    <FileText className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Activity className="w-5 h-5 text-blue-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {entry.type === 'report' ? entry.data.title : 'Manual Vitals Entry'}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {formatDate(entry.date)}
                      </div>
                    </div>

                    {entry.type === 'report' && (
                      <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded-full whitespace-nowrap">
                        {getReportTypeLabel(entry.data.report_type)}
                      </span>
                    )}
                  </div>

                  {entry.type === 'report' ? (
                    <div>
                      {entry.data.ai_summary?.summary_english && (
                        <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                          {entry.data.ai_summary.summary_english}
                        </p>
                      )}
                      {entry.data.ai_summary?.summary_urdu && (
                        <p className="text-sm text-gray-600 italic line-clamp-1">
                          {entry.data.ai_summary.summary_urdu}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-700 mb-1">
                        {formatVitalsData(entry.data.vitals_data)}
                      </p>
                      {entry.data.notes && (
                        <p className="text-sm text-gray-600 italic">
                          Note: {entry.data.notes}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
