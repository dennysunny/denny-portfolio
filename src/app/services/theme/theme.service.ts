import { Injectable, signal, computed, effect } from '@angular/core';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'portfolio_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _theme = signal<Theme>(this._loadTheme());

  readonly theme    = this._theme.asReadonly();
  readonly isDark   = computed(() => this._theme() === 'dark');
  readonly isLight  = computed(() => this._theme() === 'light');
  readonly icon     = computed(() => this._theme() === 'dark' ? '🔆' : '🌙');
  readonly label    = computed(() => this._theme() === 'dark' ? 'Light mode' : 'Dark mode');

  constructor() {
    // Reactively apply theme class to <html> whenever signal changes
    effect(() => {
      const t = this._theme();
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem(STORAGE_KEY, t);
    });
  }

  toggle(): void {
    this._theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  set(theme: Theme): void {
    this._theme.set(theme);
  }

  private _loadTheme(): Theme {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === 'dark' || saved === 'light') return saved;
    // Respect OS preference if no saved choice
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
}