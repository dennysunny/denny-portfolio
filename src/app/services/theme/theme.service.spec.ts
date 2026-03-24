import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    // Reset html attribute
    document.documentElement.removeAttribute('data-theme');

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to dark when no saved preference and OS is dark', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockReturnValue({ matches: false }),
    });
    localStorage.clear();
    const freshService = new ThemeService();
    expect(freshService.theme()).toBe('dark');
  });

  it('should load saved theme from localStorage', () => {
    localStorage.setItem('portfolio_theme', 'light');
    const freshService = new ThemeService();
    expect(freshService.theme()).toBe('light');
  });

  it('should toggle from dark to light', () => {
    service.set('dark');
    service.toggle();
    expect(service.theme()).toBe('light');
  });

  it('should toggle from light to dark', () => {
    service.set('light');
    service.toggle();
    expect(service.theme()).toBe('dark');
  });

  it('should set theme directly', () => {
    service.set('light');
    expect(service.theme()).toBe('light');
    service.set('dark');
    expect(service.theme()).toBe('dark');
  });

  it('isDark computed should be true when dark', () => {
    service.set('dark');
    expect(service.isDark()).toBe(true);
    expect(service.isLight()).toBe(false);
  });

  it('isLight computed should be true when light', () => {
    service.set('light');
    expect(service.isLight()).toBe(true);
    expect(service.isDark()).toBe(false);
  });

  it('icon should be ☀ in dark mode', () => {
    service.set('dark');
    expect(service.icon()).toBe('☀');
  });

  it('icon should be ☾ in light mode', () => {
    service.set('light');
    expect(service.icon()).toBe('☾');
  });

  it('label should say "Light mode" when in dark mode', () => {
    service.set('dark');
    expect(service.label()).toBe('Light mode');
  });

  it('label should say "Dark mode" when in light mode', () => {
    service.set('light');
    expect(service.label()).toBe('Dark mode');
  });

  it('should persist theme to localStorage on set()', () => {
    service.set('light');
    expect(localStorage.getItem('portfolio_theme')).toBe('light');
  });

  it('should apply data-theme attribute to html element', () => {
    service.set('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    service.set('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});