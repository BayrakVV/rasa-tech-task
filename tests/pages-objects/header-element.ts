// @ts-check

import { Locator, Page } from "@playwright/test";

export class HeaderElement {
    readonly page: Page;
    readonly homePageLink: Locator;
    readonly cartLink: Locator;

    readonly signUpLink: Locator;
    readonly signUpUsername: Locator;
    readonly signUpPassword: Locator;
    readonly signUpButton: Locator;

    readonly logInLink: Locator;
    readonly logInUsername: Locator;
    readonly logInPassword: Locator;
    readonly logInButton: Locator;

    readonly contactLink: Locator;
    readonly contactEmail: Locator;
    readonly contactName: Locator;
    readonly contactMessage: Locator;
    readonly contactsendMessageButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homePageLink = page.locator("#nava");
        this.cartLink = page.getByRole("link", { name: "Cart", exact: true });

        this.signUpLink = page.getByRole("link", { name: "Sign up" });
        this.signUpUsername = page.locator("#sign-username");
        this.signUpPassword = page.locator("#sign-password");
        this.signUpButton = page.getByRole("button", { name: "Sign up" });

        this.logInLink = page.getByRole("link", { name: "Log in" });
        this.logInUsername = page.locator("#loginusername");
        this.logInPassword = page.locator("#loginpassword");
        this.logInButton = page.getByRole("button", { name: "Log in" });

        this.contactLink = page.getByRole("link", { name: "Contact" });
        this.contactEmail = page.getByLabel("Contact Email:");
        this.contactName = page.getByLabel("Contact Name:");
        this.contactMessage = page.getByLabel("Message:");
        this.contactsendMessageButton = page.getByRole("button", { name: "Send message" });
    }

    async signUp(username: string, password: string) {
        await this.signUpLink.click();
        await this.signUpUsername.fill(username);
        await this.signUpPassword.fill(password);
        await this.signUpButton.click();
    }

    async logIn(username: string, password: string) {
        await this.logInLink.click();
        await this.logInUsername.fill(username);
        await this.logInPassword.fill(password);
        await this.logInButton.click();
    }

    async contactSupport(email: string, name: string, message: string) {
        await this.contactLink.click();
        await this.contactEmail.fill(email);
        await this.contactName.fill(name);
        await this.contactMessage.fill(message);
        await this.contactsendMessageButton.click();
    }
}