module.exports = function encodeId(namespace, id) {
  return Buffer.from(`${namespace}:${id}`).toString('base64');
};
