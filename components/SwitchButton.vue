<template>
  <div class="switch" :style="getStyle">
    <p v-if="textPosition === 'left'" class="text left">{{ text }}</p>
    <button class="button" :class="{ on: on }" aria-label="swich" :disabled="disabled" @click="click"></button>
    <p v-if="textPosition === 'right'" class="text right">{{ text }}</p>
  </div>
</template>
<script>
export default {
  props: {
    on: {
      type: Boolean,
      required: false,
      default: true,
    },
    text: {
      type: String,
      required: false,
      default: undefined,
    },
    textPosition: {
      type: String,
      required: false,
      default: undefined,
    },
    top: {
      type: String,
      required: false,
      default: undefined,
    },
    bottom: {
      type: String,
      required: false,
      default: undefined,
    },
    left: {
      type: String,
      required: false,
      default: undefined,
    },
    right: {
      type: String,
      required: false,
      default: undefined,
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
      if (this.top || this.bottom || this.left || this.right) {
        return {
          position: 'absolute',
          top: this.top ? this.top : '',
          bottom: this.bottom ? this.bottom : '',
          left: this.left ? this.left : '',
          right: this.right ? this.right : '',
        };
      } else {
        return {};
      }
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
.switch {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.text {
  color: var(--gray8);
  font-weight: 400;
  font-size: var(--font-size-xs);
  &.left {
    margin-right: 10px;
  }
  &.right {
    margin-left: 10px;
  }
}

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
