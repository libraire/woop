/**
* name: From unicode
* usage: Returns a readable string from the unicode scaped string (js format)
* args: No
* author: luisfontes19 (https://github.com/IvanMathy/Boop/blob/3c0a9ade45d19d30aa879b66f812cba97a111ff7/Scripts/FromUnicode.js)
**/

function fromUnicode(str) {
  return str
    .split("\\u")
    .map((u) => {
      return String.fromCharCode(parseInt(u, 16));
    })
    .join("");
}
