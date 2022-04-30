<template>
  <li class="list">
    <button class="button" :class="{ selected: selected }" :style="{ padding: padding }" @click="click">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 353.67 424.82" fill="#231815">
        <path
          d="M353.67,116.6c0-.61-.11-1.2-.18-1.8v-10.57c0-3.87-1.54-7.59-4.27-10.32L259.57,4.27c-2.73-2.73-6.45-4.27-10.32-4.27H33.9C15.21,0,0,15.21,0,33.9V390.92c0,18.69,15.21,33.9,33.9,33.9H319.58c18.69,0,33.9-15.21,33.9-33.9V118.39c.07-.6,.18-1.17,.18-1.8Zm-37.64-14.59h-70.04V31.96l70.04,70.04Zm3.55,293.63H33.9c-2.6,0-4.71-2.12-4.71-4.72V33.9c0-2.6,2.12-4.71,4.71-4.71H216.8V116.6c0,8.07,6.53,14.6,14.59,14.6h92.91V390.92c0,2.6-2.12,4.72-4.72,4.72Z"
        />
      </svg>
      <div class="text-outer">
        <p class="text">{{ text }}</p>
        <p v-if="comment" class="comment">{{ comment }}</p>
      </div>
    </button>
  </li>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: undefined,
    },
    comment: {
      type: String,
      required: false,
      default: undefined,
    },
    padding: {
      type: String,
      required: false,
      default: undefined,
    },
    selected: {
      type: Boolean,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    click() {
      this.$emit('click', this.text);
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  border-bottom: 1px var(--gray3) solid;
}

.button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 14px;
  width: 100%;
  height: 100%;

  @include hover() {
    background-color: var(--color1);
  }
  &.selected {
    background-color: var(--color1);
  }
}

.icon {
  min-width: 12px;
  width: 12px;
  fill: var(--gray3);
}

.text-outer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.text {
  margin-left: 8px;
  min-width: 100px;
  width: 100px;
  color: var(--gray8);
  text-align: left;
  font-weight: 400;
}

.comment {
  color: var(--gray8);
  text-align: left;
  font-weight: 400;
}

</style>
