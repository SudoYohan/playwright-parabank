import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export type PageLink = {
  selector: string;
  path?: string;
  external?: boolean;
  description?: string;
};

export type PageEntry = {
  path: string;
  title?: string;
  actions?: Record<string, PageLink>;
  navLinks?: Record<string, PageLink>;
  footerLinks?: Record<string, PageLink>;
};

export type SiteMapConfig = {
  baseURL: string;
  pages: Record<string, PageEntry>;
};

export class SiteMap {
  readonly config: SiteMapConfig;

  constructor(config: SiteMapConfig) {
    this.config = config;
  }

  static load(fileName = 'site-map.yml'): SiteMap {
    const filePath = path.resolve(process.cwd(), fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const loaded = yaml.load(fileContents) as SiteMapConfig;
    return new SiteMap(loaded);
  }

  getPagePath(pageKey: string): string {
    const page = this.config.pages[pageKey];
    if (!page) throw new Error(`Page map not found: ${pageKey}`);
    return this.config.baseURL + page.path;
  }

  getActionSelector(pageKey: string, actionKey: string): string {
    const page = this.config.pages[pageKey];
    const action = page?.actions?.[actionKey];
    if (!action) throw new Error(`Action not found: ${pageKey}.${actionKey}`);
    return action.selector;
  }

  getActionKeys(pageKey: string): string[] {
    const page = this.config.pages[pageKey];
    if (!page || !page.actions) return [];
    return Object.keys(page.actions);
  }
}
