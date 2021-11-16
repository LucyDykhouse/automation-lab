const { Builder, Capabilities, By } = require("selenium-webdriver");
const { isExportDeclaration } = require("typescript");
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

test('Message content for crossOffMovie', async () => {
    await driver.findElement(By.xpath('//li/span')).click();
    let message = await driver.findElement(By.id('message')).getText();
    expect(message).toEqual('Coco watched!');
});

test('Delete movie', async () => {
    await driver.findElement(By.id('Coco')).click();
    let message = await driver.findElement(By.id('message')).getText();
    expect(message).toEqual('Coco deleted!');
});