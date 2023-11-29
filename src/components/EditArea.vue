<template>
  <a-textarea
    :rows="4"
    :value="content"
    placeholder="Pick a function and apply to the text here."
    @change="handleChange"
  />
</template>
<script>
export default {
  data() {
    return {
      content: null,
    };
  },
  methods: {
    handleChange(e) {
      this.$emit("transfer", e.target.value);
    },
    updateContent(text) {
      this.content = text;
    },
  },
};
</script>
