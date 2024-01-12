/**
 * name: To Unicode
 * usage: Converts a string to Unicode escape chars (JS format)
 * args: No
 **/



function toUnicode(str) {
  return [...str].map(c => {
    let hex = c.codePointAt(0).toString(16);
    if (hex.length == 2) hex = "00" + hex;
    return ("\\u{" + hex + "}");
  }).join("");
}
