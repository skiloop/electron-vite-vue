import  {Page} from "puppeteer-core";
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import {fixUserAgent} from "./util/browser";
// 使用Stealth插件，防止被侦测
puppeteer.use(StealthPlugin())
const checkDocumentHidden = () => document.hidden
export class Controller {
    browser: any
    current: Page
    async connect(port: number) {
        this.browser = await puppeteer.connect({
            browserURL: `http://localhost:${port}`
        }).catch((err) => {
            console.log(err)
        })
        console.log(this.browser ? "connected" : "connected failed")
    }


    async currentPage(): Promise<Page | undefined | null> {
        const targets = this.browser?.targets()
        if (targets === undefined) {
            return
        }
        for (let i = 0; i < targets.length; i++) {
            if (targets[i].type() !== 'page') {
                continue
            }
            const page = await targets[i].page()
            const title = await page.title()
            console.log(`page title: ${title}, url: ${page.url}`)
            if(title !== 'Browser'){
                continue
            }
            console.log(`page eval func: ${checkDocumentHidden.toString()}`)
            const isHidden = await page?.evaluate(checkDocumentHidden)
            if (!isHidden) {
                // await page.evaluateOnNewDocument(() => {
                //   window.navigator = {}
                // })
                const agent = await page.evaluate(() => navigator.userAgent);
                const newAgent = fixUserAgent(agent)
                console.log(`userAgent: ${agent}`)
                console.log(`new userAgent: ${newAgent}`)
                await page.setUserAgent(newAgent)
                console.log('found open page')
                return page
            }
        }
        return
    }

    async goto(url:string){
        if(!this.current){
            this.current = await this.currentPage()
        }
        if(this.current==null){
            console.log(`null current page, fail to goto: ${url}`)
            return
        }

        await this.current.setViewport({width:1920, height:1080})
        await this.current.goto(url)
        console.log(`done to view: ${url}`)
    }
}