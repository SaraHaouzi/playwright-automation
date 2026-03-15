export class completePage {
  constructor(page) {
    this.page = page
    this.title = page.locator('[data-test="title"]')
    this.message = page.locator('[data-test="complete-header"]')
  }
}
