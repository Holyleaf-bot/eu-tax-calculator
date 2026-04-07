'use client';

import { useEffect, useCallback } from 'react';

type KeyboardShortcut = {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  handler: () => void;
};

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in inputs
    const target = event.target as HTMLElement;
    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT';

    for (const shortcut of shortcuts) {
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

      // For Enter key, only trigger when in an input field
      if (shortcut.key.toLowerCase() === 'enter') {
        if (keyMatch && isInput) {
          event.preventDefault();
          shortcut.handler();
          return;
        }
        continue;
      }

      // For other keys, don't trigger when typing in inputs
      if (isInput) continue;

      const ctrlMatch = shortcut.ctrlKey ? event.ctrlKey : !event.ctrlKey || shortcut.ctrlKey === undefined;
      const metaMatch = shortcut.metaKey ? event.metaKey : !event.metaKey || shortcut.metaKey === undefined;
      const shiftMatch = shortcut.shiftKey ? event.shiftKey : !event.shiftKey || shortcut.shiftKey === undefined;
      const altMatch = shortcut.altKey ? event.altKey : !event.altKey || shortcut.altKey === undefined;

      if (keyMatch && ctrlMatch && metaMatch && shiftMatch && altMatch) {
        event.preventDefault();
        shortcut.handler();
        return;
      }
    }
  }, [shortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}