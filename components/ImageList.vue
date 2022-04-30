<template>
  <div v-if="getDisplay" class="menu-wrapper">
    <div class="mask" @click="clickMask"></div>
    <div class="menu">
      <div class="header">
        <p class="header-text">すべての画像</p>
      </div>
      <div class="content">
        <div v-for="(image, index) in images" :key="index" class="image-outer">
          <img class="image" :src="image[0].originalInfo + image[0].originalImage" alt="" />
          <DeleteButton
            top="-5px"
            right="-5px"
            width="18px"
            icon-width="8px"
            :disabled="disabled"
            @click="deleteImage(index)"
          />
        </div>
      </div>
      <div class="footer">
        <div class="button-outer">
          <Button text="閉じる" width="120px" height="32px" type="white" @click="close" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    images: {
      type: Array,
      required: false,
      default: undefined,
    },
    open: {
      type: Boolean,
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
    getDisplay() {
      return this.open;
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    clickMask() {
      this.$emit('close');
    },
    close() {
      this.$emit('close');
    },
    deleteImage(index) {
      this.$emit('delete', index);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  z-index: 100;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.menu {
  position: absolute;
  top: 230px;
  left: calc((1200px - 900px) / 2);
  width: 900px;
  height: 600px;
  border: 1px var(--gray2) solid;
  border-radius: 10px;
  background-color: var(--white);
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  width: 100%;
  height: 50px;
  border-bottom: 1px var(--gray3) solid;
}

.header-text {
  color: var(--gray7);
  font-weight: 400;
  font-size: var(--font-size-md);
}

.content {
  display: flex;
  overflow-y: auto;
  align-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 20px;
  height: calc(100% - 110px);
}

.image-outer {
  position: relative;
  margin: 10px;
}

.image {
  height: 100px;
}

.footer {
  padding: 0 24px;
  width: 100%;
  height: 60px;
  border-top: 1px var(--gray3) solid;
}

.button-outer {
  position: absolute;
  right: 18px;
  bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
