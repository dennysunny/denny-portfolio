import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceComponent } from './experience.component';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { signal } from '@angular/core';
import { DEFAULT_PORTFOLIO_CONTENT } from '../../data/portfolio.data';

const mockPortfolioService = {
  experiences:   signal(DEFAULT_PORTFOLIO_CONTENT.experiences),
  activeSection: signal('home'),
};

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section with id="experience"', () => {
    const section = fixture.nativeElement.querySelector('#experience');
    expect(section).toBeTruthy();
  });

  it('should render one timeline item per experience', () => {
    const items = fixture.nativeElement.querySelectorAll('.timeline-item');
    expect(items.length).toBe(DEFAULT_PORTFOLIO_CONTENT.experiences.length);
  });

  it('should display company names', () => {
    const companies = fixture.nativeElement.querySelectorAll('.timeline-company');
    expect(companies[0].textContent.trim()).toBe(
      DEFAULT_PORTFOLIO_CONTENT.experiences[0].company
    );
  });

  it('should display period text', () => {
    const periods = fixture.nativeElement.querySelectorAll('.timeline-period');
    expect(periods[0].textContent.trim()).toBe(
      DEFAULT_PORTFOLIO_CONTENT.experiences[0].period
    );
  });

  it('should render bullet points for first experience', () => {
    const bullets = fixture.nativeElement.querySelectorAll('.timeline-item:first-child .bullets li');
    expect(bullets.length).toBe(DEFAULT_PORTFOLIO_CONTENT.experiences[0].bullets.length);
  });

  it('should display role highlight text', () => {
    const roles = fixture.nativeElement.querySelectorAll('.timeline-role span');
    expect(roles[0].textContent.trim()).toContain(
      DEFAULT_PORTFOLIO_CONTENT.experiences[0].roleHighlight
    );
  });

  it('should not render connector-line on last item', () => {
    const items = fixture.nativeElement.querySelectorAll('.timeline-item');
    const lastItem = items[items.length - 1];
    const line = lastItem.querySelector('.connector-line');
    expect(line).toBeNull();
  });

  it('should reactively update when experiences signal changes', () => {
    mockPortfolioService.experiences.set([
      {
        id: 'test-1',
        period: '2024',
        company: 'TestCo',
        role: 'Dev — ',
        roleHighlight: 'Frontend',
        bullets: ['Built stuff'],
      },
    ]);
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('.timeline-item');
    expect(items.length).toBe(1);
    // restore
    mockPortfolioService.experiences.set(DEFAULT_PORTFOLIO_CONTENT.experiences);
  });
});
