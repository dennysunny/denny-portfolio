import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicInfoComponent } from './basic-info.component';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { FadeUpDirective } from '../../animations/fade-up.directive';
import { signal, computed } from '@angular/core';
import { DEFAULT_PORTFOLIO_CONTENT } from '../../data/portfolio.data';
import { RouterTestingModule } from '@angular/router/testing';

const mockPortfolioService = {
  hero:   signal(DEFAULT_PORTFOLIO_CONTENT.hero),
  stats:  signal(DEFAULT_PORTFOLIO_CONTENT.stats),
};

describe('BasicInfoComponent', () => {
  let component: BasicInfoComponent;
  let fixture: ComponentFixture<BasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicInfoComponent, RouterTestingModule],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(BasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero section with id="home"', () => {
    const section = fixture.nativeElement.querySelector('#home');
    expect(section).toBeTruthy();
  });

  it('should display hero name split into two spans', () => {
    const firstName = fixture.nativeElement.querySelector('.name-first');
    const lastName  = fixture.nativeElement.querySelector('.name-last');
    expect(firstName.textContent.trim()).toBe('Denny');
    expect(lastName.textContent.trim()).toBe('Sunny');
  });

  it('should display hero subtitle', () => {
    const subtitle = fixture.nativeElement.querySelector('.hero-subtitle');
    expect(subtitle.textContent).toContain(DEFAULT_PORTFOLIO_CONTENT.hero.subtitle.substring(0, 20));
  });

  it('should display the tagline', () => {
    const tag = fixture.nativeElement.querySelector('.hero-tag');
    expect(tag.textContent).toContain(DEFAULT_PORTFOLIO_CONTENT.hero.tagline);
  });

  it('should render stat cards', () => {
    const stats = fixture.nativeElement.querySelectorAll('.stat');
    expect(stats.length).toBe(DEFAULT_PORTFOLIO_CONTENT.stats.length);
  });

  it('should update cursorX on mouse move', () => {
    component.onMouseMove(new MouseEvent('mousemove', { clientX: 200, clientY: 100 }));
    expect(component.cursorX()).toBe(200);
    expect(component.cursorY()).toBe(100);
  });

  it('should render primary CTA linking to mailto', () => {
    const cta = fixture.nativeElement.querySelector('.btn-primary');
    expect(cta.getAttribute('href')).toContain('mailto:');
  });

  it('should render secondary CTA linking to #experience', () => {
    const cta = fixture.nativeElement.querySelector('.btn-secondary');
    expect(cta.getAttribute('href')).toBe('#experience');
  });

  it('should render get in touch button', () => {
    const primary = fixture.nativeElement.querySelector('.btn-primary');
    expect(primary.textContent).toContain('Get in touch');
  });
});
