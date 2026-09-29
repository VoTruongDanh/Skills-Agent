---
description: "Advanced UI/UX improvements — layout, design critique, copy refinement, interaction design, accessibility, design systems, and responsive patterns. Use when the user wants professional-grade UI/UX upgrades. Triggers: ui, ux, design, layout, responsive, giao diện, thiết kế, cải thiện UI, bento grid, typography, type scale, wcag, accessibility, tokens, shadcn, state matrix, empty state, anti slop, microcopy."
encoding: "UTF-8"
agents: [frontend-specialist, performance-optimizer]
---

Canonical source: .kiro/skills/ui-ux-pro-max/SKILL.md

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. Check design system, brand guidelines, component library, past UI decisions, accessibility notes, and responsive design patterns.
**END**: Update `.ai-memory.md` using **Memory Compaction Rules** with: UI/UX changes, patterns used, a11y improvements, and brand consistency notes.

## Goal
Upgrade the product experience with clear, practical, accessible, and high-performance UI/UX improvements using a unified progressive-disclosure knowledge base.

## Agent Routing
- Primary → read `.kiro/skills/agents/agents/frontend-specialist.md` and apply its knowledge
- For performance of UI (load time, animations) → read `.kiro/skills/agents/agents/performance-optimizer.md` and apply its knowledge
- For accessibility compliance → apply WCAG knowledge from frontend-specialist
- For mobile responsiveness → apply mobile patterns from frontend-specialist

## Socratic Gate
Before improving UI/UX, verify:
1. What screen, flow, or component is being improved?
2. What is the current pain point? (visual, usability, accessibility, performance?)
3. Are there existing design guidelines or component library?
If any answer is unclear, ASK before proceeding.

## Reference Routing Index (Bảng Điều Hướng Tham Chiếu Chuyên Sâu)
When addressing specific UI/UX domains, consult the detailed guides in the `references/` directory:

| Nhiệm vụ / Ngữ cảnh người dùng | Tài liệu tham chiếu chi tiết cần đọc |
| :--- | :--- |
| **Thiết kế tổng thể, chống UI cẩu thả, tối giản** | Đọc `references/1-anti-slop-design.md` |
| **Khả năng truy cập WCAG 2.2 AA, điều hướng phím, ARIA** | Đọc `references/2-wcag-accessibility.md` |
| **Cỡ chữ, thang tỉ lệ toán học, line-height, fluid font** | Đọc `references/3-typography-scale.md` |
| **Bố cục Bento Grid, nhịp 8px, khoảng cách, responsive** | Đọc `references/4-bento-grid-layout.md` |
| **Ma trận 8 trạng thái (Empty, Loading, Error, Focus...)** | Đọc `references/5-component-state-matrix.md` |
| **Hệ thống Token ngữ nghĩa, CSS variables, Dark Mode** | Đọc `references/6-tokens-and-shadcn.md` |
| **Tối ưu Form, Bảng dữ liệu (Table), Micro-copy** | Đọc `references/7-form-and-ux-audit.md` |

## Core UI/UX Framework (Tóm Tắt 7 Trụ Cột Cốt Lõi)

### 1. Anti-UI Slop & Subtractive Design
- Học DNA thiết kế trước khi bắt tay vào code; loại bỏ các container thừa và viền lồng nhau vô nghĩa.
- **Quy tắc bất biến:** Tuyệt đối cấm màu gradient (chỉ dùng solid/flat colors) và cấm icon nhiều màu (chỉ dùng monochrome single-tone icons).

### 2. WCAG 2.2 Level AA Accessibility
- Độ tương phản tối thiểu: 4.5:1 cho văn bản thường, 3.0:1 cho UI components và icon chức năng.
- Bắt buộc có `:focus-visible` (outline 2px solid với offset 2px). Hỗ trợ đầy đủ điều hướng phím Tab và bẫy focus trong Modal.

### 3. Mathematical Type Scale
- Sử dụng thang tỉ lệ chuẩn (Major Third 1.25 hoặc Perfect Fourth 1.333).
- Áp dụng quy luật nghịch đảo: font càng to thì line-height càng hẹp (`1.1 - 1.25`), body text cần line-height thoáng (`1.5 - 1.65`).

