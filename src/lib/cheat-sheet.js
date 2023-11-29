const mustache = require("mustache");
const gitCommands = [
  "git config --global user.name “[firstname lastname]”",
  "set a name that is identiﬁable for credit when review version history",
  "git config --global user.email “[valid-email]”",
  "set an email address that will be associated with each history marker",
  "git config --global color.ui auto",
  "set automatic command line coloring for Git for easy reviewing",
  "git diff",
  "diﬀ of what is changed but not staged",
  "git diff --staged",
  "diﬀ of what is staged but not yet committed",
  "git log branchB..branchA",
  "show the commits on branchA that are not on branchB",
  "git diff branchB...branchA",
  "show the diﬀ of what is in branchA that is not in branchB",
  "git show [SHA]",
  "show any object in Git in human-readable format",
  "git rebase [branch]",
  "apply any commits of current branch ahead of speciﬁed one",
  "git reset --hard [commit]",
  "clear staging area, rewrite working tree from speciﬁed commit",
  "git clean -fxd",
  "delete untracked files, directories and untracked . gitignore files",
];

const vimCommands = [
  "%  move to matching parenthesis, bracket or brace",
  "*/#  find the next/previous instance of the current word",
  // Navigation
  "gg  first line of the file",
  "G  last line of the file",
  ":20  line20 of the file",
  ":1,2t.  copy lines 1 to 2 to current line",
  ":1,2t3  copy lines 1 to 2 to line 3",
  "0  beginning of current line",
  // Editing
  "I  insert at the first non-whitespace character of the line",
  "U  Undo, Ctrl+R  Redo",
  // Copy/pasting
  "C  change the rest of the current line",
  "D  delete the rest of the current line",
  "cw  change one word",
  "c4w  change four words",
  "c4l change four letters",
  "cc  change current line",
  "4x  change four characters after the cursor",
];

const template = `
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  color: black;
  background: white;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>

<table>
  <tr>
    <th>{{column1}}</th>
    <th>{{column2}}</th>
  </tr>
  {{#list}}
    <tr>
        <td>{{command}}</td>
        <td>{{explain}}</td>
    </tr>
  {{/list}}
</table>
  
`;

function buildData(commands) {
  let list = [];
  for (let i = 0; i < commands.length; i++) {
    list.push({
      command: commands[i],
      explain: commands[i + 1],
    });
    i++;
  }
  return list;
}

const METHODS = {
  "Git Cheat Sheet": {
    func: function (text) {
      return mustache.render(template, {
        list: buildData(gitCommands),
        column1: "Command",
        column2: "Explain",
      });
    },
    usage: "Cheat sheet about Git",
  },
  "Vim Cheat Sheet": {
    func: function (text) {
      return mustache.render(template, {
        list: buildData(vimCommands),
        column1: "Command",
        column2: "",
      });
    },
    usage: "Cheat sheet about Vim",
  },
};

export { METHODS };
