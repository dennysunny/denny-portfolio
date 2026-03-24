import { Injectable, signal, computed } from "@angular/core";

import { User, AuthState, UserRole } from "../../models/portfolio.model";

const DEMO_USERS: User[] = [
  {
    id: "u-1",
    name: "Denny Sunny",
    email: "iamdennysunny@gmail.com",
    password: "dennysunny123",
    role: "manager",
  },
];

const SESSION_KEY = "portfolio_auth";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly _state = signal<AuthState>(this._loadSession());

  // Public signals
  readonly user = computed(() => this._state().user);
  readonly isLoggedIn = computed(() => this._state().isLoggedIn);
  readonly role = computed(() => this._state().user?.role ?? null);

  // Permission helpers
  readonly canView = computed(() => this.isLoggedIn());
  readonly canManage = computed(() => this._state().user?.role === "manager");

  login(
    email: string,
    password: string,
  ): { success: boolean; message: string } {
    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password,
    );

    if (!found) {
      return { success: false, message: "Invalid email or password." };
    }

    const newState: AuthState = { user: found, isLoggedIn: true };
    this._state.set(newState);
    this._saveSession(newState);
    return { success: true, message: `Welcome, ${found.name}!` };
  }

  logout(): void {
    this._state.set({ user: null, isLoggedIn: false });
    sessionStorage.removeItem(SESSION_KEY);
  }

  hasRole(role: UserRole): boolean {
    return this._state().user?.role === role;
  }

  private _loadSession(): AuthState {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) return JSON.parse(raw) as AuthState;
    } catch {
      // ignore
    }
    return { user: null, isLoggedIn: false };
  }

  private _saveSession(state: AuthState): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
  }
}
