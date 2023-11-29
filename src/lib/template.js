import P from "../vendors/parsimmon";

// Use the JSON standard's definition of whitespace rather than Parsimmon's.
let whitespace = P.regexp(/\s*/m);

// JSON is pretty relaxed about whitespace, so let's make it easy to ignore
// after most text.
function token(parser) {
  return parser.skip(whitespace);
}

// Several parsers are just strings with optional whitespace.
function word(str) {
  return ignoreCaseString(str).thru(token);
}

function ignoreCaseString(str) {
  return P.custom(function (success, failure) {
    return function (input, i) {
      let j = i + str.length;
      let head = input.slice(i, j);
      if (head === str || head.toLowerCase() === str) {
        return success(j, head);
      } else {
        return failure(i, str);
      }
    };
  });
}

function fieldType(type) {
  return P.seqMap(
    ignoreCaseString(type),
    P.alt(
      token(ignoreCaseString("(").then(P.digits).skip(ignoreCaseString(")"))),
      P.optWhitespace,
    ),
    P.alt(
      token(
        ignoreCaseString("(")
          .then(P.digits)
          .skip(word(","))
          .then(P.digit)
          .skip(ignoreCaseString(")")),
      ),
      P.optWhitespace,
    ),
    function (t, l, l2) {
      return t;
    },
  );
}

function allTypes() {
  return P.alt(
    // numeric
    fieldType("tinyint"),
    fieldType("smallint"),
    fieldType("mediumint"),
    fieldType("integer"),
    fieldType("int"),
    fieldType("bigint"),
    fieldType("float"),
    fieldType("double"),
    fieldType("decimal"),
    // char
    fieldType("varchar"),
    fieldType("char"),
    fieldType("tinytext"),
    fieldType("text"),
    fieldType("mediumtext"),
    fieldType("longtext"),
    //time
    fieldType("datetime"),
    fieldType("date"),
    fieldType("time"),
    fieldType("timestamp"),
    //blob
    fieldType("tinyblob"),
    fieldType("blob"),
    fieldType("mediumblob"),
    fieldType("longblob"),
    //binary
    fieldType("binary"),
    fieldType("varbinary"),
    //boolean
    fieldType("boolean"),
    fieldType("bit"),
  );
}

function toJavaType(sqlType) {
  let type = sqlType.toLowerCase();
  if (
    type === "tinyint" ||
    type === "smallint" ||
    type === "mediumint" ||
    type === "integer" ||
    type === "int"
  ) {
    return "Integer";
  } else if (type === "bigint") {
    return "Long";
  } else if (type === "float") {
    return "Float";
  } else if (type === "double") {
    return "Double";
  } else if (type === "decimal") {
    return "BigDecimal";
  } else if (
    type === "varchar" ||
    type === "char" ||
    type === "tinytext" ||
    type === "text" ||
    type === "mediumtext" ||
    type === "longtext"
  ) {
    return "String";
  } else if (type === "timestamp") {
    return "Timestamp";
  } else if (type === "date" || type === "datetime") {
    return "Date";
  } else if (type === "time") {
    return "Time";
  } else if (
    type === "tinyblob" ||
    type === "blob" ||
    type === "mediumblob" ||
    type === "longblob" ||
    type === "binary" ||
    type === "varbinary"
  ) {
    return "byte []";
  } else if (type === "bit" || type === "boolean") {
    return "Boolean";
  } else {
    return "Object";
  }
}

function allAttributes() {
  return P.alt(
    word("not null"),
    word("null"),
    word("auto_increment"),
    word("primary key"),
    word("unique"),
    word("binary"),
    word("unsigned"),
  );
}

function optional(name) {
  return P.alt(token(word(name)), P.optWhitespace);
}

function argumentValue(name) {
  return P.alt(
    P.seqMap(word(name), token(word("null")), function (a, b) {
      return b;
    }),
    P.seqMap(word(name), token(P.digit), function (a, b) {
      return b;
    }),
    word(name)
      .skip(ignoreCaseString("'"))
      .then(
        P.takeWhile(function (x) {
          return x !== "'";
        }),
      )
      .skip(ignoreCaseString("'"))
      .skip(whitespace),
    P.seqMap(
      word(name),
      optional("current_timestamp"),
      optional("on"),
      optional("update"),
      optional("current_timestamp"),
      function (a, b, c, d, e) {
        if (e) {
          return [b, c, d, e].join(" ");
        } else {
          return b;
        }
      },
    ),
    P.optWhitespace,
  );
}

function tableComment() {
  return P.custom(function (success, failure) {
    return function (input, i) {
      const newStr = input.slice().toLowerCase();
      let index = newStr.lastIndexOf("comment");
      let lastBracket = input.lastIndexOf(")");
      if (index > 0 && index > lastBracket) {
        let substr = input.substr(index);
        let r = P.takeWhile(function (x) {
          return x !== "'";
        })
          .then(token(P.regexp(/'((?:\\.|.)*?)'/)))
          .skip(P.all)
          .tryParse(substr);
        r = r.slice(1, -1);
        return success(input.length, r);
      }
      return success(input.length, "");
    };
  });
}

let SQLParser = P.createLanguage({
  value: (r) =>
    P.seqMap(
      r.create,
      r.name,
      word("("),
      r.fields,
      tableComment(),
      function (create, tableName, ignore1, fields, comment) {
        let time = new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, "");
        return {
          tableName: tableName,
          params: fields,
          comment: comment,
          time: time,
        };
      },
    ).desc("sql"),
  create: () =>
    token(word("create").skip(word("table")))
      .thru((parser) => whitespace.then(parser))
      .desc("create"),
  comma: () => word(","),
  name: () =>
    token(
      P.regexp(/[a-z|A-Z|_]+/).wrap(
        P.alt(ignoreCaseString("`"), P.optWhitespace),
        P.alt(ignoreCaseString("`"), P.optWhitespace),
      ),
    ).desc("name"),
  fields: (r) =>
    P.seqMap(
      r.name,
      r.type,
      P.alt(r.attributes.trim(P.optWhitespace).many(), P.optWhitespace),
      argumentValue("default"),
      argumentValue("comment"),
      function (name, type, others, defaults, comment) {
        type = toJavaType(type);
        let comma = ",";
        let as = "";
        if (name.includes("_")) {
          as = name
            .split("_")
            .map((x) => {
              return x.charAt(0).toUpperCase() + x.slice(1);
            })
            .join("");
          as = as.charAt(0).toLowerCase() + as.slice(1);
        }

        return { name, type, defaults, comment, comma, as };
      },
    )
      .sepBy(r.comma)
      .desc("fields"),
  type: () => allTypes(),
  attributes: () => allAttributes(),
});

const METHODS = {
  Template: {
    func: function (text, argument) {
      let array = text.split("\n");
      let result = [];
      for (let i = 0; i < array.length; i++) {
        let params = array[i].split(" ");
        let template = argument;
        for (let j = params.length - 1; j >= 0; j--) {
          template = template.replaceAll("$" + j, params[j]);
        }
        result.push(template);
      }

      return result.join("\n");
    },
    usage:
      "params: write template in the first line and $i represent the ith column like $0 + $1 = $2 which will generate a equation sentense.",
    argument: true,
  },
  SQLTableColumns: {
    func: function (text) {
      let meta = SQLParser.value.tryParse(text);
      return meta.params
        .map((param) => {
          return param.type + " " + param.name;
        })
        .join("\n");
    },
    usage: "Extract column info from SQL schema",
  },
};

export { METHODS };
