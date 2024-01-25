import { METHODS as pickerFunc } from "./lib/picker.js";
import { METHODS as simpleFunc } from "./lib/simple.js";
import { METHODS as jsonFunc } from "./lib/formatter.js";
import { METHODS as timeFunc } from "./lib/time.js";
import { METHODS as xtimeFunc } from "./lib/xtime.js";
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
  
  a.no-link {
    text-decoration: none; /* Removes underline */
    color: #cf5454;
  }
  
  a.no-link2 {
    text-decoration: none; /* Removes underline */
    color: #2b2b2b;
  }

  a.no-link:hover {
      color: #b50a0a;
  }

  div.title {
      font-size: 40px;
      font-weight: bolder;
      padding-top: 30px;
      padding-bottom: 30px;
      display: flex;
      justify-content: space-between;
  }

  div.sub-title {
      font-size: 20px;
      font-weight: bolder;
      display: inline;
      align-self: flex-end;
  }

  div.container {
      padding-bottom: 60px;
  }

  body {
      display: flex;
      justify-content: center;
      align-items: center;
  }
    </style>
</head>
<body>  
<div class="container">
<div class="title">
    <a href="https://woop.bytegush.com" class="no-link2">Woop Document </a>
    <div class="sub-title">
        Demo on <a href="https://youtu.be/eE4Qh6QdO68?si=eRiaFijJF74vjRsr" class="no-link">@Youbute</a> <a href="https://www.bilibili.com/video/BV1zk4y1U73K/?vd_source=8e42221f09f89c66bf48ff1c86aba4a7" class="no-link">@Bilibili</a> <a href="https://github.com/libraire/woop" class="no-link">@Github</a>
    </div>
    
</div>
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
    </div>
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
    xtimeFunc,
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
