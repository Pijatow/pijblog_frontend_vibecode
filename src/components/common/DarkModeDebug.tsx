import { useEffect, useState } from 'react';

/**
 * Diagnostic component to debug dark mode issues
 * Shows the current state of dark mode detection
 */
export function DarkModeDebug() {
  const [htmlHasDarkClass, setHtmlHasDarkClass] = useState(false);
  const [localStorageValue, setLocalStorageValue] = useState<string | null>(null);
  const [systemPreference, setSystemPreference] = useState(false);

  useEffect(() => {
    // Check HTML element
    const checkDarkClass = () => {
      setHtmlHasDarkClass(document.documentElement.classList.contains('dark'));
    };

    // Initial check
    checkDarkClass();

    // Check localStorage
    setLocalStorageValue(localStorage.getItem('darkMode'));

    // Check system preference
    setSystemPreference(window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Observer for class changes
    const observer = new MutationObserver(checkDarkClass);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const handleClearLocalStorage = () => {
    localStorage.removeItem('darkMode');
    setLocalStorageValue(null);
    window.location.reload();
  };

  const handleForceLight = () => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
    window.location.reload();
  };

  return (
    <div className="fixed bottom-20 right-6 p-4 bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-500 rounded-lg shadow-2xl text-xs max-w-xs z-[9999]">
      <h3 className="font-bold text-yellow-900 dark:text-yellow-100 mb-2">🐛 Dark Mode Debug</h3>
      <div className="space-y-1 text-yellow-900 dark:text-yellow-100">
        <div>
          <strong>HTML has .dark class:</strong>{' '}
          <span className={htmlHasDarkClass ? 'text-red-600' : 'text-green-600'}>
            {htmlHasDarkClass ? '✗ YES (dark mode active)' : '✓ NO (light mode)'}
          </span>
        </div>
        <div>
          <strong>localStorage:</strong> {localStorageValue || 'null'}
        </div>
        <div>
          <strong>System preference:</strong> {systemPreference ? 'dark' : 'light'}
        </div>
        <div className="mt-2 pt-2 border-t border-yellow-500 space-y-1">
          <button
            onClick={handleClearLocalStorage}
            className="block w-full px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-xs"
          >
            Clear localStorage & Reload
          </button>
          <button
            onClick={handleForceLight}
            className="block w-full px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs"
          >
            Force Light Mode & Reload
          </button>
        </div>
      </div>
    </div>
  );
}
