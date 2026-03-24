import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard, managerGuard } from './auth.guard';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

const mockRoute = {} as ActivatedRouteSnapshot;
const mockState = {} as RouterStateSnapshot;

describe('authGuard', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
      ],
    });
    authService = TestBed.inject(AuthService);
    router      = TestBed.inject(Router);
  });

  it('should allow access when user is logged in', () => {
    authService.login('viewer@demo.com', 'viewer123');
    const result = TestBed.runInInjectionContext(() =>
      authGuard(mockRoute, mockState)
    );
    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to /login when not authenticated', () => {
    const result = TestBed.runInInjectionContext(() =>
      authGuard(mockRoute, mockState)
    );
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});

describe('managerGuard', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
      ],
    });
    authService = TestBed.inject(AuthService);
    router      = TestBed.inject(Router);
  });

  it('should allow access for manager role', () => {
    authService.login('iamdennysunny@gmail.com', 'manager123');
    const result = TestBed.runInInjectionContext(() =>
      managerGuard(mockRoute, mockState)
    );
    expect(result).toBe(true);
  });

  it('should deny access and redirect for viewer role', () => {
    authService.login('viewer@demo.com', 'viewer123');
    const result = TestBed.runInInjectionContext(() =>
      managerGuard(mockRoute, mockState)
    );
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should deny access when not logged in', () => {
    const result = TestBed.runInInjectionContext(() =>
      managerGuard(mockRoute, mockState)
    );
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
