import { type Locator, type Page } from '@playwright/test';

export class TopBar {

    constructor(private readonly page: Page) { }

    get root(): Locator {
        return this.page.getByRole('banner').getByRole('heading', { name: 'Dashboard' })
    }

    get upgradeToAdvanced(): Locator {
        return this.root.getByRole('button', { name: 'Upgrade', exact: true })
    }

    get expandUserDropDown(): Locator {
        return this.root.getByRole('banner').locator('.oxd-userdropdown-tab')
    }

    async openSupportPage(): Promise<void> {
        await this.expandUserDropDown.click()
    }
}