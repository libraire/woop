<template>
  <a-textarea
    :rows="4"
    :value="content"
    placeholder="Parameters here"
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
      // if don't update content here, clear content won't happen
      this.content = e.target.value;
    },
    clear() {
      this.content = null;
    },
  },
};
</script>
