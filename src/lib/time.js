let METHODS = {
  Time: {
    func:function() {
      return Date.now() / 1000;
    },
    usage: "Get current timestamp"
  },
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
