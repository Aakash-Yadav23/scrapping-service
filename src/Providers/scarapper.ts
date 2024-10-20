import puppeteer from 'puppeteer';
import fs from 'fs';

export const openFlipkartAndScrape = async (product = 'laptop', type = "electronic", site = "flipkart") => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1080, height: 1024 });
    
    let data: any[] = [];

    try {
        await page.goto(`https://www.flipkart.com/search?q=${product}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
        
        console.log("Scraping the data...");
        
        let nextPage = true;
        
        browser.on('disconnected', () => {
            console.log("Browser closed. Saving data to JSON file...");
            fs.writeFileSync('scraped_data.json', JSON.stringify(data, null, 2));
            console.log("Data saved to scraped_data.json");
            process.exit();
        });
        
        while (nextPage) {
            const results = await scrapTheData(page, product, type, site);
            data.push(...results);
            
            const nextButton = await page.$('a._9QVEpD');
            
            if (nextButton) {
                await nextButton.click();
                await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
            } else {
                nextPage = false;
            }
        }
        
        console.log("Scraping completed. Close the browser window to save the data.");
    } catch (error) {
        console.error("Error during scraping:", error);
    }
};

const scrapTheData = async (page: any, product: string, type: string, site: string) => {
    await page.waitForSelector("div.KzDlHZ", { timeout: 60000 });
    
    const results = await page.evaluate((product: string, type: string, site: string) => {
        const titles = Array.from(document.querySelectorAll('div.KzDlHZ')).map(title => title.textContent);
        const prices = Array.from(document.querySelectorAll('div.Nx9bqj._4b5DiR')).map(price => price.textContent);
        const links = Array.from(document.querySelectorAll('a.CGtC98')).map(link => (link as HTMLAnchorElement).href);
        const images = Array.from(document.querySelectorAll('img.DByuf4')).map(img => (img as HTMLImageElement).src);
        
        return titles.map((title, index) => ({
            title: title,
            price: prices[index] || 'Price not available',
            link: links[index] || 'Link not available',
            image: images[index] || 'Image not available',
            product: product,
            category: type,
            site: site,
        }));
    }, product, type, site);
    
    console.log(`Scraped ${results.length} items from the current page.`);
    return results;
}

// Uncomment the line below to run the function
openFlipkartAndScrape('laptop', "electronic", "flipkart");