import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsComponent } from './skills.component';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { signal } from '@angular/core';
import { DEFAULT_PORTFOLIO_CONTENT } from '../../data/portfolio.data';

const mockPortfolioService = {
  skillGroups:   signal(DEFAULT_PORTFOLIO_CONTENT.skillGroups),
  activeSection: signal('home'),
};

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section with id="skills"', () => {
    const section = fixture.nativeElement.querySelector('#skills');
    expect(section).toBeTruthy();
  });

  it('should render correct number of skill cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.skill-card');
    expect(cards.length).toBe(DEFAULT_PORTFOLIO_CONTENT.skillGroups.length);
  });

  it('should display skill group titles', () => {
    const titles = fixture.nativeElement.querySelectorAll('.card-title');
    expect(titles[0].textContent.trim()).toBe(
      DEFAULT_PORTFOLIO_CONTENT.skillGroups[0].title
    );
  });

  it('should display skill tags', () => {
    const firstGroupTags = DEFAULT_PORTFOLIO_CONTENT.skillGroups[0].tags;
    const tags = fixture.nativeElement.querySelectorAll('.skill-card:first-child .tag');
    expect(tags.length).toBe(firstGroupTags.length);
  });

  it('should set hovered signal on mouse enter', () => {
    const card = fixture.nativeElement.querySelector('.skill-card');
    card.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    expect(component.hovered()).toBe(DEFAULT_PORTFOLIO_CONTENT.skillGroups[0].id);
  });

  it('should clear hovered signal on mouse leave', () => {
    const card = fixture.nativeElement.querySelector('.skill-card');
    card.dispatchEvent(new MouseEvent('mouseenter'));
    card.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    expect(component.hovered()).toBeNull();
  });

  it('should add active class to hovered card', () => {
    component.hovered.set(DEFAULT_PORTFOLIO_CONTENT.skillGroups[0].id);
    fixture.detectChanges();
    const firstCard = fixture.nativeElement.querySelector('.skill-card');
    expect(firstCard.classList).toContain('active');
  });

  it('should display icons for each skill group', () => {
    const icons = fixture.nativeElement.querySelectorAll('.card-icon');
    expect(icons.length).toBe(DEFAULT_PORTFOLIO_CONTENT.skillGroups.length);
  });
});
