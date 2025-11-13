import { X, Keyboard } from "lucide-react";

interface KeyboardShortcutsHelpProps {
  onClose: () => void;
}

export default function KeyboardShortcutsHelp({ onClose }: KeyboardShortcutsHelpProps) {
  const shortcuts = [
    { keys: ["Ctrl", "V"], mac: ["Cmd", "V"], description: "Paste URL from clipboard" },
    { keys: ["Ctrl", "Enter"], mac: ["Cmd", "Enter"], description: "Submit form / Get Video" },
    { keys: ["Ctrl", "H"], mac: ["Cmd", "H"], description: "Open download history" },
    { keys: ["Ctrl", "K"], mac: ["Cmd", "K"], description: "Search history" },
    { keys: ["Ctrl", "B"], mac: ["Cmd", "B"], description: "Open favorites" },
    { keys: ["Ctrl", "D"], mac: ["Cmd", "D"], description: "View statistics" },
    { keys: ["Esc"], mac: ["Esc"], description: "Close modals / dialogs" },
    { keys: ["/"], mac: ["/"], description: "Show this help menu" },
  ];

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Keyboard className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Use these keyboard shortcuts to navigate faster and be more productive.
          </p>

          <div className="space-y-3">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-sm text-gray-800 dark:text-white font-medium">
                  {shortcut.description}
                </span>
                <div className="flex items-center gap-1">
                  {(isMac ? shortcut.mac : shortcut.keys).map((key, i) => (
                    <span key={i}>
                      <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">
                        {key}
                      </kbd>
                      {i < (isMac ? shortcut.mac : shortcut.keys).length - 1 && (
                        <span className="mx-1 text-gray-400">+</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-xs text-purple-800 dark:text-purple-300">
              <strong>💡 Tip:</strong> Press <kbd className="px-2 py-0.5 text-xs bg-white dark:bg-gray-800 border border-purple-300 dark:border-purple-700 rounded">/</kbd> anytime to show this help menu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}







