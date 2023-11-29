import { METHODS as pickerFunc } from "./lib/picker.js";
import { METHODS as simpleFunc } from "./lib/simple.js";
import { METHODS as jsonFunc } from "./lib/formatter.js";
import { METHODS as timeFunc } from "./lib/time.js";
import { METHODS as listFunc } from "./lib/list.js";
import { METHODS as templateFunc } from "./lib/template.js";
import { METHODS as csFunc } from "./lib/cheat-sheet.js";
import { METHODS as autoFuc } from "./lib/auto-generate.js";
const mustache = require("mustache");

const template = `
<!DOCTYPE html>
<html>
<head>
    <title>Woop Document</title>
    <style>
        table {
            border-collapse: collapse;
        }

        th, td {
            border: 1px solid black;
            padding: 8px;
        }
    </style>
</head>
<body>
    <h1><a href="https://bytebitter.com">Woop</a> Document</h1>
    <table>
        <tr>
            <th>Function</th>
            <th>Usage</th>
        </tr>

        {{#list}}
        <tr>
        <td>{{name}}</td>
        <td>{{usage}}</td>
        </tr>
        {{/list}}
    </table>
</body>
</html>

`;

let hub = {};

const defaultMethods = {
  Usage: {
    func: function () {},
    usage:
      "Select other function to view its usage. More details on wiki page by click (?).",
  },
  Hi: {
    func: function (text) {
      return "Hi " + text + ", why not append UpperCase above?";
    },
    usage: "Hello World Example!",
  },
  Redirect: {
    func: function (text) {
      return text;
    },
    usage: "Redirect the output as input and clear current functions",
  },
  "View All": {
    func: function (text) {
      function buildDoc(dict) {
        let list = [];
        const dictkeys = Object.keys(dict);
        for (let i = 0; i < dictkeys.length; i++) {
          list.push({
            name: dictkeys[i],
            usage: dict[dictkeys[i]].usage,
          });
        }
        return list;
      }

      return mustache.render(template, {
        list: buildDoc(hub),
      });
    },
    usage: "List all functions",
  },
};

function loadFunctions() {
  hub = Object.assign(
    {},
    defaultMethods,
    pickerFunc,
    simpleFunc,
    jsonFunc,
    timeFunc,
    listFunc,
    templateFunc,
    csFunc,
    autoFuc,
  );
  return Object.keys(hub);
}

function mapFunc(name) {
  return hub[name].func;
}

function mapUsage(name) {
  return hub[name].usage;
}

function needArgument(name) {
  return true === hub[name].argument;
}

export { loadFunctions, mapFunc, mapUsage, needArgument };
