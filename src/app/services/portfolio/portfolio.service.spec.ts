import { TestBed } from '@angular/core/testing';
import { PortfolioService } from './portfolio.service';
import { DEFAULT_PORTFOLIO_CONTENT } from '../../data/portfolio.data';
import { HeroData, Experience, SkillGroup, AboutData, ContactLink } from '../../models/portfolio.model';

describe('PortfolioService', () => {
  let service: PortfolioService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── Hero ────────────────────────────────────────────────────────────────

  it('should load default hero data', () => {
    expect(service.hero().name).toBe(DEFAULT_PORTFOLIO_CONTENT.hero.name);
    expect(service.hero().email).toBe(DEFAULT_PORTFOLIO_CONTENT.hero.email);
  });

  it('should update hero data', () => {
    const updated: HeroData = {
      ...service.hero(),
      name: 'John Doe',
      tagline: 'Looking for work',
    };
    service.updateHero(updated);
    expect(service.hero().name).toBe('John Doe');
    expect(service.hero().tagline).toBe('Looking for work');
  });

  it('should persist hero data to localStorage', () => {
    service.updateHero({ ...service.hero(), name: 'Test Name' });
    const saved = JSON.parse(localStorage.getItem('portfolio_content')!);
    expect(saved.hero.name).toBe('Test Name');
  });

  // ── Experiences ─────────────────────────────────────────────────────────

  it('should load default experiences', () => {
    expect(service.experiences().length).toBe(
      DEFAULT_PORTFOLIO_CONTENT.experiences.length
    );
  });

  it('should update experiences', () => {
    const newExp: Experience[] = [
      {
        id: 'exp-test',
        period: '2024 — Present',
        company: 'TestCorp',
        role: 'Engineer — ',
        roleHighlight: 'Frontend',
        bullets: ['Did stuff'],
      },
    ];
    service.updateExperiences(newExp);
    expect(service.experiences().length).toBe(1);
    expect(service.experiences()[0].company).toBe('TestCorp');
  });

  // ── Skills ──────────────────────────────────────────────────────────────

  it('should load default skill groups', () => {
    expect(service.skillGroups().length).toBe(
      DEFAULT_PORTFOLIO_CONTENT.skillGroups.length
    );
  });

  it('should update skill groups', () => {
    const updated: SkillGroup[] = [
      { id: 'sg-test', icon: '🔧', title: 'Test Skills', tags: ['Jest', 'Angular'] },
    ];
    service.updateSkillGroups(updated);
    expect(service.skillGroups().length).toBe(1);
    expect(service.skillGroups()[0].title).toBe('Test Skills');
  });

  // ── About ────────────────────────────────────────────────────────────────

  it('should load default about data', () => {
    expect(service.about().location).toBe(DEFAULT_PORTFOLIO_CONTENT.about.location);
  });

  it('should update about data', () => {
    const updated: AboutData = {
      ...service.about(),
      location: 'Bangalore, India',
    };
    service.updateAbout(updated);
    expect(service.about().location).toBe('Bangalore, India');
  });

  // ── Contact ──────────────────────────────────────────────────────────────

  it('should load default contact links', () => {
    expect(service.contactLinks().length).toBeGreaterThan(0);
  });

  it('should update contact links', () => {
    const updated: ContactLink[] = [
      { id: 'c-test', icon: '✉', label: 'test@example.com', href: 'mailto:test@example.com' },
    ];
    service.updateContactLinks(updated);
    expect(service.contactLinks().length).toBe(1);
    expect(service.contactLinks()[0].label).toBe('test@example.com');
  });

  // ── Reset ────────────────────────────────────────────────────────────────

  it('should reset content to defaults', () => {
    service.updateHero({ ...service.hero(), name: 'Changed Name' });
    service.resetToDefaults();
    expect(service.hero().name).toBe(DEFAULT_PORTFOLIO_CONTENT.hero.name);
    expect(localStorage.getItem('portfolio_content')).toBeNull();
  });

  // ── UI state ─────────────────────────────────────────────────────────────

  it('should update activeSection signal', () => {
    service.activeSection.set('skills');
    expect(service.activeSection()).toBe('skills');
  });

  it('should update navScrolled signal', () => {
    service.navScrolled.set(true);
    expect(service.navScrolled()).toBe(true);
  });

  // ── Stats ────────────────────────────────────────────────────────────────

  it('should update stats', () => {
    service.updateStats([{ num: '10+', label: 'Years' }]);
    expect(service.stats().length).toBe(1);
    expect(service.stats()[0].num).toBe('10+');
  });
});
