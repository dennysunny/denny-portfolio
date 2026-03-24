import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAboutComponent } from './edit-about.component';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { signal } from '@angular/core';
import { DEFAULT_PORTFOLIO_CONTENT } from '../../../data/portfolio.data';

const mockPortfolioService = {
  about:       signal(DEFAULT_PORTFOLIO_CONTENT.about),
  updateAbout: jest.fn(),
};

describe('EditAboutComponent', () => {
  let component: EditAboutComponent;
  let fixture: ComponentFixture<EditAboutComponent>;

  beforeEach(async () => {
    mockPortfolioService.updateAbout.mockReset();

    await TestBed.configureTestingModule({
      imports: [EditAboutComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(EditAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default about data', () => {
    expect(component.form().location).toBe(DEFAULT_PORTFOLIO_CONTENT.about.location);
    expect(component.form().bio.length).toBe(DEFAULT_PORTFOLIO_CONTENT.about.bio.length);
    expect(component.form().education.length).toBe(DEFAULT_PORTFOLIO_CONTENT.about.education.length);
  });

  it('should updateLocation', () => {
    component.updateLocation('Mumbai, India');
    expect(component.form().location).toBe('Mumbai, India');
  });

  it('should updateBio paragraph', () => {
    component.updateBio(0, 'New paragraph text');
    expect(component.form().bio[0]).toBe('New paragraph text');
  });

  it('should addBio paragraph', () => {
    const before = component.form().bio.length;
    component.addBio();
    expect(component.form().bio.length).toBe(before + 1);
  });

  it('should removeBio paragraph', () => {
    const before = component.form().bio.length;
    component.removeBio(0);
    expect(component.form().bio.length).toBe(before - 1);
  });

  it('should updateEduField', () => {
    component.updateEduField(0, 'degree', 'PhD Computer Science');
    expect(component.form().education[0].degree).toBe('PhD Computer Science');
  });

  it('should addEducation entry', () => {
    const before = component.form().education.length;
    component.addEducation();
    expect(component.form().education.length).toBe(before + 1);
  });

  it('should removeEducation entry', () => {
    const before = component.form().education.length;
    component.removeEducation(0);
    expect(component.form().education.length).toBe(before - 1);
  });

  it('should call updateAbout on save()', () => {
    component.save();
    expect(mockPortfolioService.updateAbout).toHaveBeenCalledWith(component.form());
  });

  it('should show saved signal after save()', () => {
    jest.useFakeTimers();
    component.save();
    expect(component.saved()).toBe(true);
    jest.advanceTimersByTime(2500);
    expect(component.saved()).toBe(false);
    jest.useRealTimers();
  });

  it('new education entry should have a generated id', () => {
    component.addEducation();
    const last = component.form().education[component.form().education.length - 1];
    expect(last.id).toMatch(/^edu-/);
  });

  it('should render save button', () => {
    const btn = fixture.nativeElement.querySelector('.btn-save');
    expect(btn.textContent).toContain('Save changes');
  });
});
