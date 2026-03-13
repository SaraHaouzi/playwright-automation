import { expect } from '@playwright/test'

export class LoginPage {

    constructor(page) {
        this.page = page
        this.userNameField = '[data-test="username"]'
        this.userPasswordField = '[data-test="password"]'
        this.loginButtonn = '[data-test="login-button"]'
        this.messageEror = this.page.locator('[data-test="error"]')
    }

    async openLoginPage() {
        await this.page.goto('/',{ timeout: 60000 })
    }

    async login(username, password) {
        await this.page.locator(this.userNameField).fill(username)
        await this.page.locator(this.userPasswordField).fill(password)
        await expect(this.page.locator(this.loginButtonn)).toBeVisible({ timeout: 10000 });
        await this.page.locator(this.loginButtonn).click()
    }

}