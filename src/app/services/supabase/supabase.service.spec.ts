import { TestBed } from "@angular/core/testing";

import { DEFAULT_PORTFOLIO_CONTENT } from "src/app/data/portfolio.data";

import { SupabaseService } from "./supabase.service";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("SupabaseService", () => {
  let service: SupabaseService;

  beforeEach(() => {
    mockFetch.mockReset();
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("fetchContent() returns null when table is empty", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => [] });
    const result = await service.fetchContent();
    expect(result).toBeNull();
  });

  it("fetchContent() returns content when row exists", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [{ content: DEFAULT_PORTFOLIO_CONTENT }],
    });
    const result = await service.fetchContent();
    expect(result?.hero.name).toBe(DEFAULT_PORTFOLIO_CONTENT.hero.name);
  });

  it("fetchContent() sets error signal on failure", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });
    const result = await service.fetchContent();
    expect(result).toBeNull();
    expect(service.error()).toBeTruthy();
  });

  it("fetchContent() sets loading to false after success", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => [] });
    await service.fetchContent();
    expect(service.loading()).toBe(false);
  });

  it("fetchContent() sets loading to false after failure", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });
    await service.fetchContent();
    expect(service.loading()).toBe(false);
  });

  it("saveContent() returns true on success", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });
    const result = await service.saveContent(DEFAULT_PORTFOLIO_CONTENT);
    expect(result).toBe(true);
  });

  it("saveContent() returns false on HTTP error", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 403 });
    const result = await service.saveContent(DEFAULT_PORTFOLIO_CONTENT);
    expect(result).toBe(false);
    expect(service.error()).toBeTruthy();
  });

  it("saveContent() returns false on network error", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));
    const result = await service.saveContent(DEFAULT_PORTFOLIO_CONTENT);
    expect(result).toBe(false);
    expect(service.error()).toContain("Network error");
  });

  it("saveContent() sets loading false after save", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });
    await service.saveContent(DEFAULT_PORTFOLIO_CONTENT);
    expect(service.loading()).toBe(false);
  });

  it("saveContent() clears previous error on new call", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });
    await service.saveContent(DEFAULT_PORTFOLIO_CONTENT);
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });
    await service.saveContent(DEFAULT_PORTFOLIO_CONTENT);
    expect(service.error()).toBeNull();
  });
});
