import { signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";

import { AuthService } from "src/app/services/auth/auth.service";
import { PortfolioService } from "src/app/services/portfolio/portfolio.service";
import { ThemeService } from "src/app/services/theme/theme.service";

import { NavComponent } from "./nav.component";

const mockAuthService = {
  isLoggedIn: signal(false),
  canManage: signal(false),
  user: signal({}),
  role: signal(null),
  logout: jest.fn(),
};

const mockPortfolioService = {
  activeSection: signal("home"),
};

const mockThemeService = {
  theme: signal<"dark" | "light">("dark"),
  isDark: signal(true),
  isLight: signal(false),
  icon: signal("☀"),
  label: signal("Light mode"),
  toggle: jest.fn(),
};

describe("NavComponent", () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    mockAuthService.logout.mockReset();
    mockThemeService.toggle.mockReset();

    await TestBed.configureTestingModule({
      imports: [NavComponent, RouterModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: PortfolioService, useValue: mockPortfolioService },
        { provide: ThemeService, useValue: mockThemeService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render all nav links", () => {
    const links = fixture.nativeElement.querySelectorAll(".nav-links a");
    expect(links.length).toBe(4);
  });

  it("should show scrolled class when scrolled signal is true", () => {
    component.scrolled.set(true);
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector("nav");
    expect(nav.classList).toContain("scrolled");
  });

  it("should toggle mobile menu open", () => {
    expect(component.menuOpen()).toBe(false);
    component.toggleMenu();
    expect(component.menuOpen()).toBe(true);
  });

  it("should close mobile menu", () => {
    component.menuOpen.set(true);
    component.closeMenu();
    expect(component.menuOpen()).toBe(false);
  });

  it("should show login link when not logged in", () => {
    mockAuthService.isLoggedIn.set(false);
    fixture.detectChanges();
    const loginLink = fixture.nativeElement.querySelector(".nav-cta");
    expect(loginLink).toBeTruthy();
  });

  it("should show logout button when logged in", () => {
    mockAuthService.isLoggedIn.set(true);
    mockAuthService.user.set({
      id: "u-1",
      name: "Denny",
      email: "d@d.com",
      role: "manager",
      password: "",
    });
    fixture.detectChanges();
    const logoutBtn = fixture.nativeElement.querySelector(".btn-logout");
    expect(logoutBtn).toBeTruthy();
  });

  it("should show admin button for manager role", () => {
    mockAuthService.canManage.set(true);
    fixture.detectChanges();
    const adminBtn = fixture.nativeElement.querySelector(".btn-admin");
    expect(adminBtn).toBeTruthy();
  });

  it("should call logout on logout()", () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });

  it("should set scrolled true when window.scrollY > 50", () => {
    Object.defineProperty(window, "scrollY", {
      value: 100,
      configurable: true,
    });
    component.onScroll();
    expect(component.scrolled()).toBe(true);
  });

  it("should set scrolled false when window.scrollY <= 50", () => {
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    component.onScroll();
    expect(component.scrolled()).toBe(false);
  });

  // ── Theme toggle tests ────────────────────────────────────────────────

  it("should render theme toggle button", () => {
    const btn = fixture.nativeElement.querySelector(".btn-theme");
    expect(btn).toBeTruthy();
  });

  it("should display theme icon from ThemeService", () => {
    const icon = fixture.nativeElement.querySelector(".btn-theme .theme-icon");
    expect(icon.textContent.trim()).toBe("☀");
  });

  it("should call theme.toggle() when theme button is clicked", () => {
    const btn = fixture.nativeElement.querySelector(".btn-theme");
    btn.click();
    expect(mockThemeService.toggle).toHaveBeenCalled();
  });

  it("should have aria-label from theme.label()", () => {
    const btn = fixture.nativeElement.querySelector(".btn-theme");
    expect(btn.getAttribute("aria-label")).toBe("Light mode");
  });

  it("should show ☾ icon when in light mode", () => {
    mockThemeService.icon.set("☾");
    mockThemeService.label.set("Dark mode");
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector(".btn-theme .theme-icon");
    expect(icon.textContent.trim()).toBe("☾");
  });
});
