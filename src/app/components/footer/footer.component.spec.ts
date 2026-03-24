import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture   = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current year', () => {
    const footer = fixture.nativeElement.querySelector('footer');
    expect(footer.textContent).toContain(String(new Date().getFullYear()));
  });

  it('should display author name', () => {
    const footer = fixture.nativeElement.querySelector('footer');
    expect(footer.textContent).toContain('Denny Sunny Neriamparampil');
  });

  it('should display job title', () => {
    const footer = fixture.nativeElement.querySelector('footer');
    expect(footer.textContent).toContain('Senior Frontend Engineer');
  });

  it('should render the gold separator', () => {
    const sep = fixture.nativeElement.querySelector('.sep');
    expect(sep).toBeTruthy();
    expect(sep.textContent.trim()).toBe('—');
  });

  it('should have year equal to new Date().getFullYear()', () => {
    expect(component.year).toBe(new Date().getFullYear());
  });
});
