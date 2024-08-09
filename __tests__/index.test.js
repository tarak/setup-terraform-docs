const os = require('os')
const fs = require('fs')

const core = require('@actions/core')
const tc = require('@actions/tool-cache')

const setup = require('../src/setup-terraform-docs')

jest.mock('@actions/core')
jest.mock('@actions/tool-cache')
fs.chmodSync = jest.fn()

tc.downloadTool.mockResolvedValue('terraform-docs-v0.18.0-darwin-amd64.tar.gz')
tc.extractZip.mockResolvedValue('terraform-docs')
tc.extractTar.mockResolvedValue('terraform-docs')
fs.chmodSync.mockReturnValue(null)

describe('Mock tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('download should be called', async () => {
    await setup()
    expect(tc.downloadTool).toHaveBeenCalledTimes(1)
  })

  test('extract archive should be called', async () => {
    await setup()

    // const platform = mapOS(os.platform())
    if (os.platform() === 'windows' || os.platform() === 'win32') {
      expect(tc.extractZip).toHaveBeenCalledTimes(1)
    } else {
      expect(tc.extractTar).toHaveBeenCalledTimes(1)
    }
  })

  test('add path should be called', async () => {
    await setup()

    expect(core.addPath).toHaveBeenCalledTimes(1)
  })
})
