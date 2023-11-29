function callEval(text) {
  const script = text.replace(/\n\n\/\/ Result:[\s\S]*$/, "");
  let output = "";
  try {
    output = eval(script);
    if (typeof output !== "string") {
      output = JSON.stringify(output, null, 2);
    }
  } catch (e) {
    output = "error";
  }
  return output;
}

const METHODS = {
  UpperCase: {
    func: function (text) {
      return text.toUpperCase();
    },
    usage: "Make text to be UpperCase",
  },
  LowerCase: {
    func: function (text) {
      return text.toLowerCase();
    },
    usage: "Make text to be LowerCase",
  },
  SplitBySpace: {
    func: function (text) {
      return text.split(" ").join("\n");
    },
    usage: "Split text by space into a list of text",
  },
  SplitByComma: {
    func: function (text) {
      return text.split(",").join("\n");
    },
    usage: "Split text by comma into a list of text",
  },
  RemoveSpace: {
    func: function (text) {
      return text.replace(/\s/g, "");
    },
    usage: "Remove all whitespace from text",
  },
  JoinLinesWith: {
    func: function (text, argument) {
      return text.replace(/\n/g, argument);
    },
    usage: "Join multiple lines of text into one line",
    argument: true,
  },
  JoinLinesWithComma: {
    func: function (text) {
      return text.replace(/\n/g, ",");
    },
    usage: "Join multiple lines into one line with comma seperated",
  },
  JoinLinesWithSpace: {
    func: function (text) {
      return text.replace(/\n/g, " ");
    },
    usage: "Join multiple lines into one line with space seperated",
  },
  Run: {
    func: callEval,
    usage: "Run any script through eval(), if you know javascript",
  },
  Calculate: {
    func: callEval,
    usage: "A simple Calculator",
  },
  TrimSpace: {
    func: function (text) {
      return text
        .split("\n")
        .map((c) => {
          return c.replace(/\t/g, " ").replace(/\s\s+/g, " ").trim();
        })
        .join("\n");
    },
    usage: "Remove start and end whitespaces and memrge several into one",
  },
  CountChars: {
    func: function (text) {
      if (text === null) {
        return "";
      }
      return text.length;
    },
    usage: "Count characters",
  },
  CountWords: {
    func: function (text) {
      if (text === null) {
        return "";
      }
      return text.replace(/\t/g, " ").replace(/\s\s+/g, " ").trim().split(" ")
        .length;
    },
    usage: "Count words",
  },
  CountLines: {
    func: function (text) {
      return text.split("\n").length;
    },
    usage: "Count lines",
  },
  HumpToUnderline: {
    func: function (text) {
      return text.replace(/\B([A-Z])/g, "_$1").toLowerCase();
    },
    usage: "Convert hump text to underline",
  },
  UnderlineToHump: {
    func: function (text) {
      return text.replace(/_(\w)/g, function (all, letter) {
        return letter.toUpperCase();
      });
    },
    usage: "Convert underline text to hump",
  },
  "URI Encode": {
    func: function (text) {
      return encodeURIComponent(text);
    },
    usage: "Encode URI",
  },
  "URI Decode": {
    func: function (text) {
      return decodeURIComponent(text);
    },
    usage: "Decode URI",
  },
};

export { METHODS };
