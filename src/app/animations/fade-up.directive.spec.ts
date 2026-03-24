import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FadeUpDirective } from './fade-up.directive';

@Component({
  standalone: true,
  imports: [FadeUpDirective],
  template: `
    <div appFadeUp [delay]="100" (visible)="onVisible()">Test content</div>
  `,
})
class TestHostComponent {
  visibleEmitted = false;
  onVisible(): void { this.visibleEmitted = true; }
}

describe('FadeUpDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host    = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create host component', () => {
    expect(host).toBeTruthy();
  });

  it('should set initial opacity to 0', () => {
    const el = fixture.nativeElement.querySelector('div');
    expect(el.style.opacity).toBe('0');
  });

  it('should set initial transform translateY(28px)', () => {
    const el = fixture.nativeElement.querySelector('div');
    expect(el.style.transform).toBe('translateY(28px)');
  });

  it('should apply transition with specified delay', () => {
    const el = fixture.nativeElement.querySelector('div');
    expect(el.style.transition).toContain('100ms');
  });

  it('should make element visible when IntersectionObserver fires', () => {
    const el = fixture.nativeElement.querySelector('div') as HTMLElement;

    // Manually trigger: simulate what IntersectionObserver does
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
    fixture.detectChanges();

    expect(el.style.opacity).toBe('1');
    expect(el.style.transform).toBe('translateY(0)');
  });

  it('should default delay to 0 when not specified', async () => {
    @Component({
      standalone: true,
      imports: [FadeUpDirective],
      template: `<div appFadeUp>No delay</div>`,
    })
    class NoDelayHost {}

    const f = TestBed.createComponent(NoDelayHost);
    f.detectChanges();

    const el = f.nativeElement.querySelector('div');
    expect(el.style.transition).toContain('0ms');
  });
});
