<template>
  <button class="button" :class="getClass" :style="getStyle" :disabled="getDisabled" @click="click">
    {{ cancel ? 'キャンセル' : text }}
  </button>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: undefined,
    },
    fontSize: {
      type: String,
      required: false,
      default: 'middle',
    },
    width: {
      type: String,
      required: false,
      default: '120px',
    },
    height: {
      type: String,
      required: false,
      default: '32px',
    },
    type: {
      type: String,
      required: false,
      default: 'white',
    },
    cancel: {
      type: Boolean,
      required: false,
      default: false,
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
    getClass() {
      return {
        white: this.type === 'white',
        purple: this.type === 'purple',
        gray: this.type === 'gray',
        disabled: this.disabled && !this.cancel,
        small: this.fontSize === 'small',
      };
    },
    getStyle() {
      return {
        width: this.width,
        height: this.height,
      };
    },
    getDisabled() {
      return this.disabled && !this.cancel;
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    click() {
      if (this.cancel) {
        this.$emit('cancel');
      } else {
        this.$emit('click');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  font-weight: 400;
  font-size: var(--font-size-md);

  &.white {
    border: 1px var(--color3) solid;
    background-color: var(--white);
    color: var(--gray8);
    transition: border .2s, color .2s;

    @include hover() {
      border: 1px var(--color4) solid;
      color: var(--color4);
    }
    &.disabled {
      border: 1px var(--gray3) solid;
      color: var(--gray5);
    }
  }
  &.purple {
    background-color: var(--color4);
    color: var(--white);
    transition: background-color .15s;

    @include hover() {
      background-color: var(--color8);
    }
    &.disabled {
      background-color: var(--gray4);
    }
  }
  &.gray {
    border: 1px var(--gray4) solid;
    background-color: var(--white);
    color: var(--gray4);

    @include hover() {
      border: 1px var(--gray6) solid;
      color: var(--gray6);
    }
  }
  &.small {
    font-size: var(--font-size-xs);
  }
}

</style>
