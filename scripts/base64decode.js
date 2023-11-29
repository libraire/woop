/**
 * name: Base64 Decode
 * usage: Base64 Decode
 * args: No
 **/

function base64Decode(base64) {
  // Use the built-in atob() function to decode the Base64 string
  var decodedString = atob(base64);

  // Convert the decoded string to a UTF-8 byte array
  var bytes = new Uint8Array(decodedString.length);
  for (var i = 0; i < decodedString.length; i++) {
    bytes[i] = decodedString.charCodeAt(i);
  }

  // Convert the byte array back to a string
  var decodedStr = String.fromCharCode.apply(null, bytes);

  return decodedStr;
}
