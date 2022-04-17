<template>
  <button class="button" :class="{ on: getSwitchOn }" @click="click"></button>
</template>
<script>
export default {
  props: {
    on: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      insideOn: undefined,
    };
  },
  computed: {
    getSwitchOn() {
      return this.on;
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    click() {
      this.$emit('click', this.on);
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  width: 32px;
  height: 16px;
  border-radius: 50px;
  background-color: var(--gray3);
  transition: background-color .2s;
  &::before {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    border-radius: 20px;
    background-color: var(--white);
    content: '';
    transition: left .2s;
  }
  &.on {
    background-color: var(--color4);
    &::before {
      left: 18px;
    }
  }
}

</style>
