import js_beautify from "js-beautify";

const METHODS = {
  Stringify: {
    func: function (text) {
      return JSON.stringify(text);
    },
    usage: "Transform JSON text to string",
  },
  JSONify: {
    func: function (text) {
      let formated = text.trim();
      if (text[0] !== '"') {
        formated = '"' + formated;
      }

      if (text[text.length - 1] !== '"') {
        formated = formated + '"';
      }

      return JSON.parse(formated);
    },
    usage: "Transform text to JSON",
  },
  "Format JSON": {
    func: function (text) {
      try {
        return JSON.stringify(JSON.parse(text), null, 2);
      } catch (error) {
        return "error";
      }
    },
    usage: "Format JSON text",
  },
  "Format JS": {
    func: function (code) {
      const options = { indent_size: 2, space_in_empty_paren: true };
      return js_beautify(code, options);
    },
    usage: "Format JS code",
  },
};

export { METHODS };
