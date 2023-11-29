/**
 * name: Merge Lines
 * usage: Merge blank lines into one
 * args: No
 **/

function merge(text) {
  text = text.replace(/\n\s*\n/g, "\n\n");
  return text;
}
