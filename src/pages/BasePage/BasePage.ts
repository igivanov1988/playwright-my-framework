import type { Page } from '@playwright/test';
import { TopBar } from '../../components/basePage/TopBar';

export abstract class BasePage {
    protected readonly topBar: TopBar;

    constructor(protected readonly page: Page) {
        this.topBar = new TopBar(page);
    }

     protected abstract waitUntilReady(): Promise<void>;

     
}
