<template>
  <a-select
    mode="multiple"
    placeholder="Functions"
    :value="selectedItems"
    style="width: 100%; margin-top: 30px; max-width: 800px"
    @change="handleChange"
  >
    <a-select-option v-for="item in filteredOptions" :key="item" :value="item">
      {{ item }}
    </a-select-option>
  </a-select>
</template>

<script>
import * as hub from ".././hub.js";

function genSVG(index) {
  const rainBow = ["EE6352", "F79D84", "FAC05E", "59CD90", "3FA7D6", "454372"];
  const color = rainBow[index % 6];
  const svg =
    '<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path style="fill: #' +
    color +
    ';stroke: rgba(0, 0, 0, 0); stroke-opacity: 0;" d="M 0 0 L 470 0 L 500 250 L 470 500 L 0 500 L 25 250 L 0 0 Z"/></svg>';
  const start =
    '<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path style="fill: #' +
    color +
    '; stroke: rgba(0, 0, 0, 0); stroke-opacity: 0;" d="M 0 0 L 470 0 L 500 250 L 470 500 L 0 500 L 0 250 L 0 0 Z"/></svg>';
  return index === 0 ? start : svg;
}

function updateColor(items) {
  for (let i = 0; i < items.length; i++) {
    let title = '[title="' + items[i] + '"]';
    document.querySelectorAll(title).forEach((el) => {
      let svg = genSVG(i);
      let encoded = window.btoa(svg);
      el.style.backgroundImage =
        "url(data:image/svg+xml;base64," + encoded + ")";
      el.style["background-size"] = "cover";
      el.style["margin-right"] = 0;
      el.style["border"] = "0px solid #fff";
      el.style["color"] = "#fff";
    });
  }
}

export default {
  created() {
    this.options = hub.loadFunctions();
  },
  data() {
    return {
      selectedItems: [],
      options: [],
      argument: "",
    };
  },
  computed: {
    filteredOptions() {
      return this.options.filter((o) => !this.selectedItems.includes(o));
    },
  },
  methods: {
    handleChange(selectedItems) {
      this.selectedItems = selectedItems;
      let handler;
      let isUsage =
        this.selectedItems.length > 0 && this.selectedItems[0] === "Usage";

      let close = true;
      for (let i = selectedItems.length - 1; i >= 0; i--) {
        if (hub.needArgument(selectedItems[i])) {
          this.$emit("open", function () {});
          close = false;
          break;
        }
      }

      if (close) {
        this.$emit("close", function () {});
      }

      if (isUsage) {
        let lastText = selectedItems[selectedItems.length - 1];
        handler = function () {
          return hub.mapUsage(lastText);
        };
      } else {
        const argument = this.argument;
        handler =
          this.selectedItems.length === 0
            ? function () {
                return "";
              }
            : this.selectedItems
                .map((key) => {
                  if (hub.needArgument(key)) {
                    return function (text) {
                      return hub.mapFunc(key)(text, argument);
                    };
                  } else {
                    return hub.mapFunc(key);
                  }
                })
                .reduce(
                  (acc, cur) =>
                    function (text) {
                      return cur(acc(text));
                    },
                );
      }


      this.$emit("repeat", false);
      for(var index in this.selectedItems) {
        console.log(this.selectedItems[index])
        if(this.selectedItems[index] == "Copy") {
          this.$emit("copy");
        }

        if(index == this.selectedItems.length -1) {
          this.$emit("repeat", this.selectedItems[index] == "Repeat");          
        }

      }

      this.$emit("handle", handler);
      setTimeout(function () {
        updateColor(selectedItems);
      }, 50);

      let isRedirect =
        this.selectedItems.length > 0 &&
        this.selectedItems[this.selectedItems.length - 1] === "Redirect";
      if (isRedirect) {
        this.selectedItems = [];
        this.$emit("redirect", function () {});
      }
    },
    updateArgument(text) {
      this.argument = text;
      this.handleChange(this.selectedItems);
    },
  },
};
</script>
