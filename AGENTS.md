# ClaudeOS Module Development Rules

## Module Contract
- Modules MUST export a default ClaudeOSModule from their entry point
- Modules MUST have a valid claudeos-module.json manifest
- All UI components MUST be React functional components
- API handlers MUST follow Next.js route handler patterns
- Services MUST have health check endpoints

## Development Flow
1. Fork this template
2. Update package.json name: `@claude-nix-os/module-YOUR_NAME`
3. Update claudeos-module.json with your module details
4. Implement your module in src/
5. Write tests for all functionality
6. Publish to GitHub Package Registry

## Pre-Commit Checklist
- [ ] `npm test` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] claudeos-module.json is valid
- [ ] No hardcoded secrets or URLs
- [ ] AGENTS.md is updated

## Testing
- All API handlers must test: auth, happy path, error handling
- All UI components must have rendering tests
- All stores must test every action
- Run: `npm test` before every commit

## Publishing
- Tag with semver: `git tag v1.0.0 && git push --tags`
- CI auto-publishes to GitHub Package Registry
- Update CHANGELOG.md with every release
