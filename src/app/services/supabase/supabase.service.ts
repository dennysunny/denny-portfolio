import { Injectable, signal } from "@angular/core";

import { PortfolioContent } from "src/app/models/portfolio.model";
import { environment } from "src/environments/environment";

const { url, anonKey } = environment.supabase;
const TABLE = "portfolio_content";
const ROW_ID = "main";
const HEADERS = {
  "Content-Type": "application/json",
  apikey: anonKey,
  Authorization: `Bearer ${anonKey}`,
};

@Injectable({ providedIn: "root" })
export class SupabaseService {
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  /** Fetch the single content row. Returns null if not yet seeded. */
  async fetchContent(): Promise<PortfolioContent | null> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const res = await fetch(
        `${url}/rest/v1/${TABLE}?id=eq.${ROW_ID}&select=content`,
        { headers: HEADERS },
      );
      if (!res.ok) throw new Error(`Supabase fetch failed: ${res.status}`);
      const rows: { content: PortfolioContent }[] = await res.json();
      return rows.length ? rows[0].content : null;
    } catch (e: any) {
      this.error.set(e?.message ?? "Failed to load content");
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  /** Upsert the full content object. */
  async saveContent(content: PortfolioContent): Promise<boolean> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const res = await fetch(`${url}/rest/v1/${TABLE}`, {
        method: "POST",
        headers: {
          ...HEADERS,
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify({
          id: ROW_ID,
          content,
          updated_at: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`Supabase save failed: ${res.status}`);
      return true;
    } catch (e: any) {
      this.error.set(e?.message ?? "Failed to save content");
      return false;
    } finally {
      this.loading.set(false);
    }
  }
}
