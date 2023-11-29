const METHODS = {
  PickRows: {
    func: function (text, argument) {
      let numbers = argument.match(/\d+/g).map(Number);
      if (numbers.length < 2) {
        return "";
      }
      const row = numbers[0];
      const total = numbers[1];
      let result = [];
      let array = text.replace(/\s\s+/g, " ").split("\n");
      for (let i = 0; i < array.length; i++) {
        if ((i + 1) % total === row) {
          result.push(array[i]);
        }
      }
      return result.join("\n");
    },
    usage:
      "Pick the ith row from multi rows and repeat after n rows. params at first line: i/n",
    argument: true,
  },

  PickColumns: {
    func: function (text, argument) {
      let array = text.replace(/\s\s+/g, " ").split("\n");
      const indices = argument.split(",").map(Number);
      let result = [];
      for (let i = 0; i < array.length; i++) {
        let t = array[i];
        let line = "";
        const cols = t.split(" ");
        for (let j = 0; j < indices.length; j++) {
          line += cols[indices[j] - 1] + " ";
        }
        result.push(line);
      }
      return result.join("\n");
    },
    usage: "Pick columns by their indices e.g. 1,3,5.",
    argument: true,
  },
};

export { METHODS };
