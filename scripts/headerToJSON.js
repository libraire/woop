/**
 * name: HTTP Headers to JSON
 * usage: Converts color-separated HTTP headers to JSON format
 * args: No
 * author: rektdeckard (https://github.com/IvanMathy/Boop/pull/350/commits/e6e2a1b4c035376afc20226a34a0c16865c26958)
 **/

function headerToJSON(text) {
  try {
    const data = text.trim();
    const lines = data.split(/[\r\n]+/).reduce((acc, line) => {
      const [key, value] = line.split(":").map((line) => line.trim());
      if (!value) return acc;
      return { ...acc, [key]: value };
    }, {});
    return JSON.stringify(lines);
  } catch (ex) {
    return ex.message;
  }
}
