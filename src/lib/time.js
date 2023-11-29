let METHODS = {
  DateToTimestamp: {
    func: function (text) {
      return Date.parse(text);
    },
    usage: "Convert date format like 2020-01-01 10:10:10 to timestamp",
  },
  TimestampToDate: {
    func: function (text) {
      let date = new Date(text * 1000);
      return (
        date.toLocaleDateString().replace(/\//g, "-") +
        " " +
        date.toTimeString().substr(0, 8)
      );
    },
    usage: "Convert timestamp to Data format",
  },
};

export { METHODS };
