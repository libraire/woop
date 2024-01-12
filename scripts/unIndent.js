/**
 * name: Unindent
 * usage: Unindent a block of text
 * args: No
 * author: Juri Pakaste (https://github.com/IvanMathy/Boop/pull/335/commits/475d7cfcd37bcf395cedd23f9d29ce94c95b175e)
 **/

function unindent(text) {
    let lines = text.split('\n');
    let minIndent = null;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let indent = line.match(/^\s*/)[0];
        if (indent.length == line.length) {
            continue;
        }
        if (minIndent === null || indent.length < minIndent.length) {
            minIndent = indent;
        }
    }
    if (minIndent === null) {
        return text;
    }
    let result = []
    for (let i = 0; i < lines.length; i++) {
        result.push(lines[i].substr(minIndent.length));
    }
    return result.join("\n");
}
