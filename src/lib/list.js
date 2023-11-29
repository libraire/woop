const METHODS = {
  SortCharacter: {
    func: function (text) {
      return text
        .replace(/\n$/, "")
        .split("\n")
        .sort((a, b) => a.localeCompare(b))
        .join("\n");
    },
    usage: "Sort character list ",
  },
  SortNumber: {
    func: function (text) {
      return text
        .replace(/\n$/, "")
        .split("\n")
        .sort((a, b) => {
          return Number(a) - Number(b);
        })
        .join("\n");
    },
    usage: "Sort number list ",
  },
  ReverseList: {
    func: function (text) {
      return text.replace(/\n$/, "").split("\n").reverse().join("\n");
    },
    usage: "Reverse element of list",
  },
  UniqueList: {
    func: function (text) {
      let set = new Set(text.replace(/\n$/, "").split("\n"));
      return Array.from(set).join("\n");
    },
    usage: "Make elements in list is unique",
  },
  AppendList: {
    func: function (text, argument) {
      let list = text.replace(/\n$/, "").split("\n");
      let args = argument.replace(/\n$/, "").split("\n");
      let result = [];
      for (let i = 0; i < list.length; i++) {
        if (i < args.length) {
          result.push(list[i] + " " + args[i]);
        } else {
          result.push(list[i]);
        }
      }
      return result.join("\n");
    },
    usage: "Append each row of arguments to list",
    argument: true,
  },
};

export { METHODS };
