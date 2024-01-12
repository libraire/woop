/**
 * name: To Unicode
 * usage: Converts a string to Unicode escape chars (JS format)
 * args: No
* author: luisfontes19 (https://github.com/IvanMathy/Boop/blob/3c0a9ade45d19d30aa879b66f812cba97a111ff7/Scripts/toUnicode.js)
 **/

function toUnicode(str) {
  return [...str].map(c => {
    let hex = c.codePointAt(0).toString(16);
    if (hex.length == 2) hex = "00" + hex;
    return ("\\u" + hex);
  }).join("");
}
