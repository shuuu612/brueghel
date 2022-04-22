<template>
  <button class="delete-button" :style="getStyle" :disabled="disabled" @click="click">
    <svg class="delete-icon" :style="getStyleIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156 153.78" fill="#231815">
      <path d="M151.77,129.15l-53.36-53.36,51.16-51.16c5.64-5.64,5.64-14.77,0-20.4s-14.77-5.64-20.4,0l-51.16,51.16L26.84,4.23C21.21-1.41,12.08-1.41,6.44,4.23,.8,9.86,.8,19,6.44,24.63l51.16,51.16L4.23,129.15c-5.64,5.64-5.64,14.77,0,20.41,2.82,2.82,6.51,4.23,10.2,4.23s7.38-1.41,10.2-4.23l53.37-53.36,53.36,53.36c2.82,2.82,6.51,4.23,10.2,4.23s7.38-1.41,10.2-4.23c5.64-5.64,5.64-14.77,0-20.41Z"/>
    </svg>
  </button>
</template>
<script>
export default {
  props: {
    top: {
      type: String,
      required: false,
      default: '-5px',
    },
    right: {
      type: String,
      required: false,
      default: '-5px',
    },
    width: {
      type: String,
      required: false,
      default: '18px',
    },
    iconWidth: {
      type: String,
      required: false,
      default: '8px',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    getStyle() {
      return {
        top: this.top,
        right: this.right,
        width: this.width,
        height: this.width,
      };
    },
    getStyleIcon() {
      return {
        width: this.iconWidth,
        height: this.iconWidth,
      };
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    click() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.delete-button {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px var(--color3) solid;
  border-radius: 20px;
  background-color: var(--white);
}

.delete-icon {
  fill: var(--color3);
}

</style>
