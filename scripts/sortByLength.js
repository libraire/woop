

/**
 * name: Sort By Text Length
 * usage: Sort By Text Length
 * args: No
* author: drinking
 **/

function sortByLength(text) {
    return text
    .replace(/\n$/, "")
    .split("\n")
    .sort((a, b) => a.length - b.length)
    .join("\n");
}