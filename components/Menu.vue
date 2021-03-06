<template>
  <div v-if="getDisplay" class="menu-wrapper">
    <div class="mask" @click="clickMask"></div>
    <div class="menu">
      <div class="tab">
        <div class="tab-buttons">
          <button class="tab-button" :class="{ selected: selectedTab === 'format' }" @click="clickTab('format')">
            フォーマット
          </button>
          <button class="tab-button" :class="{ selected: selectedTab === 'resize' }" @click="clickTab('resize')">
            リサイズ
          </button>
        </div>
      </div>
      <div v-if="selectedTab === 'format'" class="content format">
        <ul class="lists main">
          <List text="オリジナル" padding="14px" :selected="getSelectedFormat('オリジナル')" @click="clickFormat" />
          <List text="JPEG" padding="14px" :selected="getSelectedFormat('JPEG')" @click="clickFormat" />
          <List text="PNG" padding="14px" :selected="getSelectedFormat('PNG')" @click="clickFormat" />
          <List text="GIF" padding="14px" :selected="getSelectedFormat('GIF')" @click="clickFormat" />
          <List text="WebP" padding="14px" :selected="getSelectedFormat('WebP')" @click="clickFormat" />
          <List text="AVIF" padding="14px" :selected="getSelectedFormat('AVIF')" @click="clickFormat" />
        </ul>
        <ul v-if="selectedFormat() === 'original'" class="lists sub">
          <List
            text="オリジナル"
            comment=""
            padding="22px"
            :selected="getSelectedFormatLevel('オリジナル')"
            @click="clickLevel"
          />
          <List
            v-if="getOptimizationMode"
            text="最適化"
            comment="ファイルサイズの削減が期待できます。"
            padding="22px"
            :selected="getSelectedFormatLevel('最適化')"
            @click="clickLevel"
          />
        </ul>
        <ul v-else class="lists sub">
          <List
            v-if="getLosslessMode"
            text="ロスレス"
            comment="オリジナルのデータを損なうことなく変換できます。"
            padding="22px"
            :selected="getSelectedFormatLevel('ロスレス')"
            @click="clickLevel"
          />
          <List
            v-if="getSelectedMode"
            text="高品質"
            comment="高画質、ファイルサイズ：大"
            padding="22px"
            :selected="getSelectedFormatLevel('高品質')"
            @click="clickLevel"
          />
          <List
            text="標準品質"
            comment="デフォルト"
            padding="22px"
            :selected="getSelectedFormatLevel('標準品質')"
            @click="clickLevel"
          />
          <List
            v-if="getSelectedMode"
            text="低品質"
            comment="低画質、ファイルサイズ：小"
            padding="22px"
            :selected="getSelectedFormatLevel('低品質')"
            @click="clickLevel"
          />
        </ul>
      </div>
      <div v-else class="content resize">
        <div class="image-area">
          <div class="image-outer" :style="getImageOuterStyle">
            <img class="image" :style="getImageStyle" :src="image" alt="" />
            <div class="mark" :style="getMarkStyle"></div>
          </div>
        </div>
        <div class="setting-area">
          <div class="setting-content">
            <div class="size">
              <div class="input-outer">
                <label class="title" for="width">幅</label>
                <input id="width" v-model="pendingWidth" class="input" type="number" @change="changeSize('width')" />
              </div>
              <span class="multiplication">×</span>
              <div class="input-outer">
                <label class="title" for="height">高さ</label>
                <input id="height" v-model="pendingHeight" class="input" type="number" @change="changeSize('height')" />
              </div>
            </div>
            <p v-if="isDegitOver" class="attention">9999以下で入力してください。</p>
            <SwitchButton :on="isAutoAspectRatio" text="アスペクト比を維持" text-position="left" @click="clickSwitch" />
          </div>
          <div class="setting-content">
            <p class="title">フィット</p>
            <div class="buttons">
              <FitButton type="cover" :selected="data.fit === 'cover'" @click="clickFit('cover')" />
              <FitButton type="contain" :selected="data.fit === 'contain'" @click="clickFit('contain')" />
              <FitButton type="fill" :selected="data.fit === 'fill'" @click="clickFit('fill')" />
            </div>
          </div>
          <div class="setting-content">
            <p class="title">位置</p>
            <div class="buttons">
              <PositionButton type="top" :selected="data.position === 'top'" @click="clickPosition('top')" />
              <PositionButton type="bottom" :selected="data.position === 'bottom'" @click="clickPosition('bottom')" />
              <PositionButton type="right" :selected="data.position === 'right'" @click="clickPosition('right')" />
              <PositionButton type="left" :selected="data.position === 'left'" @click="clickPosition('left')" />
            </div>
          </div>
          <div class="setting-content color">
            <label class="title" for="color" disabled>背景色</label>
            <input id="color" v-model="data.background" class="input" type="color" />
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="clear-button">
          <Button text="初期値に戻す" font-size="small" width="120px" height="23px" type="gray" @click="clearSetting" />
        </div>
        <div class="button-outer">
          <Button
            text="キャンセル"
            width="120px"
            height="32px"
            type="white"
            :style="{ marginRight: '14px' }"
            @click="cancel"
          />
          <Button text="保存" width="120px" height="32px" type="purple" :disabled="getDisabled" @click="decision" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    uniqueIndex: {
      type: Number,
      required: false,
      default: undefined,
    },
    uniqueIndex2: {
      type: Number,
      required: false,
      default: undefined,
    },
    selectedIndex: {
      type: Number,
      required: false,
      default: undefined,
    },
    selectedIndex2: {
      type: Number,
      required: false,
      default: undefined,
    },
    open: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    format: {
      type: String,
      required: false,
      default: undefined,
    },
    formatLevel: {
      type: String,
      required: false,
      default: undefined,
    },
    originalWidth: {
      type: Number,
      required: false,
      default: undefined,
    },
    originalHeight: {
      type: Number,
      required: false,
      default: undefined,
    },
    width: {
      type: Number,
      required: false,
      default: undefined,
    },
    height: {
      type: Number,
      required: false,
      default: undefined,
    },
    fit: {
      type: String,
      required: false,
      default: undefined,
    },
    position: {
      type: String,
      required: false,
      default: undefined,
    },
    background: {
      type: String,
      required: false,
      default: undefined,
    },
    image: {
      type: String,
      required: false,
      default: undefined,
    },
    originalFormat: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      isInitialized: false,
      isAutoAspectRatio: true,
      isDegitOver: false,
      selectedTab: 'format',
      pendingWidth: 0,
      pendingHeight: 0,
      IMAGE_SIZE: 350,
      data: {
        format: '',
        formatLevel: '',
        width: undefined,
        height: undefined,
        fit: 'cover',
        position: 'center',
        background: '#000000',
      },
    };
  },
  computed: {
    getDisplay() {
      return this.open && this.uniqueIndex === this.selectedIndex && this.uniqueIndex2 === this.selectedIndex2;
    },
    getDisabled() {
      return !(
        this.isInitialized === true &&
        (this.data.format !== this.format ||
          this.data.formatLevel !== this.formatLevel ||
          this.data.width !== this.width ||
          this.data.height !== this.height ||
          this.data.fit !== this.fit ||
          this.data.position !== this.position ||
          this.data.background !== this.background)
      );
    },
    getSelectedFormat() {
      return function (key) {
        const state = this.selectedFormat();

        if (key === 'オリジナル') return state === '' || state === 'original';
        else if (key === 'JPEG') return state === 'jpeg';
        else if (key === 'PNG') return state === 'png';
        else if (key === 'WebP') return state === 'webp';
        else if (key === 'GIF') return state === 'gif';
        else if (key === 'AVIF') return state === 'avif';
      };
    },
    getSelectedFormatLevel() {
      return function (key) {
        const state = this.selectedFormatLevel();

        if (key === 'ロスレス') return state === '' || state === 'lossless';
        else if (key === '高品質') return state === 'high';
        else if (key === '標準品質') return state === 'middle';
        else if (key === '低品質') return state === 'low';
        else if (key === 'オリジナル') return state === 'none';
        else if (key === '最適化') return state === 'optimization';
      };
    },
    getOptimizationMode() {
      return this.$OPTIMIZATION.includes(this.originalFormat);
    },
    getLosslessMode() {
      return this.$LOSSLESS.includes(this.selectedFormat());
    },
    getSelectedMode() {
      return !(this.selectedFormat() === 'png' || this.selectedFormat() === 'gif');
    },
    getImageOuterStyle() {
      const originalWidth = this.originalWidth;
      const originalHeight = this.originalHeight;
      let width;
      let height;
      if (originalWidth > originalHeight) {
        width = originalWidth * (this.IMAGE_SIZE / originalWidth);
        height = originalHeight * (this.IMAGE_SIZE / originalWidth);
      } else {
        width = originalWidth * (this.IMAGE_SIZE / originalHeight);
        height = originalHeight * (this.IMAGE_SIZE / originalHeight);
      }
      return {
        width: `${width}px`,
        height: `${height}px`,
      };
    },
    getImageStyle() {
      if (this.data.fit === 'cover') {
        let width;
        let height;
        const originalWidth = this.originalWidth;
        const originalHeight = this.originalHeight;
        if (originalWidth > originalHeight) {
          width = originalWidth * (this.IMAGE_SIZE / originalWidth);
          height = originalHeight * (this.IMAGE_SIZE / originalWidth);
        } else {
          width = originalWidth * (this.IMAGE_SIZE / originalHeight);
          height = originalHeight * (this.IMAGE_SIZE / originalHeight);
        }

        return {
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: '100%',
          maxHeight: '100%',
        };
      } else {
        let baseWidth;
        let baseHeight;
        const originalWidth = this.originalWidth;
        const originalHeight = this.originalHeight;
        const settingWidth = this.data.width;
        const settingHeight = this.data.height;

        if (originalWidth > originalHeight) {
          baseWidth = this.IMAGE_SIZE;
          baseHeight = this.IMAGE_SIZE * (originalHeight / originalWidth);
        } else {
          baseWidth = this.IMAGE_SIZE * (originalWidth / originalHeight);
          baseHeight = this.IMAGE_SIZE;
        }
        if (originalWidth * settingHeight === originalHeight * settingWidth) {
          return {
            width: `100%`,
            height: `100%`,
            objectFit: this.data.fit,
            objectPosition: this.data.position,
            backgroundColor: this.data.background,
          };
        } else if (originalWidth * settingHeight > originalHeight * settingWidth) {
          const width = baseWidth * (settingWidth / originalWidth / (settingHeight / originalHeight));

          return {
            width: `${width}px`,
            height: `100%`,
            objectFit: this.data.fit,
            objectPosition: this.data.position,
            backgroundColor: this.data.background,
          };
        } else {
          const height = baseHeight * (settingHeight / originalHeight / (settingWidth / originalWidth));

          return {
            width: `100%`,
            height: `${height}px`,
            objectFit: this.data.fit,
            objectPosition: this.data.position,
            backgroundColor: this.data.background,
          };
        }
      }
    },
    getMarkStyle() {
      let baseWidth;
      let baseHeight;
      const originalWidth = this.originalWidth;
      const originalHeight = this.originalHeight;
      const settingWidth = this.data.width;
      const settingHeight = this.data.height;
      if (originalWidth > originalHeight) {
        baseWidth = this.IMAGE_SIZE;
        baseHeight = this.IMAGE_SIZE * (originalHeight / originalWidth);
      } else {
        baseWidth = this.IMAGE_SIZE * (originalWidth / originalHeight);
        baseHeight = this.IMAGE_SIZE;
      }
      if (originalWidth * settingHeight === originalHeight * settingWidth) {
        return {
          width: `100%`,
          height: `100%`,
          border: '1px red solid',
        };
      } else if (originalWidth * settingHeight > originalHeight * settingWidth) {
        const width = baseWidth * (settingWidth / originalWidth / (settingHeight / originalHeight));
        const margin = baseWidth - width;

        if (this.data.position === 'left' || this.data.fit === 'contain' || this.data.fit === 'fill') {
          return {
            width: `${width}px`,
            height: `100%`,
            border: '1px red solid',
          };
        } else if (this.data.position === 'right') {
          return {
            width: `${width}px`,
            height: `100%`,
            border: '1px red solid',
            marginLeft: `${margin}px`,
          };
        } else {
          return {
            width: `${width}px`,
            height: `100%`,
            border: '1px red solid',
            marginLeft: `${margin / 2}px`,
          };
        }
      } else {
        const height = baseHeight * (settingHeight / originalHeight / (settingWidth / originalWidth));
        const margin = baseHeight - height;

        if (this.data.position === 'top' || this.data.fit === 'contain' || this.data.fit === 'fill') {
          return {
            width: `100%`,
            height: `${height}px`,
            border: '1px red solid',
          };
        } else if (this.data.position === 'bottom') {
          return {
            width: `100%`,
            height: `${height}px`,
            border: '1px red solid',
            marginTop: `${margin}px`,
          };
        } else {
          return {
            width: `100%`,
            height: `${height}px`,
            border: '1px red solid',
            marginTop: `${margin / 2}px`,
          };
        }
      }
    },
  },
  watch: {
    open(value) {
      if (value) {
        this.initialSet();
      } else {
        this.close();
      }
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    selectedFormat() {
      let state;
      if (this.data.format === '') {
        state = this.format;
      } else {
        state = this.data.format;
      }
      return state;
    },
    selectedFormatLevel() {
      let state;
      if (this.data.formatLevel === '') {
        state = this.formatLevel;
      } else {
        state = this.data.formatLevel;
      }
      return state;
    },
    clickFormat(key) {
      // 書式を統一する
      const format = key === 'オリジナル' ? 'original' : key.toLowerCase();

      // 選択中のボタンを押したらスルー
      if (this.selectedFormat() === format) return;

      // 選択したフォーマットをセット
      this.data.format = format;

      // フォーマットレベルを初期値を設定
      this.data.formatLevel = this.initialFormatLevel();
    },
    clickLevel(key) {
      // 書式を統一する
      const formatLevel =
        key === 'ロスレス'
          ? 'lossless'
          : key === '高品質'
          ? 'high'
          : key === '標準品質'
          ? 'middle'
          : key === '低品質'
          ? 'low'
          : key === 'オリジナル'
          ? 'none'
          : key === '最適化'
          ? 'optimization'
          : '';

      // 選択中のボタンを押したらスルー
      if (this.selectedFormatLevel() === formatLevel) return;

      // 選択した値をセット
      this.data.formatLevel = formatLevel;
    },
    initialFormatLevel() {
      const format = this.selectedFormat();
      if (format === 'original') return 'none';
      if (format === 'png' || format === 'gif') return 'middle';
      else if (this.$LOSSLESS.includes(format)) return 'middle';
      else return 'middle';
    },
    initialSet() {
      // 現在の設定を初期値に設定
      this.data.format = this.format;
      this.data.formatLevel = this.formatLevel;
      this.data.width = this.width;
      this.data.height = this.height;
      this.data.fit = this.fit;
      this.data.position = this.position;
      this.data.background = this.background;
      this.pendingWidth = this.width;
      this.pendingHeight = this.height;
      this.isInitialized = true;
    },
    clickMask() {
      this.$emit('click-mask');
    },
    clickTab(key) {
      this.selectedTab = key;
    },
    cancel() {
      this.$emit('cancel');
    },
    decision() {
      const res = {
        index: this.uniqueIndex,
        index2: this.uniqueIndex2,
        ...this.data,
      };
      this.$emit('disision', res);
    },
    close() {
      this.selectedTab = 'format';
    },
    changeSize(key) {
      // 入力値を文字型から数字型に変換
      this.pendingWidth = Number(this.pendingWidth);
      this.pendingHeight = Number(this.pendingHeight);

      // アスペクト比の調整
      this.adjustAspectRatio(key);

      // 桁数チェック
      this.checkDigit();

      // ローカルデータに設定
      this.data.width = this.pendingWidth;
      this.data.height = this.pendingHeight;
    },
    clickFit(key) {
      this.data.fit = key;
    },
    clickPosition(key) {
      if (this.data.position === key) {
        this.data.position = 'center';
      } else {
        this.data.position = key;
      }
    },
    clickSwitch(data) {
      this.isAutoAspectRatio = !data;

      // ONになった時はアスペクト比の調整を行う
      if (this.isAutoAspectRatio) this.changeSize('width');
    },
    adjustAspectRatio(base) {
      // アスペクト比を維持フラグがオフの場合は実行しない
      if (!this.isAutoAspectRatio) return;

      // アスペクト比を調整する
      if (base === 'width') {
        this.pendingHeight = Math.round(this.pendingWidth * (this.originalHeight / this.originalWidth));
      } else {
        this.pendingWidth = Math.round(this.pendingHeight * (this.originalWidth / this.originalHeight));
      }
    },
    checkDigit() {
      let count = 0;
      if (this.pendingWidth >= '10000') {
        this.pendingWidth = '9999';
        this.adjustAspectRatio('width');
        count++;
      }
      if (this.pendingHeight >= '10000') {
        this.pendingHeight = '9999';
        this.adjustAspectRatio('height');
        count++;
      }
      if (count > 0) {
        this.isDegitOver = true;
      } else {
        this.isDegitOver = false;
      }
    },
    clearSetting() {
      this.isAutoAspectRatio = true;
      this.data.format = 'original';
      this.data.formatLevel = 'none';
      this.data.width = this.originalWidth;
      this.data.height = this.originalHeight;
      this.data.fit = 'cover';
      this.data.position = 'center';
      this.data.background = '#000000';
      this.pendingWidth = this.originalWidth;
      this.pendingHeight = this.originalHeight;
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
  top: 50px;
  right: 0;
  width: 700px;
  height: 600px;
  border: 1px var(--gray2) solid;
  border-radius: 10px;
  background-color: var(--white);
}

.tab {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 24px;
  width: 100%;
  height: 50px;
  border-bottom: 1px var(--gray3) solid;
}

.tab-buttons {
  display: flex;
}

.tab-button {
  position: relative;
  color: var(--gray8);
  font-weight: 400;
  &:not(:first-of-type) {
    margin-left: 20px;
  }
  &.selected {
    &::after {
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--color4);
      content: '';
    }
  }
}

.content {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: calc(100% - 110px);
}

.lists {
  height: 100%;
  list-style: none;
  &.main {
    width: 20%;
    border-right: 1px var(--gray3) solid;
  }
  &.sub {
    width: 80%;
  }
}

.image-area {
  position: relative;
  padding: 30px 20px;
  width: 57%;
  height: 100%;
}

.image-outer {
  position: relative;
}

.mark {
  position: absolute;
  top: 0;
  left: 0;
}

.setting-area {
  padding: 30px 20px;
  width: 43%;
  height: 100%;
}

.setting-content {
  &:not(:first-child) {
    margin-top: 24px;
  }
}

.size {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.title {
  display: block;
  margin-bottom: 4px;
  color: var(--gray8);
  font-weight: 400;
  pointer-events: none;
}

.input {
  padding: 3px 6px;
  width: 100px;
  border: 1px var(--gray5) solid;
  border-radius: 6px;
  color: var(--gray8);
  font-weight: 400;
}

.multiplication {
  margin: 20px 8px 0;
  color: var(--gray8);
  font-weight: 400;
}

.attention {
  margin-bottom: 4px;
  color: var(--red);
  font-size: var(--font-size-xs);
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.clear-button {
  position: absolute;
  bottom: 17px;
  left: 18px;
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
