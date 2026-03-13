import { expect, test } from '@playwright/test'
import { LoginPage } from '../pages/loginPage.js'
import { urls } from '../data/URL'
import { UsersNotValid, UsersValid } from '../data/users.js'

test.describe('Login Suite', () => {

    const usersValid = UsersValid
    const usersNotValid = UsersNotValid
    test('Login with valid user', async ({ page }) => {

        const loginPage = new LoginPage(page)

        await loginPage.openLoginPage()
        await loginPage.login('standard_user', 'secret_sauce')
        await expect(page).toHaveURL(urls.inventory)
        await expect(page.locator('[data-test="title"]')).toHaveText('Products')

        await loginPage.openLoginPage()
        await loginPage.login('locked_out_user', 'secret_sauce')
        await expect(loginPage.messageEror).toHaveText('Epic sadface: Sorry, this user has been locked out.')

    })

    usersValid.forEach(user => {
        test(`Login with ${user}`, async ({ page }) => {
            const loginPage = new LoginPage(page)
            await loginPage.openLoginPage()
            await loginPage.login(user, 'secret_sauce')
            await expect(page).toHaveURL(urls.inventory)
            await expect(page.locator('[data-test="title"]')).toHaveText('Products', { timeout: 10000 })
        });
    });

    test('Login with locked_out_user', async ({ page }) => {

        const loginPage = new LoginPage(page)

        await loginPage.openLoginPage()
        await loginPage.login('locked_out_user', 'secret_sauce')
        await expect(loginPage.messageEror).toHaveText('Epic sadface: Sorry, this user has been locked out.')

    })

    usersNotValid.forEach((user, index) => {
        test(`Login with ${index + 1} with username: "${user.username}"`, async ({ page }) => {
            const loginPage = new LoginPage(page)
            await loginPage.openLoginPage()
            await loginPage.login(user.username, user.password)
            await expect(loginPage.messageEror).toHaveText(user.messageEror, { timeout: 10000 })
        })
    })

})


