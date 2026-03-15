import {urls} from '../data/URL'

export class CheckoutStepOnePage {
  constructor(page) {
    this.page = page
    this.firstNameField = page.locator('[data-test="firstName"]')
    this.lastNameField = page.locator('[data-test="lastName"]')
    this.postalCode = page.locator('[data-test="postalCode"]')
    this.continueButton = page.locator('[data-test="continue"]')
    this.title = page.locator('[data-test="title"]')
  }
  async openCheckoutStepOnePage() {
    await this.page.goto(urls.checkoutStepOne)
  }
  async fillForm(firstName, lastName, postalCode) {
    await this.firstNameField.fill(firstName)
    await this.lastNameField.fill(lastName)
    await this.postalCode.fill(postalCode)
  }
  // You don't need to wrap a simple click() in a function, just use it straight in the test.
  async continue_Button() {
    await this.continueButton.click()
  }
}
