
export function fixUserAgent(userAgent: string):string {
    // user agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) electron-vue-vite/28.1.0 Chrome/128.0.6613.186 Electron/32.2.3 Safari/537.36
    const parts = userAgent.split(' ')
    const result:string[] = []
    for(const part of parts){
        if(part.startsWith('electron-vue-vite') || part.startsWith('Electron')){
            continue
        }
        result.push(part)
    }
    return result.join(' ')
}