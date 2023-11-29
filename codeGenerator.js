const fs = require("fs");

// Regex patterns
const nameRegex = /name:\s(.*)/;
const usageRegex = /usage:\s(.*)/;
const argsRegex = /args:\s(.*)/;

function parseFilesInDir(dir) {
  const files = fs.readdirSync(dir);

  var output = "const METHODS = { \n";
  for (let file of files) {
    var contnet = parseFile(dir + "/" + file);
    output += contnet;
    if (file !== files[files.length - 1]) {
      output += ",\n";
    }
  }

  output += "};\n";
  output += "export { METHODS }";
  fs.writeFileSync("./src/lib/auto-generate.js", output);
}

function parseFile(file) {
  const data = fs.readFileSync(file, "utf8");
  // Extract metadata
  const name = nameRegex.exec(data)[1];
  const usage = usageRegex.exec(data)[1];
  const args = argsRegex.exec(data)[1];

  // Extract function
  data.indexOf("function");

  const funcBody = data.substring(
    data.indexOf("function"),
    data.lastIndexOf("}") + 1,
  );
  var output = "";

  output += '"' + name.trim() + '"' + ": { \n";
  output += "func: " + funcBody + ",\n";
  output += "usage: " + '"' + usage.trim() + '"' + "\n";
  output += "}\n";

  return output;
}

parseFilesInDir("./scripts");
