import {
  Component,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { PortfolioService } from 'src/app/services/portfolio/portfolio.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

interface NavLink {
  href: string;
  id: string;
  label: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  protected portfolio = inject(PortfolioService);
  protected auth      = inject(AuthService);
  protected theme     = inject(ThemeService);
  private router      = inject(Router);

  scrolled  = signal(false);
  menuOpen  = signal(false);

  readonly navLinks: NavLink[] = [
    { href: '#experience', id: 'experience', label: 'Experience' },
    { href: '#skills',     id: 'skills',     label: 'Skills'     },
    { href: '#about',      id: 'about',      label: 'About'      },
    { href: '#contact',    id: 'contact',    label: 'Contact'    },
  ];

  ngOnInit(): void {
    const sections = ['home', 'experience', 'skills', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            this.portfolio.activeSection.set(e.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 50);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  goAdmin(): void {
    this.router.navigate(['/admin']);
  }
}