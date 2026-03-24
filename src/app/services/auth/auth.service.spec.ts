import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start in logged-out state', () => {
    expect(service.isLoggedIn()).toBe(false);
    expect(service.user()).toBeNull();
    expect(service.role()).toBeNull();
  });

  it('should login a manager with correct credentials', () => {
    const result = service.login('iamdennysunny@gmail.com', 'manager123');
    expect(result.success).toBe(true);
    expect(service.isLoggedIn()).toBe(true);
    expect(service.role()).toBe('manager');
    expect(service.user()?.name).toBe('Denny Sunny');
  });

  it('should login a viewer with correct credentials', () => {
    const result = service.login('viewer@demo.com', 'viewer123');
    expect(result.success).toBe(true);
    expect(service.isLoggedIn()).toBe(true);
    expect(service.role()).toBe('viewer');
  });

  it('should reject invalid credentials', () => {
    const result = service.login('wrong@email.com', 'wrongpassword');
    expect(result.success).toBe(false);
    expect(service.isLoggedIn()).toBe(false);
    expect(result.message).toBeTruthy();
  });

  it('should set canManage true for manager role', () => {
    service.login('iamdennysunny@gmail.com', 'manager123');
    expect(service.canManage()).toBe(true);
  });

  it('should set canManage false for viewer role', () => {
    service.login('viewer@demo.com', 'viewer123');
    expect(service.canManage()).toBe(false);
  });

  it('should set canView true when logged in', () => {
    service.login('viewer@demo.com', 'viewer123');
    expect(service.canView()).toBe(true);
  });

  it('should set canView false when not logged in', () => {
    expect(service.canView()).toBe(false);
  });

  it('should logout and clear state', () => {
    service.login('iamdennysunny@gmail.com', 'manager123');
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
    expect(service.user()).toBeNull();
    expect(service.role()).toBeNull();
  });

  it('should persist session to sessionStorage on login', () => {
    service.login('iamdennysunny@gmail.com', 'manager123');
    expect(sessionStorage.getItem('portfolio_auth')).not.toBeNull();
  });

  it('should clear sessionStorage on logout', () => {
    service.login('iamdennysunny@gmail.com', 'manager123');
    service.logout();
    expect(sessionStorage.getItem('portfolio_auth')).toBeNull();
  });

  it('should check role correctly with hasRole()', () => {
    service.login('iamdennysunny@gmail.com', 'manager123');
    expect(service.hasRole('manager')).toBe(true);
    expect(service.hasRole('viewer')).toBe(false);
  });
});
