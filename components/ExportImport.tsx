import { Download, Upload, X, Check, AlertCircle } from "lucide-react";
import { useState } from "react";

interface ExportImportProps {
  onClose: () => void;
}

export default function ExportImport({ onClose }: ExportImportProps) {
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const exportData = () => {
    try {
      const data = {
        version: "1.0",
        exportDate: new Date().toISOString(),
        history: localStorage.getItem("downloadHistory"),
        favorites: localStorage.getItem("favorites"),
        collections: localStorage.getItem("collections"),
        preferences: localStorage.getItem("userPreferences"),
        seenTips: localStorage.getItem("seenTips"),
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `fbdownloader-backup-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: 'Data exported successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export data' });
    }
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);

        // Restore all data
        if (data.history) localStorage.setItem("downloadHistory", data.history);
        if (data.favorites) localStorage.setItem("favorites", data.favorites);
        if (data.collections) localStorage.setItem("collections", data.collections);
        if (data.preferences) localStorage.setItem("userPreferences", data.preferences);
        if (data.seenTips) localStorage.setItem("seenTips", data.seenTips);

        setMessage({ type: 'success', text: 'Data imported successfully! Refreshing...' });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        setMessage({ type: 'error', text: 'Invalid backup file' });
        setImporting(false);
      }
    };

    reader.onerror = () => {
      setMessage({ type: 'error', text: 'Failed to read file' });
      setImporting(false);
    };

    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone!')) {
      localStorage.removeItem("downloadHistory");
      localStorage.removeItem("favorites");
      localStorage.removeItem("collections");
      localStorage.removeItem("userPreferences");
      localStorage.removeItem("seenTips");
      
      setMessage({ type: 'success', text: 'All data cleared! Refreshing...' });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Backup & Restore
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
            }`}>
              {message.type === 'success' ? (
                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              )}
              <p className={`text-sm ${
                message.type === 'success' 
                  ? 'text-green-700 dark:text-green-300' 
                  : 'text-red-700 dark:text-red-300'
              }`}>
                {message.text}
              </p>
            </div>
          )}

          {/* Export */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
              <Download className="w-5 h-5 text-purple-600" />
              Export Data
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Download a backup of all your data including history, favorites, and preferences.
            </p>
            <button
              onClick={exportData}
              className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Backup
            </button>
          </div>

          {/* Import */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" />
              Import Data
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Restore your data from a previous backup file.
            </p>
            <label className="block">
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
                disabled={importing}
              />
              <div className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                {importing ? 'Importing...' : 'Import Backup'}
              </div>
            </label>
          </div>

          {/* Clear All */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
              Danger Zone
            </h3>
            <p className="text-sm text-red-700 dark:text-red-400 mb-3">
              Clear all data permanently. This action cannot be undone.
            </p>
            <button
              onClick={clearAllData}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}







