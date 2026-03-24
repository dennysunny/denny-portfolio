import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const mockAuthService = {
  login: jest.fn(),
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    mockAuthService.login.mockReset();

    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router    = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render email and password inputs', () => {
    const emailInput    = fixture.nativeElement.querySelector('#email');
    const passwordInput = fixture.nativeElement.querySelector('#password');
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should render submit button', () => {
    const btn = fixture.nativeElement.querySelector('.btn-submit');
    expect(btn).toBeTruthy();
    expect(btn.textContent).toContain('Sign in');
  });

  it('should render demo credentials section', () => {
    const hints = fixture.nativeElement.querySelector('.demo-hints');
    expect(hints).toBeTruthy();
  });

  it('should render both role badges', () => {
    const badges = fixture.nativeElement.querySelectorAll('.role-badge');
    expect(badges.length).toBe(2);
  });

  it('should update email signal on input change', () => {
    const input = fixture.nativeElement.querySelector('#email');
    input.value = 'test@example.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // ngModel updates on change event
    input.dispatchEvent(new Event('change'));
    expect(component.email()).toBeTruthy();
  });

  it('should show error message when login fails', fakeAsync(() => {
    mockAuthService.login.mockReturnValue({ success: false, message: 'Invalid credentials' });
    component.email.set('wrong@email.com');
    component.password.set('wrongpass');
    component.onSubmit();
    tick(400);
    fixture.detectChanges();
    const errorEl = fixture.nativeElement.querySelector('.error-msg');
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain('Invalid credentials');
  }));

  it('should navigate to "/" on successful login', fakeAsync(() => {
    mockAuthService.login.mockReturnValue({ success: true, message: 'Welcome!' });
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);
    component.email.set('iamdennysunny@gmail.com');
    component.password.set('manager123');
    component.onSubmit();
    tick(400);
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  }));

  it('should show loading state while submitting', fakeAsync(() => {
    mockAuthService.login.mockReturnValue({ success: true, message: 'Welcome!' });
    jest.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onSubmit();
    fixture.detectChanges();
    expect(component.loading()).toBe(true);
    tick(400);
    fixture.detectChanges();
    expect(component.loading()).toBe(false);
  }));

  it('should have back link to portfolio', () => {
    const backLink = fixture.nativeElement.querySelector('.back-link');
    expect(backLink).toBeTruthy();
  });

  it('should not show error initially', () => {
    const errorEl = fixture.nativeElement.querySelector('.error-msg');
    expect(errorEl).toBeNull();
  });
});
