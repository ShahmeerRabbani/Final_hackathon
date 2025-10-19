import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  FileText,
  AlertTriangle,
  MessageCircle,
  Apple,
  Heart,
  ExternalLink,
} from 'lucide-react';

 const ReportDetails = ({ report, onClose }) => {
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    // ✅ Simulate Supabase public URL (you can replace this with actual file link)
    setFileUrl(`https://example.com/files/${report.file_path}`);
  }, [report.file_path]);

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

  const summary = report.ai_summary || {};

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Reports</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-6 h-6" />
            <span className="text-sm font-medium opacity-90">
              {getReportTypeLabel(report.report_type)}
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{report.title}</h1>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Calendar className="w-4 h-4" />
            {formatDate(report.report_date)}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* English Summary */}
          {summary.summary_english && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Summary (English)
              </h3>
              <p className="text-gray-700 leading-relaxed">{summary.summary_english}</p>
            </div>
          )}

          {/* Urdu Summary */}
          {summary.summary_urdu && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Khulasa (Roman Urdu)
              </h3>
              <p className="text-gray-700 leading-relaxed">{summary.summary_urdu}</p>
            </div>
          )}

          {/* Abnormal Values */}
          {summary.abnormal_values?.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Abnormal Values
              </h3>
              <ul className="space-y-2">
                {summary.abnormal_values.map((value, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Questions for Doctor */}
          {summary.questions_for_doctor?.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                Questions for Your Doctor
              </h3>
              <ul className="space-y-2">
                {summary.questions_for_doctor.map((question, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-600 mt-1">{idx + 1}.</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Foods to Avoid */}
          {summary.foods_to_avoid?.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Apple className="w-5 h-5 text-red-600" />
                Foods to Avoid / Avoid karne wali ghiza
              </h3>
              <ul className="space-y-2">
                {summary.foods_to_avoid.map((food, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-red-600 mt-1">•</span>
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommended Foods */}
          {summary.foods_to_eat?.length > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Apple className="w-5 h-5 text-emerald-600" />
                Recommended Foods / Behtar ghiza
              </h3>
              <ul className="space-y-2">
                {summary.foods_to_eat.map((food, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Home Remedies */}
          {summary.home_remedies?.length > 0 && (
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-teal-600" />
                Home Remedies / Gharelu ilaaj
              </h3>
              <ul className="space-y-2">
                {summary.home_remedies.map((remedy, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>{remedy}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Report File */}
          {fileUrl && (
            <div className="border-t pt-6">
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Original Report
              </a>
            </div>
          )}

          {/* Disclaimer */}
          <div className="border-t pt-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Yeh information sirf general guidance ke liye hai.
                Always consult your doctor before making any health decisions. Apne doctor se zaroor
                mashwara karen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ReportDetails