### 4. Bento Grid & 8px Rhythm
- Sử dụng hệ thống khoảng cách bội số 8px/4px (`space-1` = 4px, `space-2` = 8px, `space-4` = 16px, `space-8` = 32px...).
- Bố cục Bento Grid bất đối xứng có chủ đích, xác định rõ phần tử Hero, cam kết không cắt xén nội dung quan trọng (Zero-crop).

### 5. 8-State Component Matrix
- Mọi component bắt buộc cover đủ 8 trạng thái: *Default, Hover, Focus-visible, Active/Pressed, Loading/Skeleton, Disabled, Error, Empty State*.

### 6. Semantic Tokens Architecture
- Sử dụng CSS custom properties cho theme (`--background`, `--foreground`, `--primary`, `--muted`, `--border`, `--radius`).
- Đồng bộ cặp surface/foreground, hỗ trợ Light/Dark mode tự nhiên và tương thích cao với Tailwind/Shadcn.

### 7. Form Usability & Micro-copy
- Nhãn trường (Label) luôn nằm trên ô nhập liệu; không dùng placeholder thay thế label; form bố cục 1 cột.
- Bảng dữ liệu: Chữ căn lề trái, số căn lề phải; micro-copy ngắn gọn, dùng động từ cụ thể trên nút bấm, không đổ lỗi cho người dùng.

## Workflow
1. **Read Memory** — Load `.ai-memory.md` for design history and UI patterns.
2. Identify the screen, flow, or component being improved.
3. Consult the appropriate document in `references/` via the Reference Routing Index.
4. Evaluate hierarchy, spacing, clarity, accessibility, states, feedback, and conversion friction.
5. Recommend concrete improvements with rationale.
6. When asked to implement, favor polished but maintainable UI.
7. **Quality Gate** — Read `.kiro/skills/_scripts/checklist.md` and verify all states and accessibility.
8. **Update Memory** — Save UI/UX decisions and patterns to `.ai-memory.md`.

## Output format
- UX issues found
- Visual issues found
- Recommended changes (prioritized)
- Accessibility notes (WCAG compliance)
- Implementation priorities
- Component states covered (empty, loading, error, success)

## Checklist
- [ ] Target screen/component identified
- [ ] Hierarchy and spacing evaluated
- [ ] Accessibility checked (WCAG 2.2 AA)
- [ ] All 8 states covered (empty, loading, error, success, hover, focus, disabled, active)
- [ ] Mobile responsiveness considered (Breakpoints & 44px touch targets)
- [ ] Performance impact assessed
- [ ] Brand consistency maintained
- [ ] Memory file updated

- [ ] Clean code chuẩn (Standard clean code applied)
- [ ] Cập nhật đầy đủ tất cả các file liên quan (All related files fully updated)
- [ ] Cấm màu gradient (No gradient colors — solid/flat colors only)
- [ ] Cấm icon màu (No colored icons — monochrome / single-color only)

## Rules
- Optimize for clarity before decoration.
- Respect existing brand and component patterns when present.
- Include empty, loading, error, and success states when relevant.
- Avoid widespread redesigns unless asked; prioritize small, safe diffs and ASK before large UI rewrites.
- Always read and update the memory file.
- **Quy luật bắt buộc (Mandatory Rules):**
  - **Cấm màu gradient:** Tuyệt đối KHÔNG sử dụng màu gradient (`linear-gradient`, `radial-gradient`, `conic-gradient`, CSS gradient generator, v.v.). Chỉ sử dụng màu đơn sắc, màu phẳng (solid / flat colors) để đảm bảo tính tối giản, tương phản rõ ràng và tính nhất quán cao.
  - **Cấm icon màu:** Tuyệt đối KHÔNG sử dụng icon nhiều màu sắc (multicolor), icon 3D tô màu hoặc emoji màu trong giao diện UI. Chỉ sử dụng icon đơn sắc (monochrome / single-tone icons), đồng bộ với màu text hoặc màu chủ đạo của hệ thống qua `currentColor` hoặc mã màu đơn sắc được quy định.

## Related Skills
- `/create` → read `.kiro/skills/create/SKILL.md` — Implement UI components
- `/preview` → read `.kiro/skills/preview/SKILL.md` — Preview design before implementation
- `/enhance` → read `.kiro/skills/enhance/SKILL.md` — Improve existing UI code

## Encoding
All code snippets and example files referenced or produced by this skill must be UTF-8 encoded. When applicable, include `encoding: "UTF-8"` in SKILL.md front-matter and ensure saved files use UTF-8 (no BOM).
