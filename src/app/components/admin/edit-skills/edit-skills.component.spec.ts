import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSkillsComponent } from './edit-skills.component';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { signal } from '@angular/core';
import { DEFAULT_PORTFOLIO_CONTENT } from '../../../data/portfolio.data';

const mockPortfolioService = {
  skillGroups:       signal(DEFAULT_PORTFOLIO_CONTENT.skillGroups),
  updateSkillGroups: jest.fn(),
};

describe('EditSkillsComponent', () => {
  let component: EditSkillsComponent;
  let fixture: ComponentFixture<EditSkillsComponent>;

  beforeEach(async () => {
    mockPortfolioService.updateSkillGroups.mockReset();

    await TestBed.configureTestingModule({
      imports: [EditSkillsComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(EditSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load skill groups on init', () => {
    expect(component.items().length).toBe(DEFAULT_PORTFOLIO_CONTENT.skillGroups.length);
  });

  it('should updateField on a group', () => {
    component.updateField(0, 'title', 'Updated Title');
    expect(component.items()[0].title).toBe('Updated Title');
  });

  it('should updateTag correctly', () => {
    component.updateTag(0, 0, 'NewTag');
    expect(component.items()[0].tags[0]).toBe('NewTag');
  });

  it('should addTag to a group', () => {
    const before = component.items()[0].tags.length;
    component.addTag(0);
    expect(component.items()[0].tags.length).toBe(before + 1);
  });

  it('should removeTag from a group', () => {
    const before = component.items()[0].tags.length;
    component.removeTag(0, 0);
    expect(component.items()[0].tags.length).toBe(before - 1);
  });

  it('should addGroup', () => {
    const before = component.items().length;
    component.addGroup();
    expect(component.items().length).toBe(before + 1);
  });

  it('should removeGroup', () => {
    const before = component.items().length;
    component.removeGroup(0);
    expect(component.items().length).toBe(before - 1);
  });

  it('should call updateSkillGroups on save()', () => {
    component.save();
    expect(mockPortfolioService.updateSkillGroups).toHaveBeenCalledWith(component.items());
  });

  it('should show saved message then hide after 2500ms', () => {
    jest.useFakeTimers();
    component.save();
    expect(component.saved()).toBe(true);
    jest.advanceTimersByTime(2500);
    expect(component.saved()).toBe(false);
    jest.useRealTimers();
  });

  it('new group should have unique id', () => {
    component.addGroup();
    component.addGroup();
    const ids = component.items().map((g) => g.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});
