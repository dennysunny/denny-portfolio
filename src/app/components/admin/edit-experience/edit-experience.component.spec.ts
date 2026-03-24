import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditExperienceComponent } from './edit-experience.component';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { signal } from '@angular/core';
import { DEFAULT_PORTFOLIO_CONTENT } from '../../../data/portfolio.data';

const mockPortfolioService = {
  experiences:         signal(DEFAULT_PORTFOLIO_CONTENT.experiences),
  updateExperiences:   jest.fn(),
};

describe('EditExperienceComponent', () => {
  let component: EditExperienceComponent;
  let fixture: ComponentFixture<EditExperienceComponent>;

  beforeEach(async () => {
    mockPortfolioService.updateExperiences.mockReset();

    await TestBed.configureTestingModule({
      imports: [EditExperienceComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(EditExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load experiences on init', () => {
    expect(component.items().length).toBe(DEFAULT_PORTFOLIO_CONTENT.experiences.length);
  });

  it('should updateField correctly', () => {
    component.updateField(0, 'company', 'NewCorp');
    expect(component.items()[0].company).toBe('NewCorp');
  });

  it('should updateBullet correctly', () => {
    component.updateBullet(0, 0, 'Updated bullet');
    expect(component.items()[0].bullets[0]).toBe('Updated bullet');
  });

  it('should addBullet to an experience', () => {
    const before = component.items()[0].bullets.length;
    component.addBullet(0);
    expect(component.items()[0].bullets.length).toBe(before + 1);
  });

  it('should removeBullet from an experience', () => {
    const before = component.items()[0].bullets.length;
    component.removeBullet(0, 0);
    expect(component.items()[0].bullets.length).toBe(before - 1);
  });

  it('should addExperience', () => {
    const before = component.items().length;
    component.addExperience();
    expect(component.items().length).toBe(before + 1);
  });

  it('should removeExperience', () => {
    const before = component.items().length;
    component.removeExperience(0);
    expect(component.items().length).toBe(before - 1);
  });

  it('should call updateExperiences on save()', () => {
    component.save();
    expect(mockPortfolioService.updateExperiences).toHaveBeenCalledWith(component.items());
  });

  it('should set saved signal after save()', () => {
    jest.useFakeTimers();
    component.save();
    expect(component.saved()).toBe(true);
    jest.advanceTimersByTime(2500);
    expect(component.saved()).toBe(false);
    jest.useRealTimers();
  });

  it('should render item cards for each experience', () => {
    const cards = fixture.nativeElement.querySelectorAll('.item-card');
    expect(cards.length).toBe(DEFAULT_PORTFOLIO_CONTENT.experiences.length);
  });

  it('should render Add experience button', () => {
    const btn = fixture.nativeElement.querySelector('.btn-add');
    expect(btn.textContent).toContain('Add experience');
  });

  it('should render remove buttons', () => {
    const removeBtns = fixture.nativeElement.querySelectorAll('.btn-remove');
    expect(removeBtns.length).toBe(DEFAULT_PORTFOLIO_CONTENT.experiences.length);
  });

  it('new experience should have unique id', () => {
    component.addExperience();
    const ids = component.items().map((e) => e.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});
