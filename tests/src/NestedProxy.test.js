beforeAll(async () => {
  await page.goto('http://localhost:6969/nested-proxy')
})

describe('ParentComponent', () => {
  test('instance arrays become proxies', async () => {
    await page.waitForSelector('[data-array]')
    const element = await page.$('[data-array]')
    expect(element).toBeTruthy()
  })

  test('objects nested to instance arrays become proxies', async () => {
    await page.waitForSelector('[data-array-zero]')
    const element = await page.$('[data-array-zero]')
    expect(element).toBeTruthy()
  })

  test('objects nested to instance arrays become proxies', async () => {
    await page.waitForSelector('[data-array-zero-object]')
    const element = await page.$('[data-array-zero-object]')
    expect(element).toBeTruthy()
  })

  test('instance objects become proxies', async () => {
    await page.waitForSelector('[data-object]')
    const element = await page.$('[data-object]')
    expect(element).toBeTruthy()
  })

  test('arrays nested to instance objects become proxies', async () => {
    await page.waitForSelector('[data-object-array]')
    const element = await page.$('[data-object-array]')
    expect(element).toBeTruthy()
  })

  test('non direct object instances nested to instance do not become proxies', async () => {
    await page.waitForSelector('[data-should-not-proxy]')
    const element = await page.$('[data-should-not-proxy]')
    expect(element).toBeTruthy()
  })

  test('context arrays become proxies', async () => {
    await page.waitForSelector('[data-context-array]')
    const element = await page.$('[data-context-array]')
    expect(element).toBeTruthy()
  })

  test('objects nested to context arrays become proxies', async () => {
    await page.waitForSelector('[data-context-array-zero]')
    const element = await page.$('[data-context-array-zero]')
    expect(element).toBeTruthy()
  })

  test('objects nested to context arrays become proxies', async () => {
    await page.waitForSelector('[data-context-array-zero-object]')
    const element = await page.$('[data-context-array-zero-object]')
    expect(element).toBeTruthy()
  })

  test('context objects become proxies', async () => {
    await page.waitForSelector('[data-context-object]')
    const element = await page.$('[data-context-object]')
    expect(element).toBeTruthy()
  })

  test('arrays nested to context objects become proxies', async () => {
    await page.waitForSelector('[data-context-object-array]')
    const element = await page.$('[data-context-object-array]')
    expect(element).toBeTruthy()
  })

  test('non direct object instances nested to context do not become proxies', async () => {
    await page.waitForSelector('[data-context-should-not-proxy]')
    const element = await page.$('[data-context-should-not-proxy]')
    expect(element).toBeTruthy()
  })
})
