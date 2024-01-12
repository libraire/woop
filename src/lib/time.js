let METHODS = {
  DateToTimestamp: {
    func: function (text) {
      return Date.parse(text);
    },
    usage: "Convert date format like 2020-01-01 10:10:10 to timestamp",
  },
  TimestampToISOString: {
    func: function (text) {
      let date = new Date(text * 1000);
      return date.toISOString();
    },
    usage: "Convert timestamp to ISO formated string",
  },
};

export { METHODS };
