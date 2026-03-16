import {expect, test} from '@playwright/test'
import {urls} from '../data/URL'
import {UsersNotValid, UsersValid ,locked_out_user} from '../data/users.js'
import {LoginPage} from '../pages/loginPage.js'

test.describe('Login Suite', () => {

  test('Login with valid user', async ({page}) => {
    const loginPage = new LoginPage(page)

    await loginPage.openLoginPage()
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(urls.inventory)
    await expect(loginPage.title).toHaveText('Products')
  })

  UsersValid.forEach((user) => {
    test(`Login with ${user}`, async ({page}) => {
      const loginPage = new LoginPage(page)
      await loginPage.openLoginPage()
      await loginPage.login(user, 'secret_sauce')
      await expect(page).toHaveURL(urls.inventory)
      await expect(loginPage.title).toHaveText('Products')
    })
  })

  test('Login with locked_out_user', async ({page}) => {
    const loginPage = new LoginPage(page)

    await loginPage.openLoginPage()
    await loginPage.login(locked_out_user.username, locked_out_user.password)
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    )
  })

  UsersNotValid.forEach((user, index) => {
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
