import type { ClaudeOSModule } from './types';

const module: ClaudeOSModule = {
  name: '@claude-nix-os/module-TEMPLATE_NAME',
  version: '1.0.0',
  description: 'TEMPLATE_DESCRIPTION',
  requires: [],
  optional: [],

  // UI Extensions - uncomment and configure as needed
  // activityBarItems: [],
  // panels: [],
  // sidebarSections: [],
  // settingsPages: [],
  // statusBarItems: [],
  // bottomPanelTabs: [],

  // Server Extensions
  // apiRoutes: [],
  // wsHandlers: [],
  // services: [],

  // Claude Code Extensions
  // skills: [],
  // hooks: [],

  async onLoad() {
    console.log(`[${this.name}] Module loaded`);
  },

  async onUnload() {
    console.log(`[${this.name}] Module unloaded`);
  }
};

export default module;
