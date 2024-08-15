import { chromium } from 'playwright';
import { test, expect } from '@playwright/test';


test.describe("Tennis Booking script", () => {

    test("Should book time slot", async ({}) => {

        // Launch browser
        const browser = await chromium.launch({ headless: false }); // Set to 'true' for headless mode
        const context = await browser.newContext();
        const page = await context.newPage();

        // Log in
        await page.goto('https://sportcenterwittenau.buchungscloud.de/Platzbuchung/Info-11-tennis');

        // Open tennis booking page
        await page.fill('input[id="Username"]', 'VitalyBB');
        await page.fill('input[id="Password"]', '@P7%3PST1#5iwY#!4*MI');
        await page.click('button[id="Reg"]');

        // Open date picker
        await page.click('input[id="Appointment"]');

        // Choose date by timestamp
        await page.click('td[data-date="1724889600000"]');

        // Choose a slot by timestamp
        await page.click('td[data-appointment="1724929200"]');
        //   await page.click('text="1724929200"');

        // Agree to privacy policy
        await page.click('input[id="PrivacyChecked"]');

        // Submit booking
        await page.click('input[id="form-submit"]');

        // Check success messages
        await page.getByText("Ihre Reservierung für Tennis").isVisible();
        await page.getByText("Ihre Reservierung für Tennis").isVisible();

        // Close browser
        await browser.close();
    })
})

