import puppeteer, { Browser, Page } from 'puppeteer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CrawlerService {
  browser: Browser;
  page: Page;
  async createBrowser() {
    this.browser = await puppeteer.launch({
      headless: false,
      args: [
        '--start-maximized', // you can also use '--start-fullscreen'
      ],
      defaultViewport: null,
    });
  }
  async openANewTab() {
    if (!this.browser) {
      await this.createBrowser();
    }
    this.page = await this.browser.newPage();
  }

  async goToPage(page: string) {
    if (!this.browser) {
      await this.createBrowser();
    }
    if (!this.page) {
      await this.openANewTab();
    }

    await this.page.goto(page);
    return this.page;
  }
  async closeBrowser() {
    await this.browser.close();
  }
}
