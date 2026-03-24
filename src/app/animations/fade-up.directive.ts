import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
  input,
  output,
} from '@angular/core';

@Directive({
  selector: '[appFadeUp]',
  standalone: true,
})
export class FadeUpDirective implements OnInit, OnDestroy {
  delay  = input<number>(0);
  visible = output<void>();

  private el       = inject(ElementRef);
  private renderer = inject(Renderer2);
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    const el = this.el.nativeElement as HTMLElement;
    this.renderer.setStyle(el, 'opacity', '0');
    this.renderer.setStyle(el, 'transform', 'translateY(28px)');
    this.renderer.setStyle(
      el,
      'transition',
      `opacity 0.7s ease ${this.delay()}ms, transform 0.7s ease ${this.delay()}ms`
    );

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.setStyle(el, 'opacity', '1');
            this.renderer.setStyle(el, 'transform', 'translateY(0)');
            this.visible.emit();
            this.observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
