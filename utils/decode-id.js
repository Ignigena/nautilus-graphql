module.exports = function decodeId(encoded) {
  const decoded = Buffer.from(encoded, 'base64').toString('utf8');
  let [namespace, id] = decoded.split(':');
  if (!isNaN(id) && !isNaN(parseFloat(id))) {
    id = parseFloat(id);
  }
  return { namespace, id };
};
