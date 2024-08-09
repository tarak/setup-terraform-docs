const fs = require('fs')

const core = require('@actions/core')
const tc = require('@actions/tool-cache')

const setup = require('../src/setup-terraform-docs')

jest.mock('@actions/core')
jest.mock('@actions/tool-cache')
fs.chmodSync = jest.fn()

tc.downloadTool.mockResolvedValue('terraform_docs_linux_amd64.zip')
tc.extractZip.mockResolvedValue('terraform_docs')
fs.chmodSync.mockReturnValue(null)

describe('Mock tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('download should be called', async () => {
    await setup()

    expect(tc.downloadTool).toHaveBeenCalledTimes(1)
  })

  test('extract zip should be called', async () => {
    await setup()
    expect(tc.extractZip).toHaveBeenCalledTimes(1)
  })

  test('add path should be called', async () => {
    await setup()

    expect(core.addPath).toHaveBeenCalledTimes(1)
  })
})
