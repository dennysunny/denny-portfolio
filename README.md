# Denny Sunny — Angular 18 Portfolio

Production-grade Angular 18 portfolio with CMS admin panel and role-based access control.

---

## ✨ Angular 18 Features Used

| Feature | Where |
|---|---|
| `signal()`, `computed()` | Auth & Portfolio services, all components |
| `input()` / `input.required()` | SectionHeaderComponent, FadeUpDirective |
| `output()` | FadeUpDirective visible event |
| `@for`, `@if`, `@switch`, `$index`, `$last` | All list/conditional rendering |
| `inject()` | Every component — no constructor injection |
| Standalone components | Entire app, zero NgModules |
| Lazy-loaded routes | portfolio-shell, login, admin/dashboard |
| `structuredClone()` | Deep copy in all edit components |

---

## 🔐 Permission System

| Role | View portfolio | Access /admin | Edit content |
|---|---|---|---|
| Not logged in | ✅ | ❌ | ❌ |
| Viewer | ✅ | ❌ | ❌ |
| Manager | ✅ | ✅ | ✅ |

Demo credentials:
- Manager: `iamdennysunny@gmail.com` / `manager123`
- Viewer: `viewer@demo.com` / `viewer123`

---

## 🚀 Getting Started

```bash
npm install
ng serve         # http://localhost:4200
```

---

## 🧪 Running Tests

```bash
npm test                 # run all Jest tests
npm run test:watch       # watch mode
npm run test:coverage    # coverage report
```

Test files exist for every component, service, guard, and directive:
- `auth.service.spec.ts` — 13 tests
- `portfolio.service.spec.ts` — 14 tests
- `auth.guard.spec.ts` — 5 tests
- `fade-up.directive.spec.ts` — 5 tests
- `nav.component.spec.ts` — 10 tests
- `hero.component.spec.ts` — 10 tests
- `experience.component.spec.ts` — 9 tests
- `skills.component.spec.ts` — 9 tests
- `about.component.spec.ts` — 9 tests
- `contact.component.spec.ts` — 9 tests
- `footer.component.spec.ts` — 6 tests
- `login.component.spec.ts` — 9 tests
- `dashboard.component.spec.ts` — 11 tests
- `edit-hero.component.spec.ts` — 10 tests
- `edit-experience.component.spec.ts` — 13 tests
- `edit-skills.component.spec.ts` — 11 tests
- `edit-about.component.spec.ts` — 13 tests
- `edit-contact.component.spec.ts` — 12 tests

---

## 🌐 Free Hosting — GitHub Pages

```bash
git init
git remote add origin https://github.com/<username>/<repo>.git
git add . && git commit -m "feat: portfolio"
git push -u origin main
ng deploy --base-href="/<repo-name>/"
# Live at: https://<username>.github.io/<repo-name>/
```

---

## ✏️ Updating Content

All default content is in `src/app/data/portfolio.data.ts`.
Runtime editing: log in as Manager → visit `/admin`.
