import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { signal } from '@angular/core';
import { DEFAULT_PORTFOLIO_CONTENT } from '../../data/portfolio.data';

const mockPortfolioService = {
  contactLinks:  signal(DEFAULT_PORTFOLIO_CONTENT.contactLinks),
  activeSection: signal('home'),
};

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section with id="contact"', () => {
    const section = fixture.nativeElement.querySelector('#contact');
    expect(section).toBeTruthy();
  });

  it('should render correct number of contact links', () => {
    const links = fixture.nativeElement.querySelectorAll('.link');
    expect(links.length).toBe(DEFAULT_PORTFOLIO_CONTENT.contactLinks.length);
  });

  it('should display link labels', () => {
    const links = fixture.nativeElement.querySelectorAll('.link');
    expect(links[0].textContent).toContain(DEFAULT_PORTFOLIO_CONTENT.contactLinks[0].label);
  });

  it('should set correct href on each link', () => {
    const links = fixture.nativeElement.querySelectorAll('.link');
    expect(links[0].getAttribute('href')).toBe(DEFAULT_PORTFOLIO_CONTENT.contactLinks[0].href);
  });

  it('should open links in new tab with target="_blank"', () => {
    const links = fixture.nativeElement.querySelectorAll('.link');
    links.forEach((link: Element) => {
      expect(link.getAttribute('target')).toBe('_blank');
    });
  });

  it('should display link icons', () => {
    const icons = fixture.nativeElement.querySelectorAll('.link-icon');
    expect(icons.length).toBe(DEFAULT_PORTFOLIO_CONTENT.contactLinks.length);
  });

  it('should render heading text', () => {
    const heading = fixture.nativeElement.querySelector('h2');
    expect(heading.textContent).toContain("Let's work together");
  });

  it('should render description text', () => {
    const desc = fixture.nativeElement.querySelector('.desc');
    expect(desc).toBeTruthy();
    expect(desc.textContent.length).toBeGreaterThan(10);
  });

  it('should reactively update when contactLinks signal changes', () => {
    mockPortfolioService.contactLinks.set([
      { id: 'c-1', icon: '✉', label: 'new@email.com', href: 'mailto:new@email.com' },
    ]);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('.link');
    expect(links.length).toBe(1);
    expect(links[0].textContent).toContain('new@email.com');
    // restore
    mockPortfolioService.contactLinks.set(DEFAULT_PORTFOLIO_CONTENT.contactLinks);
  });
});
