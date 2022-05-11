const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(process.argv[2], {
        waitUntil: 'networkidle2',
    });
    await page.evaluate(() => {
        let isAReply = 0;
        if (window.scrollY > 0) isAReply = 1;
        let tweet = document.querySelectorAll("article[data-testid=tweet]")[isAReply].parentNode;
        if (isAReply) {
            document.querySelectorAll("div.r-1bimlpy")[1].style.backgroundColor = "white";
        }
        document.body.innerHTML = "";
        document.body.appendChild(tweet);
        document.querySelector("div.r-h3s6tt").remove();
    });
    let tweet = await page.$$("article[data-testid=tweet]");
    let size = await tweet[0].boundingBox();
    await page.setViewport({
        width: size.width,
        height: size.height
    });
    await page.screenshot({
        path: process.argv[3]
    });
    await browser.close();
})();