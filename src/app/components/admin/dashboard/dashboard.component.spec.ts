import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { signal } from '@angular/core';
import { DEFAULT_PORTFOLIO_CONTENT } from '../../../data/portfolio.data';

const mockAuth = {
  user:       signal({ id: 'u-1', name: 'Denny Sunny', email: 'd@d.com', role: 'manager', password: '' }),
  role:       signal('manager'),
  isLoggedIn: signal(true),
  canManage:  signal(true),
  logout:     jest.fn(),
};

const mockPortfolio = {
  hero:         signal(DEFAULT_PORTFOLIO_CONTENT.hero),
  stats:        signal(DEFAULT_PORTFOLIO_CONTENT.stats),
  experiences:  signal(DEFAULT_PORTFOLIO_CONTENT.experiences),
  skillGroups:  signal(DEFAULT_PORTFOLIO_CONTENT.skillGroups),
  about:        signal(DEFAULT_PORTFOLIO_CONTENT.about),
  contactLinks: signal(DEFAULT_PORTFOLIO_CONTENT.contactLinks),
  updateHero:         jest.fn(),
  updateExperiences:  jest.fn(),
  updateSkillGroups:  jest.fn(),
  updateAbout:        jest.fn(),
  updateContactLinks: jest.fn(),
  updateStats:        jest.fn(),
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, RouterTestingModule],
      providers: [
        { provide: AuthService,      useValue: mockAuth },
        { provide: PortfolioService, useValue: mockPortfolio },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    router    = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to hero tab', () => {
    expect(component.activeTab()).toBe('hero');
  });

  it('should switch tab on setTab()', () => {
    component.setTab('experience');
    expect(component.activeTab()).toBe('experience');
  });

  it('should render all 5 sidebar tabs', () => {
    const tabBtns = fixture.nativeElement.querySelectorAll('.tab-btn');
    expect(tabBtns.length).toBe(5);
  });

  it('should mark active tab with active class', () => {
    component.setTab('skills');
    fixture.detectChanges();
    const activeBtns = fixture.nativeElement.querySelectorAll('.tab-btn.active');
    expect(activeBtns.length).toBe(1);
    expect(activeBtns[0].textContent).toContain('Skills');
  });

  it('should display user name in sidebar', () => {
    const userName = fixture.nativeElement.querySelector('.user-name');
    expect(userName.textContent.trim()).toBe('Denny Sunny');
  });

  it('should display role badge', () => {
    const badge = fixture.nativeElement.querySelector('.role-badge');
    expect(badge.textContent.trim()).toBe('manager');
  });

  it('should call auth.logout and navigate on logout()', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);
    component.logout();
    expect(mockAuth.logout).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should render view portfolio link', () => {
    const link = fixture.nativeElement.querySelector('.btn-preview');
    expect(link).toBeTruthy();
  });

  it('should render the panel container', () => {
    const panel = fixture.nativeElement.querySelector('.panel');
    expect(panel).toBeTruthy();
  });

  it('should switch between all tab panels', () => {
    const tabIds: Array<'hero' | 'experience' | 'skills' | 'about' | 'contact'> =
      ['hero', 'experience', 'skills', 'about', 'contact'];

    tabIds.forEach((tab) => {
      component.setTab(tab);
      fixture.detectChanges();
      expect(component.activeTab()).toBe(tab);
      expect(component.activeTabLabel()).toBeTruthy();
    });
  });
});
