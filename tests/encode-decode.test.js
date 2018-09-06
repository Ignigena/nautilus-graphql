const decodeId = require('../utils/decode-id');
const encodeId = require('../utils/encode-id');

let [namespace, id] = ['ToDo', 1];
let result;

it('encodes an ID with a specified namespace', () => {
  result = encodeId(namespace, id);
  expect(result).toBe('VG9Ebzox');
});

it('decodes the ID to the same namespace', () => {
  expect(decodeId(result)).toEqual({
    namespace,
    id,
  });
});

it('handles string IDs properly', () => {
  [namespace, id] = ['Budget', 'F39760BD-3AF5-4CD3-8AAC-32E105E241AA'];
  expect(decodeId(encodeId(namespace, id))).toEqual({
    namespace,
    id,
  });
});
