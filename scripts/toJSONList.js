/**
 * name: To JSON List
 * usage: Converts list to JSON list
 * args: No
 * author: drinking
 **/

function toJSONList(text) {
    try {
      const data = text.trim();
      const lines = data.split(/[\r\n]+/).map((line) => {
        return line.trim()
      });
      return JSON.stringify(lines);
    } catch (ex) {
      return ex.message;
    }
  }
  