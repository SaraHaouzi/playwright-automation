import {expect, test} from '@playwright/test'
import {urls} from '../data/URL'
import {UsersNotValid, UsersValid} from '../data/users.js'
import {LoginPage} from '../pages/loginPage.js'

test.describe('Login Suite', () => {
  // why you store user data in another variable? just use it straight from the import
  const usersValid = UsersValid
  const usersNotValid = UsersNotValid
  test('Login with valid user', async ({page}) => {
    const loginPage = new LoginPage(page)

    await loginPage.openLoginPage()
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(urls.inventory)
    // Why you are don't store the locator in his own page object model?
    await expect(page.locator('[data-test="title"]')).toHaveText('Products')

    await loginPage.openLoginPage()
    await loginPage.login('locked_out_user', 'secret_sauce')
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    )
  })

  usersValid.forEach((user) => {
    test(`Login with ${user}`, async ({page}) => {
      const loginPage = new LoginPage(page)
      await loginPage.openLoginPage()
      await loginPage.login(user, 'secret_sauce')
      await expect(page).toHaveURL(urls.inventory)
      // Why you are don't store the locator in his own page object model?
      await expect(page.locator('[data-test="title"]')).toHaveText('Products')
    })
  })

  test('Login with locked_out_user', async ({page}) => {
    const loginPage = new LoginPage(page)

    await loginPage.openLoginPage()
    // Why you don't use the user data from the import? why hard coded in the test?
    await loginPage.login('locked_out_user', 'secret_sauce')
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    )
  })

  usersNotValid.forEach((user, index) => {
    test(`Login with ${index + 1} with username: "${user.username}"`, async ({
      page,
    }) => {
      const loginPage = new LoginPage(page)
      await loginPage.openLoginPage()
      await loginPage.login(user.username, user.password)
      await expect(loginPage.errorMessage).toHaveText(user.errorMessage)
    })
  })
})
