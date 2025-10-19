import React, { useState } from 'react';
import { Upload, FileText, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const UploadReport = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [reportType, setReportType] = useState('blood_test');
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileType = selectedFile.type;

      if (fileType === 'application/pdf' || fileType.startsWith('image/')) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a PDF or image file');
        setFile(null);
      }
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file) return setError('Please select a file first.');

  console.log('File:', file);
  console.log('Title:', title);
  console.log('Report Date:', reportDate);
  console.log('Report Type:', reportType);

  setError('');
  setSuccess(false);
  setUploading(true);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('reportType', reportType);
  formData.append('reportDate', reportDate);

  try {
    const res = await axios.post('http://final-hackathon-backend-psi.vercel.app/reports/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log('Upload success:', res.data);

    // ✅ Only proceed if upload was successful
    if (res.status === 200 || res.status === 201) {
      setUploading(false);
      setAnalyzing(true);

      // simulate AI analysis
      setTimeout(() => {
        setAnalyzing(false);
        setSuccess(true);
        setTitle('');
        setFile(null);
        setReportDate(new Date().toISOString().split('T')[0]);

        // hide success message after 3s
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }, 2000);
    } else {
      setUploading(false);
      setError('Unexpected server response. Please try again.');
    }
  } catch (err) {
    console.error('Upload failed:', err.response?.data || err.message);
    setUploading(false);
    setError(err.response?.data?.message || 'Failed to upload the report.');
  }
};


  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-emerald-100 p-2 rounded-lg">
            <Upload className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upload Medical Report</h2>
            <p className="text-sm text-gray-600">Apni medical report upload karen</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800">
              Report uploaded aur analyze ho gayi hai successfully!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Title / Report ka naam
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Complete Blood Count"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type / Report ki qisam
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              <option value="blood_test">Blood Test</option>
              <option value="xray">X-Ray</option>
              <option value="ultrasound">Ultrasound</option>
              <option value="prescription">Prescription</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Date / Report ki date
            </label>
            <input
              type="date"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload File (PDF or Image)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-emerald-500 transition-colors">
              <div className="space-y-1 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".pdf,image/*"
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF or PNG, JPG up to 10MB</p>
                {file && (
                  <p className="text-sm font-medium text-emerald-600 mt-2">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading || analyzing || !file}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {uploading && (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Uploading...</span>
              </>
            )}
            {analyzing && (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Analyzing with AI...</span>
              </>
            )}
            {!uploading && !analyzing && (
              <>
                <Upload className="w-5 h-5" />
                <span>Upload & Analyze</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> AI will analyze your report aur simple words mein explain karega
            (English + Roman Urdu). Always consult your doctor before making any decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadReport;
