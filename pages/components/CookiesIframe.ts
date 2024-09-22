import { Page } from "@playwright/test";

export class CookiesIframe{
    page:Page
    private closeCookiesBtn = ()=>{
        return this.page.frameLocator('#cookie-iframe').locator(".close-btn")
    }
    constructor(page:Page){
        this.page = page
    }
    async closeCookiesModal(){
        await this.closeCookiesBtn().click();
    }
}