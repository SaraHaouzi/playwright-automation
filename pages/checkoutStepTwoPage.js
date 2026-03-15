export class CheckoutStepTwoPage {
  constructor(page) {
    this.page = page
    this.title = page.locator('[data-test="title"]')
    this.finishButton = page.locator('[data-test="finish"]')
  }

}
