import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditContactComponent } from './edit-contact.component';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { signal } from '@angular/core';
import { DEFAULT_PORTFOLIO_CONTENT } from '../../../data/portfolio.data';

const mockPortfolioService = {
  contactLinks:       signal(DEFAULT_PORTFOLIO_CONTENT.contactLinks),
  updateContactLinks: jest.fn(),
};

describe('EditContactComponent', () => {
  let component: EditContactComponent;
  let fixture: ComponentFixture<EditContactComponent>;

  beforeEach(async () => {
    mockPortfolioService.updateContactLinks.mockReset();

    await TestBed.configureTestingModule({
      imports: [EditContactComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(EditContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load contact links on init', () => {
    expect(component.items().length).toBe(DEFAULT_PORTFOLIO_CONTENT.contactLinks.length);
  });

  it('should updateField on a link', () => {
    component.updateField(0, 'label', 'Updated Label');
    expect(component.items()[0].label).toBe('Updated Label');
  });

  it('should updateField href', () => {
    component.updateField(0, 'href', 'https://example.com');
    expect(component.items()[0].href).toBe('https://example.com');
  });

  it('should addLink', () => {
    const before = component.items().length;
    component.addLink();
    expect(component.items().length).toBe(before + 1);
  });

  it('new link should have correct default icon', () => {
    component.addLink();
    const last = component.items()[component.items().length - 1];
    expect(last.icon).toBe('🔗');
  });

  it('should removeLink', () => {
    const before = component.items().length;
    component.removeLink(0);
    expect(component.items().length).toBe(before - 1);
  });

  it('should call updateContactLinks on save()', () => {
    component.save();
    expect(mockPortfolioService.updateContactLinks).toHaveBeenCalledWith(component.items());
  });

  it('should set saved signal then reset after 2500ms', () => {
    jest.useFakeTimers();
    component.save();
    expect(component.saved()).toBe(true);
    jest.advanceTimersByTime(2500);
    expect(component.saved()).toBe(false);
    jest.useRealTimers();
  });

  it('should render item cards for each link', () => {
    const cards = fixture.nativeElement.querySelectorAll('.item-card');
    expect(cards.length).toBe(DEFAULT_PORTFOLIO_CONTENT.contactLinks.length);
  });

  it('should render Add contact link button', () => {
    const btn = fixture.nativeElement.querySelector('.btn-add');
    expect(btn.textContent).toContain('Add contact link');
  });

  it('new link should have unique id', () => {
    component.addLink();
    component.addLink();
    const ids = component.items().map((l) => l.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});
