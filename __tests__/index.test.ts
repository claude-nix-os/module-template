import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(__dirname, '..');

describe('ClaudeOS Module Validation', () => {
  describe('Module manifest (claudeos-module.json)', () => {
    let manifest: Record<string, unknown>;

    it('should exist and be valid JSON', () => {
      const raw = fs.readFileSync(path.join(ROOT, 'claudeos-module.json'), 'utf-8');
      manifest = JSON.parse(raw);
      expect(manifest).toBeDefined();
    });

    it('should have a name field', () => {
      const raw = fs.readFileSync(path.join(ROOT, 'claudeos-module.json'), 'utf-8');
      manifest = JSON.parse(raw);
      expect(manifest.name).toBeDefined();
      expect(typeof manifest.name).toBe('string');
      expect((manifest.name as string).length).toBeGreaterThan(0);
    });

    it('should have a version field matching semver pattern', () => {
      const raw = fs.readFileSync(path.join(ROOT, 'claudeos-module.json'), 'utf-8');
      manifest = JSON.parse(raw);
      expect(manifest.version).toBeDefined();
      expect(typeof manifest.version).toBe('string');
      expect(manifest.version).toMatch(/^\d+\.\d+\.\d+/);
    });

    it('should have a description field', () => {
      const raw = fs.readFileSync(path.join(ROOT, 'claudeos-module.json'), 'utf-8');
      manifest = JSON.parse(raw);
      expect(manifest.description).toBeDefined();
      expect(typeof manifest.description).toBe('string');
    });

    it('should have a main entry point', () => {
      const raw = fs.readFileSync(path.join(ROOT, 'claudeos-module.json'), 'utf-8');
      manifest = JSON.parse(raw);
      expect(manifest.main).toBeDefined();
      expect(typeof manifest.main).toBe('string');
    });

    it('should have requires as an array', () => {
      const raw = fs.readFileSync(path.join(ROOT, 'claudeos-module.json'), 'utf-8');
      manifest = JSON.parse(raw);
      if (manifest.requires !== undefined) {
        expect(Array.isArray(manifest.requires)).toBe(true);
      }
    });

    it('should have optional as an array', () => {
      const raw = fs.readFileSync(path.join(ROOT, 'claudeos-module.json'), 'utf-8');
      manifest = JSON.parse(raw);
      if (manifest.optional !== undefined) {
        expect(Array.isArray(manifest.optional)).toBe(true);
      }
    });
  });

  describe('Package.json consistency', () => {
    it('should have matching name with module manifest', () => {
      const manifest = JSON.parse(
        fs.readFileSync(path.join(ROOT, 'claudeos-module.json'), 'utf-8')
      );
      const pkg = JSON.parse(
        fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8')
      );
      expect(pkg.name).toBe(manifest.name);
    });

    it('should have matching version with module manifest', () => {
      const manifest = JSON.parse(
        fs.readFileSync(path.join(ROOT, 'claudeos-module.json'), 'utf-8')
      );
      const pkg = JSON.parse(
        fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8')
      );
      expect(pkg.version).toBe(manifest.version);
    });

    it('should include claudeos-module.json in files array', () => {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8')
      );
      expect(pkg.files).toBeDefined();
      expect(pkg.files).toContain('claudeos-module.json');
    });

    it('should have publishConfig for GitHub Package Registry', () => {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8')
      );
      expect(pkg.publishConfig).toBeDefined();
      expect(pkg.publishConfig.registry).toContain('npm.pkg.github.com');
    });
  });

  describe('Module entry point', () => {
    it('should have src/index.ts entry point file', () => {
      const exists = fs.existsSync(path.join(ROOT, 'src', 'index.ts'));
      expect(exists).toBe(true);
    });

    it('should export a default module object', async () => {
      // We import the module to validate its structure
      const mod = await import(path.join(ROOT, 'src', 'index.ts'));
      expect(mod.default).toBeDefined();
      expect(mod.default.name).toBeDefined();
      expect(mod.default.version).toBeDefined();
      expect(mod.default.description).toBeDefined();
    });

    it('should have onLoad and onUnload lifecycle methods', async () => {
      const mod = await import(path.join(ROOT, 'src', 'index.ts'));
      expect(typeof mod.default.onLoad).toBe('function');
      expect(typeof mod.default.onUnload).toBe('function');
    });
  });

  describe('Types definition', () => {
    it('should have types file at src/types.ts', () => {
      const exists = fs.existsSync(path.join(ROOT, 'src', 'types.ts'));
      expect(exists).toBe(true);
    });
  });

  describe('Required project files', () => {
    const requiredFiles = [
      'package.json',
      'claudeos-module.json',
      'tsconfig.json',
      'vitest.config.ts',
      'flake.nix',
      '.npmrc',
      '.gitignore',
      'AGENTS.md',
      'CHANGELOG.md',
      'src/index.ts',
      'src/types.ts',
    ];

    requiredFiles.forEach((file) => {
      it(`should have ${file}`, () => {
        const exists = fs.existsSync(path.join(ROOT, file));
        expect(exists).toBe(true);
      });
    });
  });

  describe('Example files', () => {
    it('should have example panel component', () => {
      const exists = fs.existsSync(
        path.join(ROOT, 'src', 'components', 'ExamplePanel.tsx')
      );
      expect(exists).toBe(true);
    });

    it('should have example API handler', () => {
      const exists = fs.existsSync(
        path.join(ROOT, 'src', 'api', 'example', 'handler.ts')
      );
      expect(exists).toBe(true);
    });
  });
});
