import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBasicInfoComponent } from './edit-basic-info.component';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { signal } from '@angular/core';
import { DEFAULT_PORTFOLIO_CONTENT } from '../../../data/portfolio.data';

const mockPortfolioService = {
  hero:        signal(DEFAULT_PORTFOLIO_CONTENT.hero),
  updateHero:  jest.fn(),
};

describe('EditBasicInfoComponent', () => {
  let component: EditBasicInfoComponent;
  let fixture: ComponentFixture<EditBasicInfoComponent>;

  beforeEach(async () => {
    mockPortfolioService.updateHero.mockReset();

    await TestBed.configureTestingModule({
      imports: [EditBasicInfoComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(EditBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with current hero data', () => {
    expect(component.form().name).toBe(DEFAULT_PORTFOLIO_CONTENT.hero.name);
    expect(component.form().email).toBe(DEFAULT_PORTFOLIO_CONTENT.hero.email);
  });

  it('should update form field via update()', () => {
    component.update('name', 'New Name');
    expect(component.form().name).toBe('New Name');
  });

  it('should call portfolioService.updateHero on save()', () => {
    component.save();
    expect(mockPortfolioService.updateHero).toHaveBeenCalledWith(component.form());
  });

  it('should set saved signal to true after save()', () => {
    jest.useFakeTimers();
    component.save();
    expect(component.saved()).toBe(true);
    jest.useRealTimers();
  });

  it('should reset saved signal after 2500ms', () => {
    jest.useFakeTimers();
    component.save();
    jest.advanceTimersByTime(2500);
    expect(component.saved()).toBe(false);
    jest.useRealTimers();
  });

  it('should reset form to current hero data on reset()', () => {
    component.update('name', 'Changed');
    component.reset();
    expect(component.form().name).toBe(DEFAULT_PORTFOLIO_CONTENT.hero.name);
  });

  it('should render all form fields', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input');
    // name, tagline, email, phone, available checkbox
    expect(inputs.length).toBeGreaterThanOrEqual(4);
  });

  it('should render save button', () => {
    const saveBtn = fixture.nativeElement.querySelector('.btn-save');
    expect(saveBtn).toBeTruthy();
    expect(saveBtn.textContent).toContain('Save changes');
  });

  it('should show saved message when saved() is true', () => {
    component.saved.set(true);
    fixture.detectChanges();
    const msg = fixture.nativeElement.querySelector('.saved-msg');
    expect(msg).toBeTruthy();
    expect(msg.textContent).toContain('Saved successfully');
  });
});
