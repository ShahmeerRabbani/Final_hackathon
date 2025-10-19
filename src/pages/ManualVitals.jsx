import React, { useState } from 'react';
import { Activity, CheckCircle, AlertCircle } from 'lucide-react';

const ManualVitals = () => {
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);
  const [bpSystolic, setBpSystolic] = useState('');
  const [bpDiastolic, setBpDiastolic] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [weight, setWeight] = useState('');
  const [temperature, setTemperature] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [oxygenLevel, setOxygenLevel] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const vitalsData = {};
    if (bpSystolic) vitalsData.bp_systolic = parseFloat(bpSystolic);
    if (bpDiastolic) vitalsData.bp_diastolic = parseFloat(bpDiastolic);
    if (bloodSugar) vitalsData.blood_sugar = parseFloat(bloodSugar);
    if (weight) vitalsData.weight = parseFloat(weight);
    if (temperature) vitalsData.temperature = parseFloat(temperature);
    if (heartRate) vitalsData.heart_rate = parseFloat(heartRate);
    if (oxygenLevel) vitalsData.oxygen_level = parseFloat(oxygenLevel);

    if (Object.keys(vitalsData).length === 0) {
      setError('Please enter at least one vital reading');
      return;
    }

    setError('');
    setSuccess(false);
    setLoading(true);

    setTimeout(() => {
      console.log('Vitals saved locally:', {
        entry_date: entryDate,
        vitals_data: vitalsData,
        notes,
      });
      setSuccess(true);
      setBpSystolic('');
      setBpDiastolic('');
      setBloodSugar('');
      setWeight('');
      setTemperature('');
      setHeartRate('');
      setOxygenLevel('');
      setNotes('');
      setEntryDate(new Date().toISOString().split('T')[0]);
      setLoading(false);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-emerald-100 p-2 rounded-lg">
            <Activity className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add Manual Vitals</h2>
            <p className="text-sm text-gray-600">Apne vitals manually add karen</p>
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
              Vitals saved successfully! Vitals kamyabi se save ho gaye hain!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Entry Date / Entry ki date
            </label>
            <input
              type="date"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Pressure - Systolic (mmHg)
              </label>
              <input
                type="number"
                step="0.1"
                value={bpSystolic}
                onChange={(e) => setBpSystolic(e.target.value)}
                placeholder="e.g., 120"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Pressure - Diastolic (mmHg)
              </label>
              <input
                type="number"
                step="0.1"
                value={bpDiastolic}
                onChange={(e) => setBpDiastolic(e.target.value)}
                placeholder="e.g., 80"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Sugar (mg/dL)
              </label>
              <input
                type="number"
                step="0.1"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(e.target.value)}
                placeholder="e.g., 95"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 70"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature (°F)
              </label>
              <input
                type="number"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="e.g., 98.6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heart Rate (bpm)
              </label>
              <input
                type="number"
                step="1"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                placeholder="e.g., 72"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Oxygen Level (%)
              </label>
              <input
                type="number"
                step="1"
                value={oxygenLevel}
                onChange={(e) => setOxygenLevel(e.target.value)}
                placeholder="e.g., 98"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional) / Khulasa
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add any additional notes..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Activity className="w-5 h-5" />
            <span>{loading ? 'Saving...' : 'Save Vitals'}</span>
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Regularly track your vitals to monitor your health over time.
            Apne vitals regular track karen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManualVitals;
