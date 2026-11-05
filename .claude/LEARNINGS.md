# Learnings

## Next.js Middleware
- **Empty async arrow functions**: When using `after()` in Next.js middleware, async functions with empty bodies trigger linter errors. Either add logic or remove the `after()` call entirely.
- **Unused imports**: Remove unused imports like `after` if not actually being used.
