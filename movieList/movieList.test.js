const { Builder, Capabilities, By } = require("selenium-webdriver");
require('chromedriver');
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
    await (await driver).get('http://localhost:5500/movieList/index.html');
});

afterAll(async () => {
    await (await driver).quit()
});

test('Add movie to page', async () => {
    let inputForm = await driver.findElement(By.xpath('//form/input'));
    await inputForm.sendKeys('Coco');
    await driver.findElement(By.xpath('//form/button')).click();
    await driver.sleep(2000);
});