import { urls } from "../data/URL"

export class CartPage {

    constructor(page) {
        this.page = page
        this.product1Button = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        this.product2Button = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')    }

    async openCartPage() {
        await this.page.goto(urls.cart)
    }

    async add2Product() {
        await this.product1Button.click()
        await this.product2Button.click()
    }




}