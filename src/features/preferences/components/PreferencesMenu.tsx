import { useState, useRef, useEffect } from 'react';
import { usePreferences } from '../context/PreferencesContext';
import { SUPPORTED_LOCALES, type LanguagePreference } from '../types';
import { Settings, Sun, Moon, Laptop, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { localeToPathPrefix, pathPrefixToLocale } from '../lib/locale';

export default function PreferencesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    themePreference,
    setTheme,
    languagePreference,
    activeLocale,
    setLanguage,
  } = usePreferences();

  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close on outside click or escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLanguageSelect = (pref: LanguagePreference) => {
    setLanguage(pref);
    setIsOpen(false);

    // If navigating to localized path
    const targetLocale = pref === 'system' ? activeLocale : pref;
    const targetPrefix = localeToPathPrefix(targetLocale);

    // Extract current path without locale prefix
    const pathParts = location.pathname.split('/').filter(Boolean);
    const firstPart = pathParts[0];
    const isLocalePrefixed = firstPart && pathPrefixToLocale(firstPart);

    const remainingPath = isLocalePrefixed
      ? pathParts.slice(1).join('/')
      : pathParts.join('/');

    const newPath = `/${targetPrefix}${remainingPath ? `/${remainingPath}` : ''}${location.hash}`;
    navigate(newPath);
  };

  const getThemeIcon = () => {
    if (themePreference === 'light')
      return <Sun className="w-4 h-4 text-[#C98F55]" />;
    if (themePreference === 'dark')
      return <Moon className="w-4 h-4 text-[#C98F55]" />;
    return <Laptop className="w-4 h-4 text-[#C98F55]" />;
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] bg-[var(--surface)] hover:bg-[var(--surface-soft)] border border-[var(--border)] transition-colors cursor-pointer focus-visible:outline-2"
        aria-label="Appearance and Language settings"
        aria-expanded={isOpen}
      >
        {getThemeIcon()}
        <span className="uppercase font-semibold">{activeLocale}</span>
        <Settings className="w-3.5 h-3.5 opacity-60 ml-0.5" />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Preferences"
          className="absolute right-0 mt-2 w-64 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-[0_10px_30px_rgba(0,0,0,0.12)] z-50 transition-all text-left"
        >
          {/* Appearance / Theme */}
          <div className="mb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted-foreground)] block mb-2 font-semibold">
              Appearance
            </span>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)]">
              <button
                type="button"
                onClick={() => setTheme('system')}
                className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-sans transition-all ${
                  themePreference === 'system'
                    ? 'bg-[var(--surface)] text-[var(--foreground)] font-semibold shadow-xs'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                <Laptop className="w-3.5 h-3.5 mb-1" />
                <span>Device</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-sans transition-all ${
                  themePreference === 'light'
                    ? 'bg-[var(--surface)] text-[var(--foreground)] font-semibold shadow-xs'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                <Sun className="w-3.5 h-3.5 mb-1" />
                <span>Light</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-sans transition-all ${
                  themePreference === 'dark'
                    ? 'bg-[var(--surface)] text-[var(--foreground)] font-semibold shadow-xs'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                <Moon className="w-3.5 h-3.5 mb-1" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted-foreground)] block mb-2 font-semibold">
              Language
            </span>
            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
              <button
                type="button"
                onClick={() => handleLanguageSelect('system')}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                  languagePreference === 'system'
                    ? 'bg-[var(--surface-soft)] text-[var(--foreground)] font-semibold'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]'
                }`}
              >
                <span>Device / System</span>
                {languagePreference === 'system' && (
                  <Check className="w-3.5 h-3.5 text-[#C98F55]" />
                )}
              </button>

              {SUPPORTED_LOCALES.map((loc) => {
                const isSelected = languagePreference === loc.code;
                return (
                  <button
                    key={loc.code}
                    type="button"
                    onClick={() => handleLanguageSelect(loc.code)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                      isSelected
                        ? 'bg-[var(--surface-soft)] text-[var(--foreground)] font-semibold'
                        : 'text-[var(--muted-foreground)] hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    <span>{loc.nativeLabel}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#C98F55]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
