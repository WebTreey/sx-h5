<template>
  <div class="m-com-input">
    <div :class="['m-input-group',{ts:block}]">
      <label class="fs input-text" v-if="title">{{title}}</label>
      <input
        type="text"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :value="text"
        @input="parChange"
      />
    </div>
  </div>
</template>
<script>
import commular from "@/utils";
export default {
  props: ["title", "placeholder", "block", "maxlength", "value", "type"],
  data() {
    return {
      text: ""
    };
  },
  created() {
    this.text = this.value || "";
  },
  methods: {
    parChange($event) {
      if (this.type == "mobile") {
        this.text = $event.target.value;
        this.text = commular.verifyUtils.pureInt($event.target.value);
      } else {
        this.text = $event.target.value;
      }
      this.$emit("input", this.text);
    }
  },
  watch: {
    value(newValue) {
      this.text = newValue
    }
  }
};
</script>
<style lang="scss" scoped>
.m-com-input {
  font-size: inherit;

  .m-input-group {
    margin-bottom: 20px;
    label {
      min-width: 200px;
      padding-bottom: 10px;
      display: inline-block;
      color: #333;
    }
    input {
      width: 100%;
      height: 60px;
      line-height: 60px;
    }
  }
}
</style>