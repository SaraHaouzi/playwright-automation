import {expect, test} from '@playwright/test'
import {urls} from '../data/URL'
import {checkoutUser, standard} from '../data/users'
import {CartPage} from '../pages/cartPage'
import {CheckoutStepOnePage} from '../pages/CheckoutStepOnePage'
import {CheckoutStepTwoPage} from '../pages/CheckoutStepTwoPage'
import {completePage} from '../pages/completePage'
import {LoginPage} from '../pages/loginPage.js'

test.describe('sanity', () => {
  test('sanity', async ({page}) => {
    const cartPage = new CartPage(page)
    const stepOne = new CheckoutStepOnePage(page)
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page)
    const complete = new completePage(page)
    const loginPage = new LoginPage(page)

    await loginPage.openLoginPage()
    await loginPage.login(standard.username, standard.password)
    await expect(page).toHaveURL(urls.inventory)
    await expect(loginPage.title).toHaveText('Products')
    await cartPage.add2Product()
    await page.goto(urls.cart)
    await expect(page).toHaveURL(urls.cart)
    await expect(cartPage.title).toHaveText('Your Cart')
    await expect(cartPage.count).toHaveText(
      '2',
    )

    await stepOne.openCheckoutStepOnePage()
    await expect(page).toHaveURL(urls.checkoutStepOne)
    await expect(stepOne.title).toHaveText('Checkout: Your Information')
    await stepOne.fillForm(
      checkoutUser.firstName,
      checkoutUser.lastName,
      checkoutUser.postalCode,
    )
    await expect(stepOne.firstNameField).toHaveValue('sara')
    await expect(stepOne.lastNameField).toHaveValue('hauzi')
    await expect(stepOne.postalCode).toHaveValue('1234')
    await stepOne.continueButton.click()

    await expect(page).toHaveURL(urls.checkoutStepTwo)
    await expect(checkoutStepTwoPage.title).toHaveText('Checkout: Overview')
    await checkoutStepTwoPage.finishButton.click()

    await expect(page).toHaveURL(urls.checkoutComplete)
    await expect(complete.title).toHaveText('Checkout: Complete!')
    await expect(complete.message).toHaveText('Thank you for your order!')
  })
})
