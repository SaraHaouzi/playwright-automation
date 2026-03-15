export class CheckoutStepTwoPage {
  constructor(page) {
    this.page = page
    this.title = page.locator('[data-test="title"]')
    this.finishButton = page.locator('[data-test="finish"]')
  }

  // You don't need to wrap a simple click() in a function, just use it straight in the test.
  async finish_Button() {
    this.finishButton.click()
  }
}
