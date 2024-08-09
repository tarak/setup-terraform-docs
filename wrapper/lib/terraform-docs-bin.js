const path = require('path')

module.exports = (() => {
  return [process.env.TFDOCS_CLI_PATH, `terraform-docs-bin`].join(path.sep)
})()
