<template>
  <button class="button" :class="{ selected: selected }" @click="click">
    <div class="text">{{ type.toUpperCase() }}</div>
  </button>
</template>
<script>
export default {
  props: {
    type: {
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
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  width: 70px;
  height: 50px;
  border: 1px var(--gray5) solid;
  border-radius: 5px;
  color: var(--gray8);
  font-weight: 400;
  font-size: var(--font-size-sm);

  @include hover() {
    background-color: var(--color1);
  }
  &:not(:first-child) {
    margin-left: 10px;
  }
  &.selected {
    background-color: var(--color1);
  }
}

</style>
