// @ts-check

import { Locator, Page } from "@playwright/test";

export class HeaderElement {
    readonly element: Page;
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

    constructor(element: Page) {
        this.element = element;
        this.homePageLink = element.locator("#nava");
        this.cartLink = element.getByRole("link", { name: "Cart", exact: true });

        this.signUpLink = element.getByRole("link", { name: "Sign up" });
        this.signUpUsername = element.locator("#sign-username");
        this.signUpPassword = element.locator("#sign-password");
        this.signUpButton = element.getByRole("button", { name: "Sign up" });

        this.logInLink = element.getByRole("link", { name: "Log in" });
        this.logInUsername = element.locator("#loginusername");
        this.logInPassword = element.locator("#loginpassword");
        this.logInButton = element.getByRole("button", { name: "Log in" });

        this.contactLink = element.getByRole("link", { name: "Contact" });
        this.contactEmail = element.getByLabel("Contact Email:");
        this.contactName = element.getByLabel("Contact Name:");
        this.contactMessage = element.getByLabel("Message:");
        this.contactsendMessageButton = element.getByRole("button", { name: "Send message" });
    }

    async signUp(username: string, password: string) {
        await this.signUpLink.click();
        await this.signUpUsername.fill(username);
        await this.signUpPassword.fill(password);
        await this.signUpButton.click();
    }

    async LogIn(username: string, password: string) {
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