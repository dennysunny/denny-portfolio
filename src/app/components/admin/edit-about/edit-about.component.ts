import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PortfolioService } from 'src/app/services/portfolio/portfolio.service';

import { AboutData, Education } from '../../../models/portfolio.model';

@Component({
  selector: 'app-edit-about',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-about.component.html',
  styleUrl: './edit-about.component.scss',
})
export class EditAboutComponent implements OnInit {
  protected portfolio = inject(PortfolioService);

  form    = signal<AboutData>({ bio: [], location: '', education: [] });
  saved   = signal(false);
  saveErr = signal<string | null>(null);

  ngOnInit(): void {
    this.form.set(structuredClone(this.portfolio.about()));
  }

  updateLocation(value: string): void {
    this.form.update((f) => ({ ...f, location: value }));
  }

  updateBio(index: number, value: string): void {
    this.form.update((f) => {
      const bio = [...f.bio];
      bio[index] = value;
      return { ...f, bio };
    });
  }

  addBio(): void {
    this.form.update((f) => ({ ...f, bio: [...f.bio, ''] }));
  }

  removeBio(index: number): void {
    this.form.update((f) => ({ ...f, bio: f.bio.filter((_, i) => i !== index) }));
  }

  updateEduField<K extends keyof Education>(index: number, key: K, value: Education[K]): void {
    this.form.update((f) => {
      const education = structuredClone(f.education);
      education[index] = { ...education[index], [key]: value };
      return { ...f, education };
    });
  }

  addEducation(): void {
    this.form.update((f) => ({
      ...f,
      education: [...f.education, { id: `edu-${Date.now()}`, degree: '', school: '', year: '' }],
    }));
  }

  removeEducation(index: number): void {
    this.form.update((f) => ({ ...f, education: f.education.filter((_, i) => i !== index) }));
  }

  async save(): Promise<void> {
    this.saveErr.set(null);
    const ok = await this.portfolio.updateAbout(this.form());
    if (ok) {
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 2500);
    } else {
      this.saveErr.set(this.portfolio.dbError() ?? 'Save failed');
    }
  }
}