<template>
  <div id="app">
    <div class="about">
      <a href="https://woop.bytegush.com/doc.html" target="_blank">document</a>
      <a href="https://github.com/libraire/woop" target="_blank">source</a>
      <a
        href="https://github.com/sponsors/libraire?frequency=recurring&sponsor=drinking"
        target="_blank"
      >
        sponsor</a
      >
    </div>
    <div class="woop">WOOP</div>
    <div
      style="
        color: whitesmoke;
        width: 100%;
        display: flex;
        font-size: 1rem;
        font-weight: 500;
        margin-top: -10px;
        justify-content: center;
      "
    >
      Processing Text With Combined Functions
    </div>

    <FunctionHub
      ref="hub"
      @handle="handle"
      @repeat="repeatable"
      @redirect="redirect"
      @open="openParamArea"
      @close="closeParamArea"
      @copy="copy"
    />
    <div id="editorArea">
      <ParamArea id="param" @transfer="updateArgs" ref="paramter" />
      <EditArea id="editor" @transfer="update" ref="editor" />
    </div>
    <br />
    <code id="output">
      <button id="copyButton" v-on:click="copy" hidden="true">Copy</button>
      {{ output }}
    </code>
  </div>
</template>

<script>
import FunctionHub from "./components/FunctionHub.vue";
import EditArea from "./components/EditArea.vue";
import ParamArea from "./components/ParamArea.vue";

export default {
  name: "App",
  beforeCreate: function () {
    document
      .getElementsByTagName("body")[0]
      .setAttribute("style", "background-color:#121212;");
  },
  data() {
    return {
      output: "",
      editText: "",
      operation: function (text) {
        return text;
      },
      intervalId: null,
      repeat: false,
    };
  },
  components: {
    FunctionHub,
    EditArea,
    ParamArea,
  },
  methods: {
    repeatable(rpt) {
      this.repeat = rpt;
    },
    updateArgs(text) {
      this.$refs.hub.updateArgument(text);
      this.output = this.operation(this.editText);
      let button = document.getElementById("copyButton");
      button.hidden = this.output.length <= 0;
    },
    update(text) {
      this.editText = text;
      this.output = this.operation(text);
      let button = document.getElementById("copyButton");
      button.hidden = this.output.length <= 0;
    },
    handle(operation) {
      this.operation = operation;
      this.output = operation(this.editText);
      let button = document.getElementById("copyButton");
      button.hidden = this.output.length <= 0;

      if (this.repeat) {
        var that = this;
        clearInterval(this.intervalId);
        this.intervalId = setInterval(function () {
          that.output = operation(that.editText);
        }, 1000);
      } else {
        clearInterval(this.intervalId);
      }
    },
    copy() {
      navigator.clipboard.writeText(this.output);
      let button = document.getElementById("copyButton");
      button.innerHTML = "Copied";
      setTimeout(function () {
        button.innerHTML = "Copy";
      }, 1000);
    },
    redirect() {
      this.$refs.editor.updateContent(this.output);
      this.operation = function (text) {
        return text;
      };
    },
    openParamArea() {
      document.getElementById("param").setAttribute("style", "display:inline;");
      document.getElementById("editor").setAttribute("style", "width:60%;");
    },
    closeParamArea() {
      document.getElementById("param").setAttribute("style", "display:none;");
      document.getElementById("editor").setAttribute("style", "width:100%;");
      this.$refs.paramter.clear();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #121212;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 700px;
}

.woop {
  margin: 0;
  font-family: "Press Start 2P", system-ui;
  color: transparent;
  font-size: 4rem;
  background: linear-gradient(
    220deg,
    var(--color-1) 19%,
    transparent 19%,
    transparent 20%,
    var(--color-2) 20%,
    var(--color-2) 39%,
    transparent 39%,
    transparent 40%,
    var(--color-3) 40%,
    var(--color-3) 59%,
    transparent 59%,
    transparent 60%,
    var(--color-4) 60%,
    var(--color-4) 79%,
    transparent 79%,
    transparent 79%,
    var(--color-5) 80%
  );
  -webkit-background-clip: text;
}

.anticon svg {
  color: white;
  margin-top: 5px;
}

#editorArea {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  height: 250px;
  display: inline-flex;
}

#editor {
  margin-bottom: 30px;
  width: 100%;
  height: 250px;
}

#param {
  margin-bottom: 30px;
  width: 40%;
  margin-right: 2%;
  height: 250px;
  display: none;
}

#output {
  color: #fff;
  width: 100%;
  overflow: auto;
  display: inline-table;
  word-wrap: break-word;
  text-align: left;
  white-space: pre-line;
  padding-bottom: 50px;
}

.about {
  height: 18px;
  width: 18px;
  display: flex;
  vertical-align: 10px;
  border-radius: 9px;
  font-weight: 300;
  flex-direction: row;
  width: 100%;
  justify-content: right;
  align-items: center;
  margin-bottom: 20px;
}

.about > a {
  color: #ffffff;
  margin: 0px 10px;
  font-size: 1.2rem;
}

#copyButton {
  float: right;
  border: 0;
  background: 0;
  margin-top: -30px;
}

body {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
}

:root {
  --color-1: #186cb8;
  --color-2: #2a9a9f;
  --color-3: #f98d00;
  --color-4: #e83611;
  --color-5: #f1b211;
}

* {
  box-sizing: border-box;
}
</style>
