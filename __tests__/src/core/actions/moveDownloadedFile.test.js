const fs = require('fs');
const moveFile = require('../../../../src/core/actions/moveFile');

jest.mock('fs');

describe('moveFile command test suite', () => {
  test('moveFile function should call remove files', async () => {
    fs.readdirSync.mockImplementation(() => ['invoice.pdf', 'ignoreme.txt']);

    await moveFile({ browser: {} }, {
      args: {
        source: '.pdf', destination: '/destination/',
      },
    });

    expect(fs.renameSync).toHaveBeenNthCalledWith(1, '/tmp/kasaya/downloads/invoice.pdf', '/destination/');
  });
});
