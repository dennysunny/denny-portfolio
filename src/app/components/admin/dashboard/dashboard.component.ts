import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { EditBasicInfoComponent } from '../edit-basic-info/edit-basic-info.component';
import { EditExperienceComponent } from '../edit-experience/edit-experience.component';
import { EditSkillsComponent } from '../edit-skills/edit-skills.component';
import { EditAboutComponent } from '../edit-about/edit-about.component';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

export type AdminTab = 'info' | 'experience' | 'skills' | 'about' | 'contact';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    EditBasicInfoComponent,
    EditExperienceComponent,
    EditSkillsComponent,
    EditAboutComponent,
    EditContactComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  protected auth   = inject(AuthService);
  private router   = inject(Router);

  activeTab = signal<AdminTab>('info');

  readonly tabs: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'info',       label: 'Basic Info', icon: '🏠' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'skills',     label: 'Skills',     icon: '⚡' },
    { id: 'about',      label: 'About',      icon: '👤' },
    { id: 'contact',    label: 'Contact',    icon: '✉' },
  ];

  readonly activeTabLabel = computed(
    () => this.tabs.find((t) => t.id === this.activeTab())?.label ?? ''
  );

  setTab(tab: AdminTab): void {
    this.activeTab.set(tab);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
