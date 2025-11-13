import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  cmd?: boolean;
  shift?: boolean;
  alt?: boolean;
  callback: () => void;
  description?: string;
}

export function useKeyboard(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        const ctrlKey = shortcut.ctrl || shortcut.cmd;
        const matchesModifiers =
          (!ctrlKey || (event.ctrlKey || event.metaKey)) &&
          (!shortcut.shift || event.shiftKey) &&
          (!shortcut.alt || event.altKey);

        if (
          matchesModifiers &&
          event.key.toLowerCase() === shortcut.key.toLowerCase()
        ) {
          event.preventDefault();
          shortcut.callback();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

export const KEYBOARD_SHORTCUTS = {
  PASTE: { key: 'v', ctrl: true, description: 'Paste URL' },
  SUBMIT: { key: 'Enter', ctrl: true, description: 'Submit form' },
  HISTORY: { key: 'h', ctrl: true, description: 'Open history' },
  SEARCH: { key: 'k', ctrl: true, description: 'Search history' },
  FAVORITES: { key: 'b', ctrl: true, description: 'Open favorites' },
  STATS: { key: 'd', ctrl: true, description: 'View statistics' },
  HELP: { key: '/', description: 'Show shortcuts' },
};







