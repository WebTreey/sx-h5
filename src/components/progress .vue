<template>
  <div class="sd-progress df">
    <slot name="start"></slot>
    <div class="sd-progress-bg" :style="{height:`${bgHeight}px`}">
      <div class="sd-progress-value" :style="{width:`${value}%`||0,background:bgColor}"></div>
    </div>
    <slot name="end"></slot>
  </div>
</template>
<script>
export default {
  props: ["value", "bgHeight", "bgColor"],
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.sd-progress {
  width: 100%;
  .sd-progress-bg {
    height: 4px;
    background: #f1f1f1;
    flex: 1;
    .sd-progress-value {
      height: 100%;
      background: #007aff;
    }
  }
}
</style>