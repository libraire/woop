/**
 * name: Base64 Encode
 * usage: Base64 Encode
 * args: No
 **/

function base64Encode(str) {
  // Convert the string to a UTF-8 byte array
  var bytes = new Uint8Array(str.length);
  for (var i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }

  // Use the built-in btoa() function to perform Base64 encoding
  var base64 = btoa(String.fromCharCode.apply(null, bytes));

  return base64;
}
