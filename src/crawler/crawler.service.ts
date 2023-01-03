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
    console.log('hereee', page, this.browser, this.page);
    if (!this.browser) {
      await this.createBrowser();
    }
    if (!this.page) {
      await this.openANewTab();
    }

    console.log(this.page);

    await this.page.goto(page);
    return this.page;
  }
  async closeBrowser() {
    await this.browser.close();
  }
}
