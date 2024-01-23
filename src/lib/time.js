let METHODS = {
  TimeStamp: {
    func: function () {
      return Date.now() / 1000;
    },
    usage: "Get current timestamp",
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
  TimestampToTime: {
    func: function (text) {
      const date = new Date(text * 1000);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");

      return `${hours}:${minutes}:${seconds}`;
    },
    usage: "Convert timestamp to formated time string",
  },
};

export { METHODS };
