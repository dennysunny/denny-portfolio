import { computed, inject, Injectable, signal } from "@angular/core";

import { DEFAULT_PORTFOLIO_CONTENT } from "src/app/data/portfolio.data";
import {
  AboutData,
  BasicInfo,
  ContactLink,
  Experience,
  PortfolioContent,
  SkillGroup,
  Stat,
} from "src/app/models/portfolio.model";

import { SupabaseService } from "../supabase/supabase.service";

@Injectable({ providedIn: "root" })
export class PortfolioService {
  private supabase = inject(SupabaseService);

  private readonly _content = signal<PortfolioContent>(
    DEFAULT_PORTFOLIO_CONTENT,
  );

  // Public read signals
  readonly hero = computed(() => this._content().info);
  readonly stats = computed(() => this._content().stats);
  readonly experiences = computed(() => this._content().experiences);
  readonly skillGroups = computed(() => this._content().skillGroups);
  readonly about = computed(() => this._content().about);
  readonly contactLinks = computed(() => this._content().contactLinks);

  // Supabase loading state exposed for UI
  readonly loading = this.supabase.loading;
  readonly dbError = this.supabase.error;

  // UI state
  readonly activeSection = signal<string>("home");
  readonly navScrolled = signal<boolean>(false);

  /** Called once at app startup from app.component.ts */
  async init(): Promise<void> {
    const remote = await this.supabase.fetchContent();
    if (remote) {
      // Merge remote onto defaults so new fields added later still appear
      this._content.set({ ...DEFAULT_PORTFOLIO_CONTENT, ...remote });
    }
    // If remote is null (DB not seeded yet) we keep the default data —
    // first save from admin will create the row.
  }

  // ── Update methods ─────────────────────────────────────────────────────

  async updateBasicInfo(info: BasicInfo): Promise<boolean> {
    this._patch({ info });
    return this.supabase.saveContent(this._content());
  }

  async updateStats(stats: Stat[]): Promise<boolean> {
    this._patch({ stats });
    return this.supabase.saveContent(this._content());
  }

  async updateExperiences(experiences: Experience[]): Promise<boolean> {
    this._patch({ experiences });
    return this.supabase.saveContent(this._content());
  }

  async updateSkillGroups(skillGroups: SkillGroup[]): Promise<boolean> {
    this._patch({ skillGroups });
    return this.supabase.saveContent(this._content());
  }

  async updateAbout(about: AboutData): Promise<boolean> {
    this._patch({ about });
    return this.supabase.saveContent(this._content());
  }

  async updateContactLinks(contactLinks: ContactLink[]): Promise<boolean> {
    this._patch({ contactLinks });
    return this.supabase.saveContent(this._content());
  }

  async resetToDefaults(): Promise<boolean> {
    this._content.set(DEFAULT_PORTFOLIO_CONTENT);
    return this.supabase.saveContent(DEFAULT_PORTFOLIO_CONTENT);
  }

  private _patch(partial: Partial<PortfolioContent>): void {
    this._content.update((c) => ({ ...c, ...partial }));
  }
}
