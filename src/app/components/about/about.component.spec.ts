import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { signal } from '@angular/core';
import { DEFAULT_PORTFOLIO_CONTENT } from '../../data/portfolio.data';

const mockPortfolioService = {
  about:         signal(DEFAULT_PORTFOLIO_CONTENT.about),
  hero:          signal(DEFAULT_PORTFOLIO_CONTENT.hero),
  activeSection: signal('home'),
};

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section with id="about"', () => {
    const section = fixture.nativeElement.querySelector('#about');
    expect(section).toBeTruthy();
  });

  it('should render bio paragraphs', () => {
    const paras = fixture.nativeElement.querySelectorAll('.about-text p');
    expect(paras.length).toBe(DEFAULT_PORTFOLIO_CONTENT.about.bio.length);
  });

  it('should render education entries', () => {
    const eduItems = fixture.nativeElement.querySelectorAll('.edu-item');
    expect(eduItems.length).toBe(DEFAULT_PORTFOLIO_CONTENT.about.education.length);
  });

  it('should display education degree text', () => {
    const degrees = fixture.nativeElement.querySelectorAll('.edu-degree');
    expect(degrees[0].textContent.trim()).toBe(
      DEFAULT_PORTFOLIO_CONTENT.about.education[0].degree
    );
  });

  it('should display education school', () => {
    const schools = fixture.nativeElement.querySelectorAll('.edu-school');
    expect(schools[0].textContent.trim()).toBe(
      DEFAULT_PORTFOLIO_CONTENT.about.education[0].school
    );
  });

  it('should display location', () => {
    const location = fixture.nativeElement.querySelector('.location-text');
    expect(location.textContent).toContain(DEFAULT_PORTFOLIO_CONTENT.about.location);
  });

  it('should display email contact chip', () => {
    const chips = fixture.nativeElement.querySelectorAll('.contact-chip');
    const emailChip = Array.from(chips).find((c: any) =>
      c.getAttribute('href')?.startsWith('mailto:')
    );
    expect(emailChip).toBeTruthy();
  });

  it('should display phone contact chip', () => {
    const chips = fixture.nativeElement.querySelectorAll('.contact-chip');
    const phoneChip = Array.from(chips).find((c: any) =>
      c.getAttribute('href')?.startsWith('tel:')
    );
    expect(phoneChip).toBeTruthy();
  });
});
