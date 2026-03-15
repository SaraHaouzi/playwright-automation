import { expect } from '@playwright/test'

export class LoginPage {
  constructor(page) {
    this.page = page
    this.userNameField = page.locator('[data-test="username"]')
    this.userPasswordField = page.locator('[data-test="password"]')
    this.loginButton = page.locator('[data-test="login-button"]')
    this.errorMessage = this.page.locator('[data-test="error"]')
  }

  async openLoginPage() {
    await this.page.goto('/')
  }

  async login(username, password) {
    await this.userNameField.fill(username)
    await this.userPasswordField.fill(password)
    await expect(this.loginButton).toBeVisible()
    await this.loginButton.click()
  }
}
