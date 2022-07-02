<template>
  <div class="wrapper">
    <main class="main">
      <Logo />
      <SwitchButton
        :on="isBatchSetting"
        text="すべての画像に同じ設定を適応"
        text-position="left"
        top="12px"
        right="16px"
        :disabled="getConverting"
        @click="clickSwitch"
      />
      <div class="contents">
        <div v-for="(files, index) in getInputFiles" :key="index" class="content">
          <div class="image-area" :class="getAddImageAnimationClass">
            <div class="image-outer" :style="getImageStyle(index)">
              <button :disabled="!getMultiImage" class="image-button" @click="openImageList">
                <img class="image" :src="files[0].originalInfo + files[0].originalImage" alt="" />
              </button>
              <svg
                v-if="getMultiImage"
                class="multi-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 350.03 294.47"
                fill="#231815"
              >
                <path
                  d="M331.53,67.78h-35.1v20h33.61v186.69H87.78v-33.61h-20v35.1c0,10.2,8.3,18.51,18.51,18.51h245.24c10.2,0,18.51-8.3,18.51-18.51V86.29c0-10.21-8.3-18.51-18.51-18.51Z"
                />
                <rect width="282.25" height="226.69" rx="18.51" ry="18.51" />
              </svg>
            </div>
          </div>
          <div class="boby-outer">
            <p class="name">{{ files[0].originalName }}</p>
            <div v-for="(file, index2) in files" :key="index2 + 1000" class="setting-outer">
              <div class="setting-contents before">
                <div class="setting-content format">
                  <svg
                    class="format-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 353.67 424.82"
                    fill="#231815"
                  >
                    <path
                      d="M353.67,116.6c0-.61-.11-1.2-.18-1.8v-10.57c0-3.87-1.54-7.59-4.27-10.32L259.57,4.27c-2.73-2.73-6.45-4.27-10.32-4.27H33.9C15.21,0,0,15.21,0,33.9V390.92c0,18.69,15.21,33.9,33.9,33.9H319.58c18.69,0,33.9-15.21,33.9-33.9V118.39c.07-.6,.18-1.17,.18-1.8Zm-37.64-14.59h-70.04V31.96l70.04,70.04Zm3.55,293.63H33.9c-2.6,0-4.71-2.12-4.71-4.72V33.9c0-2.6,2.12-4.71,4.71-4.71H216.8V116.6c0,8.07,6.53,14.6,14.59,14.6h92.91V390.92c0,2.6-2.12,4.72-4.72,4.72Z"
                    />
                  </svg>
                  <p class="text">{{ getFormatName(file.originalFormat) }}</p>
                </div>
                <div class="setting-content size">
                  <svg class="size-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504.78 367.79" fill="#231815">
                    <path
                      d="M479.17,367.79H25.61c-14.12,0-25.61-11.49-25.61-25.61V25.61C0,11.49,11.49,0,25.61,0H479.17c14.12,0,25.61,11.49,25.61,25.61V342.19c0,14.12-11.49,25.61-25.61,25.61ZM26,341.79H478.78V26H26V341.79Z"
                    />
                    <path
                      d="M436.48,54.19c-.71-.12-1.44-.2-2.18-.2h-90.71c-7.18,0-13,5.82-13,13s5.82,13,13,13h79.58v77.89c0,7.18,5.82,13,13,13s13-5.82,13-13V67.17c0-7.08-5.66-12.82-12.69-12.98Z"
                    />
                    <path
                      d="M160.08,289.52H80.49v-77.89c0-7.18-5.82-13-13-13s-13,5.82-13,13v90.71c0,7.08,5.66,12.82,12.69,12.98,.71,.12,1.44,.2,2.18,.2h90.71c7.18,0,13-5.82,13-13s-5.82-13-13-13Z"
                    />
                  </svg>
                  <p class="text">{{ `${file.originalWidth}×${file.originalHeight}` }}</p>
                </div>
                <div class="setting-content capacity">
                  <svg
                    class="capacity-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 451.25 346.08"
                    fill="#231815"
                  >
                    <path
                      d="M451.25,138.19c0-6.78-2.02-13.53-5.96-19.29h0c-6.37-9.36-16.99-14.96-28.31-14.96h-20.56v-27.46c-.03-9.12-3.61-17.77-10.04-24.23-6.47-6.43-15.11-10.01-24.23-10.04H175.17l-10.47-22.44h0C159.07,7.71,146.95,0,133.65,0H34.27C25.15,.03,16.5,3.61,10.04,10.04,3.61,16.5,.03,25.14,0,34.27V312.96c0,1.14,.39,2.16,.66,3.23,.67,5.27,2.22,10.43,5.3,14.94h0c6.37,9.36,16.98,14.96,28.31,14.96H362.16c14.1,0,26.73-8.62,31.88-21.74l.31-.87,54.83-173.61h-.05c1.38-3.79,2.13-7.74,2.13-11.67ZM27.41,34.27c-.03-1.71,.78-3.65,2.01-4.85,1.19-1.23,3.15-2.03,4.85-2.01h99.38c2.68,0,5.07,1.53,6.21,3.96h0l14.16,30.34c2.25,4.83,7.09,7.91,12.42,7.91h195.72c1.7-.03,3.65,.78,4.85,2.01,1.23,1.2,2.03,3.14,2.01,4.85v27.46H89.09c-14.09,0-26.73,8.62-31.88,21.74l-.31,.87-29.49,93.37V34.27Zm395.94,106.45l-.32,.88-54.59,172.83c-1.04,2.52-3.53,4.24-6.29,4.24H34.27c-2.28,0-4.38-1.12-5.66-2.99h0c-.8-1.18-1.19-2.5-1.19-3.86l.47-2.49,.32-.91,54.57-172.81c1.03-2.54,3.55-4.27,6.32-4.26H416.98c2.28,0,4.38,1.12,5.66,2.99h0c.79,1.16,1.19,2.5,1.19,3.85l-.48,2.52Z"
                    />
                  </svg>
                  <p class="text">{{ getBeforeFileSize(file.originalFileSize) }}</p>
                </div>
              </div>
              <svg class="setting-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.47 324.84">
                <defs>
                  <linearGradient
                    id="arrow"
                    x1="0"
                    y1="162.42"
                    x2="451.47"
                    y2="162.42"
                    gradientTransform="matrix(1, 0, 0, 1, 0, 0)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#f3f3fa" />
                    <stop offset=".33" stop-color="#ddd8eb" />
                    <stop offset="1" stop-color="#b5a8d1" />
                  </linearGradient>
                </defs>
                <path
                  d="M451.47,162.42l-207.46,162.42V0l207.46,162.42ZM162.68,234.11h60.23V90.72h-60.23V234.11Zm-81.34,0h60.23V90.72h-60.23V234.11Zm-81.34,0H60.23V90.72H0V234.11Z"
                  style="fill: url(#arrow)"
                />
              </svg>
              <div class="setting-contents after">
                <div class="setting-content format">
                  <svg
                    class="format-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 353.67 424.82"
                    fill="#231815"
                  >
                    <path
                      d="M353.67,116.6c0-.61-.11-1.2-.18-1.8v-10.57c0-3.87-1.54-7.59-4.27-10.32L259.57,4.27c-2.73-2.73-6.45-4.27-10.32-4.27H33.9C15.21,0,0,15.21,0,33.9V390.92c0,18.69,15.21,33.9,33.9,33.9H319.58c18.69,0,33.9-15.21,33.9-33.9V118.39c.07-.6,.18-1.17,.18-1.8Zm-37.64-14.59h-70.04V31.96l70.04,70.04Zm3.55,293.63H33.9c-2.6,0-4.71-2.12-4.71-4.72V33.9c0-2.6,2.12-4.71,4.71-4.71H216.8V116.6c0,8.07,6.53,14.6,14.59,14.6h92.91V390.92c0,2.6-2.12,4.72-4.72,4.72Z"
                    />
                  </svg>
                  <p
                    class="text"
                    :class="
                      getChangeClass(
                        getFormatName(file.originalFormat),
                        getFormatName(file.settingFormat, index, index2)
                      )
                    "
                  >
                    {{ getFormatName(file.settingFormat, index, index2) }}
                  </p>
                </div>
                <div class="setting-content size">
                  <svg class="size-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504.78 367.79" fill="#231815">
                    <path
                      d="M479.17,367.79H25.61c-14.12,0-25.61-11.49-25.61-25.61V25.61C0,11.49,11.49,0,25.61,0H479.17c14.12,0,25.61,11.49,25.61,25.61V342.19c0,14.12-11.49,25.61-25.61,25.61ZM26,341.79H478.78V26H26V341.79Z"
                    />
                    <path
                      d="M436.48,54.19c-.71-.12-1.44-.2-2.18-.2h-90.71c-7.18,0-13,5.82-13,13s5.82,13,13,13h79.58v77.89c0,7.18,5.82,13,13,13s13-5.82,13-13V67.17c0-7.08-5.66-12.82-12.69-12.98Z"
                    />
                    <path
                      d="M160.08,289.52H80.49v-77.89c0-7.18-5.82-13-13-13s-13,5.82-13,13v90.71c0,7.08,5.66,12.82,12.69,12.98,.71,.12,1.44,.2,2.18,.2h90.71c7.18,0,13-5.82,13-13s-5.82-13-13-13Z"
                    />
                  </svg>
                  <p
                    class="text"
                    :class="
                      getChangeClass(
                        `${file.originalWidth}×${file.originalHeight}`,
                        `${file.settingWidth}×${file.settingHeight}`
                      )
                    "
                  >
                    {{ `${file.settingWidth}×${file.settingHeight}` }}
                  </p>
                </div>
                <div class="setting-content capacity">
                  <svg
                    class="capacity-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 451.25 346.08"
                    fill="#231815"
                  >
                    <path
                      d="M451.25,138.19c0-6.78-2.02-13.53-5.96-19.29h0c-6.37-9.36-16.99-14.96-28.31-14.96h-20.56v-27.46c-.03-9.12-3.61-17.77-10.04-24.23-6.47-6.43-15.11-10.01-24.23-10.04H175.17l-10.47-22.44h0C159.07,7.71,146.95,0,133.65,0H34.27C25.15,.03,16.5,3.61,10.04,10.04,3.61,16.5,.03,25.14,0,34.27V312.96c0,1.14,.39,2.16,.66,3.23,.67,5.27,2.22,10.43,5.3,14.94h0c6.37,9.36,16.98,14.96,28.31,14.96H362.16c14.1,0,26.73-8.62,31.88-21.74l.31-.87,54.83-173.61h-.05c1.38-3.79,2.13-7.74,2.13-11.67ZM27.41,34.27c-.03-1.71,.78-3.65,2.01-4.85,1.19-1.23,3.15-2.03,4.85-2.01h99.38c2.68,0,5.07,1.53,6.21,3.96h0l14.16,30.34c2.25,4.83,7.09,7.91,12.42,7.91h195.72c1.7-.03,3.65,.78,4.85,2.01,1.23,1.2,2.03,3.14,2.01,4.85v27.46H89.09c-14.09,0-26.73,8.62-31.88,21.74l-.31,.87-29.49,93.37V34.27Zm395.94,106.45l-.32,.88-54.59,172.83c-1.04,2.52-3.53,4.24-6.29,4.24H34.27c-2.28,0-4.38-1.12-5.66-2.99h0c-.8-1.18-1.19-2.5-1.19-3.86l.47-2.49,.32-.91,54.57-172.81c1.03-2.54,3.55-4.27,6.32-4.26H416.98c2.28,0,4.38,1.12,5.66,2.99h0c.79,1.16,1.19,2.5,1.19,3.85l-.48,2.52Z"
                    />
                  </svg>
                  <p
                    class="text"
                    :class="
                      getChangeClass(getBeforeFileSize(file.originalFileSize), getAfterFileSize(file.outputImageSize))
                    "
                  >
                    {{ getAfterFileSize(file.outputImageSize) }}
                  </p>
                </div>
              </div>
              <button class="setting-button" @click="openMenu(index, index2)">
                <svg class="setting-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 371.29 434.76" fill="#231815">
                  <path
                    d="M371.29,338.69v-8.9c0-5.36-4.35-9.71-9.71-9.71h-6.45c-4.3,0-8.15-2.81-9.31-6.95-1.68-6-4.05-11.71-7.03-17.03-2.1-3.76-1.38-8.46,1.66-11.51l4.55-4.55c3.79-3.79,3.79-9.94,0-13.73l-6.29-6.29c-3.79-3.79-9.94-3.8-13.73,0l-4.57,4.56c-3.04,3.04-7.75,3.76-11.5,1.65-5.32-2.98-11.02-5.35-17.01-7.02-4.14-1.16-6.96-5.01-6.96-9.31v-6.45c0-5.36-4.35-9.71-9.71-9.71h-8.9c-5.36,0-9.71,4.35-9.71,9.71v6.45c0,4.3-2.81,8.16-6.96,9.31-6,1.68-11.71,4.05-17.03,7.03-3.76,2.11-8.47,1.39-11.51-1.66l-4.55-4.55c-3.79-3.79-9.95-3.79-13.74,0l-6.28,6.29c-3.79,3.79-3.79,9.94,0,13.73l4.56,4.56c3.04,3.04,3.76,7.75,1.66,11.51-2.98,5.32-5.35,11.03-7.03,17.02-1.16,4.14-5.01,6.95-9.31,6.95h-6.45c-5.36,0-9.71,4.35-9.71,9.71v8.9c0,5.36,4.35,9.71,9.71,9.71h6.45c4.3,0,8.15,2.81,9.31,6.95,1.68,6,4.05,11.7,7.03,17.02,2.1,3.76,1.39,8.46-1.66,11.51l-4.56,4.56c-3.79,3.79-3.79,9.94,0,13.73l6.28,6.28c3.79,3.79,9.94,3.8,13.74,0l4.55-4.55c3.05-3.04,7.76-3.76,11.51-1.65,5.32,2.99,11.03,5.36,17.03,7.04,4.14,1.16,6.96,5.01,6.96,9.31v6.44c0,5.36,4.35,9.71,9.71,9.71h8.9c5.36,0,9.71-4.35,9.71-9.71v-6.44c0-4.3,2.81-8.15,6.95-9.31,6-1.68,11.7-4.05,17.03-7.04,3.76-2.11,8.47-1.39,11.51,1.66l4.55,4.55c3.79,3.79,9.94,3.79,13.74,0l6.28-6.28c3.79-3.79,3.79-9.94,0-13.73l-4.55-4.55c-3.04-3.04-3.76-7.75-1.66-11.51,2.98-5.32,5.36-11.03,7.03-17.03,1.16-4.14,5.01-6.95,9.31-6.95h6.45c5.36,0,9.71-4.35,9.71-9.71Zm-73.83,22.25c-6.86,6.86-16.28,11.09-26.7,11.09s-19.84-4.23-26.71-11.09c-6.84-6.86-11.08-16.27-11.08-26.7s4.24-19.84,11.08-26.7c6.87-6.85,16.27-11.08,26.71-11.08s19.84,4.23,26.7,11.08c6.86,6.86,11.08,16.27,11.08,26.7s-4.22,19.84-11.08,26.7Z"
                  />
                  <path
                    d="M353.49,114.8v-10.57c0-3.87-1.54-7.59-4.27-10.32L259.57,4.27c-2.73-2.73-6.45-4.27-10.32-4.27H33.9C15.21,0,0,15.21,0,33.9V390.92c0,18.69,15.21,33.9,33.9,33.9H164.28v-.02c7.92-.16,14.29-6.62,14.29-14.58h0c0-7.96-6.37-14.41-14.29-14.58v-.02H33.9c-2.6,0-4.71-2.12-4.71-4.72V33.9c0-2.6,2.12-4.71,4.71-4.71H216.8V116.6c0,8.07,6.53,14.6,14.59,14.6h92.91v97.94c-.01,.27-.04,.54-.04,.81,0,8.06,6.53,14.59,14.59,14.59s14.26-6.23,14.56-14.03h.08V118.39c.07-.6,.18-1.17,.18-1.79s-.11-1.2-.18-1.8Zm-107.5-12.79V31.96l70.04,70.04h-70.04Z"
                  />
                  <path
                    d="M270.77,186.01H68.63c-8.28,0-15-6.72-15-15s6.72-15,15-15h202.14c8.28,0,15,6.72,15,15s-6.72,15-15,15Z"
                  />
                  <path
                    d="M172.3,265.55H67.77c-8.28,0-15-6.72-15-15s6.72-15,15-15h104.54c8.28,0,15,6.72,15,15s-6.72,15-15,15Z"
                  />
                </svg>
              </button>
              <DeleteButton
                top="-5px"
                right="-5px"
                width="18px"
                icon-width="8px"
                :disabled="getConverting"
                @click="deleteSetting(index, index2)"
              />
              <Menu
                :unique-index="index"
                :unique-index2="index2"
                :selected-index="selectedMenuIndex"
                :selected-index2="selectedMenuIndex2"
                :open="isOpenMenu"
                :format="inputFiles[index][index2].settingFormat"
                :format-level="inputFiles[index][index2].settingFormatLevel"
                :original-width="inputFiles[index][index2].originalWidth"
                :original-height="inputFiles[index][index2].originalHeight"
                :width="inputFiles[index][index2].settingWidth"
                :height="inputFiles[index][index2].settingHeight"
                :fit="inputFiles[index][index2].settingFit"
                :position="inputFiles[index][index2].settingPosition"
                :background="inputFiles[index][index2].settingBackground"
                :image="files[0].originalInfo + files[0].originalImage"
                :original-format="inputFiles[index][index2].originalFormat"
                @click-mask="closeMenu"
                @cancel="closeMenu"
                @disision="setReceiveData"
              />
              <div v-if="getSuccess(index, index2)" class="success-message">
                <svg class="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 523.99 523.99" fill="#231815">
                  <path
                    d="M262,523.99c-69.98,0-135.77-27.25-185.26-76.74C27.25,397.77,0,331.98,0,262S27.25,126.22,76.74,76.74C126.22,27.25,192.01,0,262,0s135.77,27.25,185.26,76.74c49.49,49.48,76.74,115.28,76.74,185.26s-27.25,135.77-76.74,185.26c-49.48,49.49-115.28,76.74-185.26,76.74Zm0-475.99c-57.16,0-110.9,22.26-151.32,62.68-40.42,40.42-62.68,94.16-62.68,151.32s22.26,110.9,62.68,151.32c40.42,40.42,94.16,62.68,151.32,62.68s110.9-22.26,151.32-62.68c40.42-40.42,62.68-94.16,62.68-151.32s-22.26-110.9-62.68-151.32c-40.42-40.42-94.16-62.68-151.32-62.68Z"
                  />
                  <polygon
                    points="386.27 169.47 242.42 301.18 181.81 230.31 129.66 272.03 241.46 381.87 401.19 185.69 386.27 169.47"
                  />
                </svg>
              </div>
            </div>
            <button class="add-button" @click="addSetting(index)">
              <svg class="add-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 207.73 207.73" fill="#231815">
                <path
                  d="M195.51,91.65H116.09V12.22c0-6.75-5.47-12.22-12.22-12.22s-12.22,5.47-12.22,12.22V91.65H12.22c-6.75,0-12.22,5.47-12.22,12.22s5.47,12.22,12.22,12.22H91.65v79.43c0,6.75,5.47,12.22,12.22,12.22s12.22-5.47,12.22-12.22V116.09h79.43c6.75,0,12.22-5.47,12.22-12.22s-5.47-12.22-12.22-12.22Z"
                />
              </svg>
            </button>
          </div>
          <div class="button-outer">
            <Button
              text="変換"
              width="120px"
              height="32px"
              type="white"
              :cancel="getCancelButton(index)"
              :disabled="getConverting"
              :style="{ marginBottom: '10px' }"
              @click="manageSubmit(index)"
              @cancel="cancelConvert"
            />
            <Button
              text="ダウンロード"
              width="120px"
              height="32px"
              type="purple"
              :disabled="getDisabledDownloadButton(index)"
              @click="manageDownload('single', index)"
            />
          </div>
          <DeleteButton
            top="-8px"
            right="-8px"
            width="20px"
            icon-width="8px"
            :disabled="getConverting"
            @click="deleteImage(index)"
          />
        </div>
      </div>
      <div
        class="drop-area"
        :class="getDropAreaClass"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @dragover.prevent
        @drop.prevent="inputFile"
      >
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 308.47 370.52" fill="#231815">
          <path
            id="d"
            d="M308.47,101.7c-.02-.52-.07-1.05-.16-1.56v-9.22c0-3.37-1.34-6.61-3.72-9L226.39,3.73c-2.39-2.38-5.62-3.73-8.99-3.73H29.57C13.25,.02,.02,13.25,0,29.57V340.95c.02,16.32,13.25,29.55,29.57,29.57h249.17c16.32-.02,29.55-13.25,29.57-29.57V103.26c.09-.52,.14-1.04,.16-1.57m-32.83-12.72h-61.09V27.88l61.09,61.09Zm3.1,256.1H29.57c-2.27,0-4.11-1.84-4.11-4.11V29.57c0-2.27,1.84-4.11,4.11-4.11H189.09V101.68c0,7.03,5.69,12.73,12.72,12.73h81.04v226.54c0,2.27-1.84,4.11-4.11,4.11"
          />
          <path
            d="M197.43,201.89h-38.39v-38.39c0-4.54-3.68-8.23-8.23-8.23s-8.23,3.68-8.23,8.23v38.39h-38.39c-4.54,0-8.23,3.68-8.23,8.23s3.68,8.23,8.23,8.23h38.39v38.39c0,4.54,3.68,8.23,8.23,8.23s8.23-3.68,8.23-8.23v-38.39h38.39c4.54,0,8.23-3.68,8.23-8.23s-3.68-8.23-8.23-8.23Z"
          />
        </svg>
        <div class="text-outer">
          <label for="upload" class="upload-outer">ここをクリック</label>
          <p class="text">またはドラッグ&ドロップでファイルを追加できます。</p>
        </div>
        <p class="text margin-top-20">対応ファイル：JPEG / PNG / WebP / GIF / TIFF / AVIF / HEIF / BMP</p>
        <input id="upload" class="upload" type="file" :accept="$SUPPORT_FORMAT" multiple @change="inputFile" />
      </div>
      <Attention />
      <div class="setting-bar" @click="clickSettingBar">
        <div class="setting-bar-inner">
          <SwitchButton
            :on="isDownloadByFolder"
            text="複数ファイルはフォルダで保存"
            text-position="right"
            top="25px"
            left="20px"
            @click="clickDownloadByFolder"
          />
          <div v-if="getProgressDisplay" class="progress-bar">
            <p
              v-if="numberOfScheduledConversions > 0 && numberOfScheduledConversions !== numberOfCompletedConversions"
              class="text"
            >
              変換中
            </p>
            <p v-else class="text">完了</p>
            <div class="progress-outer">
              <span class="progress back"></span>
              <span class="progress front" :class="getConvertingClass" :style="getProgressStyle"></span>
            </div>
            <p class="percent">{{ getProgressPercent }}</p>
            <p class="subject">{{ numberOfCompletedConversions + '/' + numberOfScheduledConversions }}</p>
          </div>
          <div class="setting-bar-buttons">
            <Button
              text="一括変換"
              width="150px"
              height="40px"
              type="white"
              :style="{ marginRight: '20px' }"
              :cancel="getCancelButton(9999)"
              :disabled="getDisabledAllSubmitButton"
              @click="manageSubmit(9999)"
              @cancel="cancelConvert"
            />
            <Button
              text="一括ダウンロード"
              width="150px"
              height="40px"
              type="purple"
              :disabled="getDisabledAllDownloadButton"
              @click="manageDownload('all')"
            />
          </div>
        </div>
      </div>
      <ImageList
        :images="inputFiles"
        :open="isOpenImageList"
        :disabled="getConverting"
        @close="closeImageList"
        @delete="deleteImage"
      />
    </main>
  </div>
</template>
<script>
import JSZip from 'jszip';
export default {
  data() {
    return {
      isEnter: false,
      isOpenMenu: false,
      isOpenImageList: false,
      isBatchSetting: false,
      isDownloadByFolder: true,
      isCancelConversion: false,
      isDisplayProgressBar: false,
      isInputAnimating: false,
      isConverting: false,
      isConvertingAll: false,
      isAlreadySubmit: false,
      firstFile: [],
      inputFiles: [],
      selectedMenuIndex: null,
      selectedMenuIndex2: null,
      convertingIndex: null,
      numberOfScheduledConversions: 0,
      numberOfCompletedConversions: 0,
    };
  },
  computed: {
    getInputFiles() {
      return this.isBatchSetting ? this.firstFile : this.inputFiles;
    },
    getDropAreaClass() {
      return { enter: this.isEnter };
    },
    getCancelButton() {
      return function (index) {
        if (this.isConvertingAll && this.isBatchSetting) {
          return true;
        } else if (this.isConvertingAll) {
          return index === 9999;
        } else if (this.isConverting) {
          return index === this.convertingIndex || index === 9999;
        } else {
          return false;
        }
      };
    },
    getConverting() {
      return this.isConverting || this.isConvertingAll;
    },
    getDisabledAllSubmitButton() {
      return this.isConverting || this.isConvertingAll || this.inputFiles.length === 0;
    },
    getDisabledDownloadButton() {
      return function (key) {
        const length = this.inputFiles[key].length;
        let count = 0;
        for (let i = 0; i < length; i++) {
          if (this.inputFiles[key][i].outputImage) count++;
        }
        return !(count > 0 && !this.isConverting && !this.isConvertingAll);
      };
    },
    getDisabledAllDownloadButton() {
      const length1 = this.inputFiles.length;
      let count = 0;
      for (let i = 0; i < length1; i++) {
        const length2 = this.inputFiles[i].length;
        for (let j = 0; j < length2; j++) {
          if (this.inputFiles[i][j].outputImage) count++;
        }
      }
      return !(count > 0 && !this.isConverting && !this.isConvertingAll);
    },
    getFormatName() {
      return function (key, index = 0, index2 = 0) {
        if (key === 'webp' || (key === 'original' && this.inputFiles[index][index2].originalFormat === 'webp'))
          return 'WebP';
        else if (key === 'original') return this.inputFiles[index][index2].originalFormat.toUpperCase();
        else return key.toUpperCase();
      };
    },
    getBeforeFileSize() {
      return function (key) {
        return this.formatFileSize(key);
      };
    },
    getAfterFileSize() {
      return function (key) {
        if (key === 0) {
          return '-----';
        } else {
          return this.formatFileSize(key);
        }
      };
    },
    getImageStyle() {
      return function (index) {
        if (this.inputFiles[index][0].originalWidth >= this.inputFiles[index][0].originalHeight) {
          return { width: '100%' };
        } else {
          return { height: '100%' };
        }
      };
    },
    getChangeClass() {
      return function (before, after) {
        return { change: before !== after && after !== '-----' };
      };
    },
    getMultiImage() {
      return this.inputFiles.length > 1 && this.isBatchSetting;
    },
    getSuccess() {
      return function (index, index2) {
        if (this.isBatchSetting) {
          const length = this.inputFiles.length;
          return this.inputFiles[length - 1][index2].outputImage;
        } else {
          return this.inputFiles[index][index2].outputImage;
        }
      };
    },
    getProgressStyle() {
      const parcent = Math.round((this.numberOfCompletedConversions / this.numberOfScheduledConversions) * 100);
      return { width: `${parcent}%` };
    },
    getProgressPercent() {
      const parcent = Math.round((this.numberOfCompletedConversions / this.numberOfScheduledConversions) * 100);
      return `${parcent}%`;
    },
    getProgressDisplay() {
      return this.isDisplayProgressBar;
    },
    getConvertingClass() {
      return { converting: this.isAlreadySubmit };
    },
    getAddImageAnimationClass() {
      return { 'add-image-animation': this.isInputAnimating };
    },
  },
  watch: {
    inputFiles(value) {
      this.firstFile.length = 0;
      if (value.length === 0) {
        // 最後の設定を削除したとき
        this.firstFile.splice();
      } else {
        this.firstFile.push(value[0]);
      }
    },
  },
  mounted() {},
  updated() {},
  methods: {
    dragEnter(event) {
      // [HACK]ドロップエリア内でのイベントは無視する
      if (
        event.fromElement === null ||
        (event.fromElement.className !== 'main' &&
          event.fromElement.className !== 'wrapper' &&
          event.fromElement.className !== 'attention' &&
          event.fromElement.className !== 'heading' &&
          event.fromElement.className !== 'text' &&
          event.fromElement.className !== 'title')
      )
        return;
      this.isEnter = true;
    },
    dragLeave(event) {
      // [HACK]ドロップエリア内でのイベントは無視する
      if (
        event.fromElement === null ||
        (event.fromElement.className !== 'main' &&
          event.fromElement.className !== 'wrapper' &&
          event.fromElement.className !== 'attention' &&
          event.fromElement.className !== 'heading' &&
          event.fromElement.className !== 'text' &&
          event.fromElement.className !== 'title')
      )
        return;
      this.isEnter = false;
    },
    async inputFile(event) {
      this.isEnter = false;
      // ファイル選択またはドラッグ&ドロップされたファイルを取得
      const files = event.target.files ? [...event.target.files] : [...event.dataTransfer.files];
      if (files.length === 0) return;

      // ファイル形式のチェック
      const imageFiles = files.filter((item) => this.$SUPPORT_FORMAT.includes(item.type));

      // ファイルサイズのチェック(4.2MBまで許可)
      const rightSizeFiles = imageFiles.filter((item) => item.size < 4200000);

      // 許可されたファイルを設定
      const enableFile = rightSizeFiles;

      // アップロードのエラーメッセージを表示
      if (imageFiles.length === 0) {
        this.errorMessage(1);
      } else if (imageFiles.length < files.length) {
        this.errorMessage(2);
      } else if (rightSizeFiles.length < imageFiles.length) {
        this.errorMessage(3);
      }

      // データをローカルに保存
      for (let i = 0; i < enableFile.length; i++) {
        // 枚数チェック
        if (this.inputFiles.length >= this.$MAXIMUM_NUMBER_OF_IMAGES) {
          this.errorMessage(9);
          return;
        }

        // エラー用の変数を初期化
        let error = false;

        // Base64変換
        let imageBase64;
        await this.conversionBase64(enableFile[i])
          .then((res) => {
            imageBase64 = res;
          })
          .catch(() => {
            this.errorMessage(4, enableFile[i].name);
            error = true;
          });

        // エラーがあれば処理をここで終える
        if (error) continue;

        // フォーマットを取得
        const format1 = imageBase64.substr(0, imageBase64.indexOf(';'));
        const format = format1.substr(format1.indexOf('/') + 1);

        // 画像（情報部）を取得
        const info = imageBase64.substr(0, imageBase64.indexOf('base64,') + 7);

        // 画像（データ部）を取得
        const image = imageBase64.substr(imageBase64.indexOf('base64,') + 7);

        // 画像サイズを取得
        let width;
        let height;
        await this.getImageSize(enableFile[i])
          .then((res) => {
            width = res.width;
            height = res.height;
          })
          .catch(() => {
            this.errorMessage(4, enableFile[i].name);
            error = true;
          });

        // エラーがあれば処理をここで終了
        if (error) continue;

        // データを作成
        if (this.isBatchSetting && this.inputFiles.length > 0) {
          // 同一設定中
          const length = this.inputFiles[0].length;
          const settingData = [];
          for (let j = 0; j < length; j++) {
            const resize = !(
              this.inputFiles[0][0].originalWidth === this.inputFiles[0][j].settingWidth &&
              this.inputFiles[0][0].originalHeight === this.inputFiles[0][j].settingHeight
            );
            const data = {
              originalName: enableFile[i].name,
              originalFileSize: enableFile[i].size,
              originalWidth: width,
              originalHeight: height,
              originalFormat: format,
              originalInfo: info,
              originalImage: image,
              settingFormat: this.inputFiles[0][j].settingFormat,
              settingFormatLevel: this.inputFiles[0][j].settingFormatLevel,
              settingWidth: resize ? this.inputFiles[0][j].settingWidth : width,
              settingHeight: resize ? this.inputFiles[0][j].settingHeight : height,
              settingFit: this.inputFiles[0][j].settingFit,
              settingPosition: this.inputFiles[0][j].settingPosition,
              settingBackground: this.inputFiles[0][j].settingBackground,
              outputInfo: '',
              outputImage: '',
              outputImageSize: 0,
              outputFile: [],
            };
            settingData.push(data);
          }
          this.inputFiles.push(settingData);
        } else {
          const data = [
            {
              originalName: enableFile[i].name,
              originalFileSize: enableFile[i].size,
              originalWidth: width,
              originalHeight: height,
              originalFormat: format,
              originalInfo: info,
              originalImage: image,
              settingFormat: 'original',
              settingFormatLevel: 'none',
              settingWidth: width,
              settingHeight: height,
              settingFit: 'cover',
              settingPosition: 'center',
              settingBackground: '#000000',
              outputInfo: '',
              outputImage: '',
              outputImageSize: 0,
              outputFile: [],
            },
          ];
          this.inputFiles.push(data);
        }
      }

      // アニメーションを発火
      if (enableFile.length > 0 && this.isBatchSetting) {
        this.isInputAnimating = true;
        setTimeout(() => {
          this.isInputAnimating = false;
        }, 1000);
      }
    },
    errorMessage(errcode, text) {
      switch (errcode) {
        case 1:
          alert('このファイルは対象外です。');
          break;

        case 2:
          alert('対象外のファイルが含まれていました。');
          break;

        case 3:
          alert('4.2MB以上のファイルはアップロードできません。');
          break;

        case 4:
          alert(`以下のファイルのアップロードに失敗しました。\n\n${text}`);
          break;

        case 5:
          alert('タイムアウト\nファイルが大きすぎる可能性があります。');
          break;

        case 6:
          alert(
            '変換後のファイルサイズが大きすぎるためエラーとなりました。\n申し訳ありませんが、設定を変更してください。'
          );
          break;

        case 7:
          alert('サーバーでエラーが発生しました。\n申し訳ありませんが、設定を変更し、もう一度お試しください。');
          break;

        case 8:
          alert('送信に失敗しました。');
          break;

        case 9:
          alert(`アップロードできる画像の上限は${this.$MAXIMUM_NUMBER_OF_IMAGES}枚です。`);
          break;

        case 10:
          alert(`一度に変換できる画像の上限は${this.$MAXIMUM_NUMBER_OF_SUBMIT}枚です。`);
          break;
      }
    },
    conversionBase64(src) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(src);
      });
    },
    getImageSize(src) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = (err) => reject(err);
        image.src = URL.createObjectURL(src);
      });
    },
    formatFileSize(data) {
      if (data / 1000 < 1000) return Math.round(data / 1000) + 'KB';
      else if (data / 1000000 < 1000) return Math.round((data / 1000000) * 10) / 10 + 'MB';
      else return data + 'B';
    },
    conversionFormatLevel(format, level) {
      if (level === 'lossless') return 0;

      if (format === 'jpeg' || format === 'webp' || format === 'avif') {
        if (level === 'high') return 100;
        else if (level === 'middle') return 80;
        else if (level === 'low') return 50;
        else return 80;
      } else {
        return 0;
      }
    },
    async manageSubmit(index) {
      if (this.isBatchSetting || index === 9999) {
        // 変換ファイルの合計を計算
        const length = this.inputFiles.length;
        let total = 0;
        for (let i = 0; i < length; i++) {
          total += this.inputFiles[i].length;
        }

        // 送信上限のチェック
        if (total > this.$MAXIMUM_NUMBER_OF_SUBMIT) {
          this.errorMessage(10);
          return;
        }

        // 変換中フラグ（ALL）をON
        this.isConvertingAll = true;

        // キャンセルフラグの初期化
        this.isCancelConversion = false;

        // プログレスバー用の値を設定
        this.numberOfScheduledConversions = total;
        this.numberOfCompletedConversions = 0;
        this.isDisplayProgressBar = true;
        this.isAlreadySubmit = false;

        // 変換処理
        await this.fileSubmitAll();

        // 変換中フラグ（ALL）をOFF
        this.isConvertingAll = false;
      } else {
        // 変換ファイルの合計を計算
        const total = this.inputFiles[index].length;

        // 送信上限のチェック
        if (total > this.$MAXIMUM_NUMBER_OF_SUBMIT) {
          this.errorMessage(10);
          return;
        }

        // 変換中フラグをON
        this.isConverting = true;

        // キャンセルフラグの初期化
        this.isCancelConversion = false;

        // プログレスバー用の値を設定
        this.numberOfScheduledConversions = total;
        this.numberOfCompletedConversions = 0;
        this.isDisplayProgressBar = true;
        this.isAlreadySubmit = false;

        // キャンセルボタン表示用のキーを設定
        this.convertingIndex = index;

        // 変換処理
        await this.fileSubmitSingle(index);

        // 変換中フラグをOFF
        this.isConverting = false;

        // キャンセルボタン表示用のキーを初期化
        this.convertingIndex = null;
      }
    },
    async fileSubmitAll() {
      // ファイルごとにfileSubmitSingleを実行
      const length = this.inputFiles.length;
      for (let i = 0; i < length; i++) {
        await this.fileSubmitSingle(i);
      }
    },
    async fileSubmitSingle(index) {
      // 設定ごとにsubmitを実行
      const length = this.inputFiles[index].length;
      for (let i = 0; i < length; i++) {
        await this.submit(index, i);
      }
    },
    async submit(index, index2) {
      // 変換済みの場合は送信しない
      if (this.inputFiles[index][index2].outputImage) {
        // 変換完了数をカウントアップ
        this.numberOfCompletedConversions++;
        return;
      }

      // キャンセルキーが押下されたとき
      if (this.isCancelConversion) return;

      // 送信データを作成
      const data = {
        image: this.inputFiles[index][index2].originalImage,
        type: this.inputFiles[index][index2].originalFormat,
        format: this.inputFiles[index][index2].settingFormat,
        original: this.inputFiles[index][index2].settingFormat === 'original',
        optimization:
          this.inputFiles[index][index2].settingFormat === 'original' &&
          this.inputFiles[index][index2].settingFormatLevel === 'optimization',
        level: this.conversionFormatLevel(
          this.inputFiles[index][index2].settingFormat,
          this.inputFiles[index][index2].settingFormatLevel
        ),
        lossless: this.inputFiles[index][index2].settingFormatLevel === 'lossless',
        resize:
          this.inputFiles[index][index2].originalWidth !== this.inputFiles[index][index2].settingWidth ||
          this.inputFiles[index][index2].originalHeight !== this.inputFiles[index][index2].settingHeight,
        width: this.inputFiles[index][index2].settingWidth,
        height: this.inputFiles[index][index2].settingHeight,
        fit: this.inputFiles[index][index2].settingFit,
        position: this.inputFiles[index][index2].settingPosition,
        background: this.inputFiles[index][index2].settingBackground,
      };
      // Amazon API Gatewayへの送信処理
      let success = true;
      let response;
      if (process.env.NODE_ENV === 'production') {
        await this.$axios
          .post('https://0nw778k56a.execute-api.ap-northeast-1.amazonaws.com/dev/v1/image-converter', data, {
            headers: {
              'x-api-key': process.env.API_KEY,
            },
          })
          .then((res) => {
            console.log('送受信成功', res);
            success = true;
            response = res;
          })
          .catch((err) => {
            console.log('エラー', err);
            success = false;
          });
      } else {
        await this.$axios
          .post('/dev/v1/image-converter', data, {
            headers: {
              'x-api-key': process.env.API_KEY,
            },
          })
          .then((res) => {
            console.log('送受信成功', res);
            success = true;
            response = res;
          })
          .catch((err) => {
            console.log('エラー', err);
            success = false;
          });
      }
      // 送信済みフラグをON
      this.isAlreadySubmit = true;
      if (success) {
        // サーバー側でのエラーを検証
        if (response.data.errorMessage) {
          console.log('サーバーのエラー', response.data.errorMessage);
          if (response.data.errorMessage.includes('timed out')) {
            this.errorMessage(5);
          } else if (response.data.errorMessage.includes('size exceeded maximum')) {
            this.errorMessage(6);
          } else {
            this.errorMessage(7);
          }
          return;
        } else {
          console.log('サーバー処理正常');
        }

        // レスポンスボディーを取得
        const dataJson = response.data.body;

        // JSONをパースする
        const data = JSON.parse(dataJson);

        // Base64をfileに変換する
        const bin = atob(data.image);
        const buffer = new Uint8Array(bin.length);
        for (let j = 0; j < bin.length; j++) {
          buffer[j] = bin.charCodeAt(j);
        }
        const file = new File([buffer.buffer], `output.${this.getFormat(index, index2)}`, {
          type: `image/${this.getFormat(index, index2)}`,
        });

        // 変換後の情報部を作成
        const info = this.inputFiles[index][index2].originalInfo.replace(
          this.inputFiles[index][index2].originalFormat,
          this.inputFiles[index][index2].settingFormat
        );

        // アウトプットファイルを格納
        this.inputFiles[index][index2].outputImage = data.image;
        this.inputFiles[index][index2].outputInfo = info;
        this.inputFiles[index][index2].outputImageSize = file.size;
        this.inputFiles[index][index2].outputFile = file;
        this.inputFiles.splice();

        // 変換完了数をカウントアップ
        this.numberOfCompletedConversions++;
      } else {
        this.errorMessage(8);
      }
    },
    manageDownload(type, index) {
      let downloadType;
      if (type === 'single') {
        if (this.isBatchSetting) {
          downloadType = 'all';
        } else {
          downloadType = 'single';
        }
      } else if (type === 'all') {
        downloadType = 'all';
      }

      if (downloadType === 'all') {
        this.fileDownloadAll();
      } else if (downloadType === 'single') {
        this.fileDownloadSingle(index);
      }
    },
    fileDownloadAll() {
      // ダウンロードファイル数を算出
      const length1 = this.inputFiles.length;
      let count = 0;
      let index = 0;
      for (let i = 0; i < length1; i++) {
        const length2 = this.inputFiles[i].length;
        for (let j = 0; j < length2; j++) {
          if (this.inputFiles[i][j].outputImage) {
            count++;
            index = i;
          }
        }
      }

      // ファイルが複数ある場合はzip形式で、１つの場合はファイル形式でダウンロード
      if (count > 1) {
        if (this.isDownloadByFolder) {
          this.downloadAllImagesByFolder();
        } else {
          this.downloadAllImagesByFile();
        }
      } else if (count === 1) {
        this.downloadSingleImagesByFile(index);
      }
    },
    fileDownloadSingle(index) {
      // ダウンロードファイル数を算出
      const length = this.inputFiles[index].length;
      let count = 0;
      for (let i = 0; i < length; i++) {
        if (this.inputFiles[index][i].outputImage) {
          count++;
        }
      }

      // ファイルが複数ある場合はzip形式で、１つの場合はファイル形式でダウンロード
      if (count > 1) {
        if (this.isDownloadByFolder) {
          this.downloadSingleImagesByFolder(index);
        } else {
          this.downloadSingleImagesByFile(index);
        }
      } else if (count === 1) {
        this.downloadSingleImagesByFile(index);
      }
    },
    async downloadAllImagesByFolder() {
      // JSZipインスタンスの作成
      const zip = new JSZip();

      // フォルダを作成
      const folderName = `${this.getDate('second')}_brueghel`;
      const folder = zip.folder(folderName);

      // ファイルに名前をつけてフォルダに格納
      const length1 = this.inputFiles.length;
      const fileNames = [];
      for (let i = 0; i < length1; i++) {
        const length2 = this.inputFiles[i].length;
        for (let j = 0; j < length2; j++) {
          // 未変換のファイルは無視する
          if (this.inputFiles[i][j].outputFile.length === 0) continue;

          // ファイル名を作成
          let fileName = this.createFileName(i, j);

          // ファイル名の重複をチェック
          fileNames.push(fileName + '.' + this.getFormat(i, j));
          const check = fileNames.filter((name) => name === fileName + '.' + this.getFormat(i, j));
          if (check.length > 1) {
            fileName = `${fileName} (${check.length - 1}).${this.getFormat(i, j)}`;
          } else {
            fileName = `${fileName}.${this.getFormat(i, j)}`;
          }

          // フォルダにファイルを格納
          folder.file(fileName, this.inputFiles[i][j].outputFile);
        }
      }

      // zipフォルダを作成
      let zipFile;
      await zip.generateAsync({ type: 'blob' }).then((blob) => {
        zipFile = blob;
      });

      // ダウンロード
      const link = document.createElement('a');
      link.download = `${folderName}.zip`;
      link.href = URL.createObjectURL(zipFile);
      link.click();
      URL.revokeObjectURL(link.href);
    },
    async downloadSingleImagesByFolder(index) {
      // JSZipインスタンスの作成
      const zip = new JSZip();

      // フォルダを作成
      const folderName = `${this.getDate('second')}_brueghel`;
      const folder = zip.folder(folderName);

      // ファイルに名前をつけてフォルダに格納
      const length = this.inputFiles[index].length;
      const fileNames = [];
      for (let i = 0; i < length; i++) {
        // 未変換のファイルは無視する
        if (this.inputFiles[index][i].outputFile.length === 0) continue;

        // ファイル名を作成
        let fileName = this.createFileName(index, i);

        // ファイル名の重複をチェック
        fileNames.push(fileName + '.' + this.getFormat(index, i));
        const check = fileNames.filter((name) => name === fileName + '.' + this.getFormat(index, i));
        if (check.length > 1) {
          fileName = `${fileName} (${check.length - 1}).${this.getFormat(index, i)}`;
        } else {
          fileName = `${fileName}.${this.getFormat(index, i)}`;
        }

        // フォルダにファイルを格納
        folder.file(fileName, this.inputFiles[index][i].outputFile);
      }

      // zipフォルダを作成
      let zipFile;
      await zip.generateAsync({ type: 'blob' }).then((blob) => {
        zipFile = blob;
      });

      // ダウンロード
      const link = document.createElement('a');
      link.download = `${folderName}.zip`;
      link.href = URL.createObjectURL(zipFile);
      link.click();
      URL.revokeObjectURL(link.href);
    },
    async downloadAllImagesByFile() {
      const length1 = this.inputFiles.length;
      for (let i = 0; i < length1; i++) {
        const length2 = this.inputFiles[i].length;
        for (let j = 0; j < length2; j++) {
          await this.downloadByFile(i, j);
        }
      }
    },
    async downloadSingleImagesByFile(index) {
      const length = this.inputFiles[index].length;
      for (let i = 0; i < length; i++) {
        await this.downloadByFile(index, i);
      }
    },
    downloadByFile(index, index2) {
      const link = document.createElement('a');
      link.download = `${this.createFileName(index, index2)}.${this.getFormat(index, index2)}`;
      link.href = this.inputFiles[index][index2].outputInfo + this.inputFiles[index][index2].outputImage;
      link.click();
      URL.revokeObjectURL(link.href);
    },
    createFileName(index, index2) {
      // オリジナルファイル名から拡張子を除去
      const name1 = this.inputFiles[index][index2].originalName;
      const name = name1.substr(0, name1.lastIndexOf('.'));

      // ファイル名を作成
      let fileName;
      if (
        this.inputFiles[index][index2].originalWidth === this.inputFiles[index][index2].settingWidth &&
        this.inputFiles[index][index2].originalHeight === this.inputFiles[index][index2].settingHeight
      ) {
        fileName = name;
      } else {
        fileName = name + '--' + this.inputFiles[index][index2].settingWidth;
      }
      return fileName;
    },
    getDate(type) {
      const today = new Date();
      let date;
      if (type === 'second') {
        date =
          today.getFullYear() +
          (today.getMonth() + 1).toString().padStart(2, '0') +
          today.getDate().toString().padStart(2, '0') +
          today.getHours().toString().padStart(2, '0') +
          today.getMinutes().toString().padStart(2, '0') +
          today.getSeconds().toString().padStart(2, '0');
      } else {
        date =
          today.getFullYear() +
          (today.getMonth() + 1).toString().padStart(2, '0') +
          today.getDate().toString().padStart(2, '0') +
          today.getHours().toString().padStart(2, '0') +
          today.getMinutes().toString().padStart(2, '0') +
          today.getSeconds().toString().padStart(2, '0') +
          today.getMilliseconds().toString().padStart(3, '0');
      }
      return date;
    },
    addSetting(index) {
      if (this.isBatchSetting) {
        const length = this.inputFiles.length;
        for (let i = 0; i < length; i++) {
          // データを作成
          const data = {
            originalName: this.inputFiles[i][0].originalName,
            originalFileSize: this.inputFiles[i][0].originalFileSize,
            originalWidth: this.inputFiles[i][0].originalWidth,
            originalHeight: this.inputFiles[i][0].originalHeight,
            originalFormat: this.inputFiles[i][0].originalFormat,
            originalInfo: this.inputFiles[i][0].originalInfo,
            originalImage: this.inputFiles[i][0].originalImage,
            settingFormat: 'original',
            settingFormatLevel: 'none',
            settingWidth: this.inputFiles[i][0].originalWidth,
            settingHeight: this.inputFiles[i][0].originalHeight,
            settingFit: 'cover',
            settingPosition: 'center',
            settingBackground: '#000000',
            outputInfo: '',
            outputImage: '',
            outputImageSize: 0,
            outputFile: [],
          };
          this.inputFiles[i].push(data);
        }
      } else {
        // データを作成
        const data = {
          originalName: this.inputFiles[index][0].originalName,
          originalFileSize: this.inputFiles[index][0].originalFileSize,
          originalWidth: this.inputFiles[index][0].originalWidth,
          originalHeight: this.inputFiles[index][0].originalHeight,
          originalFormat: this.inputFiles[index][0].originalFormat,
          originalInfo: this.inputFiles[index][0].originalInfo,
          originalImage: this.inputFiles[index][0].originalImage,
          settingFormat: 'original',
          settingFormatLevel: 'none',
          settingWidth: this.inputFiles[index][0].originalWidth,
          settingHeight: this.inputFiles[index][0].originalHeight,
          settingFit: 'cover',
          settingPosition: 'center',
          settingBackground: '#000000',
          outputInfo: '',
          outputImage: '',
          outputImageSize: 0,
          outputFile: [],
        };
        this.inputFiles[index].push(data);
      }
    },
    deleteImage(index) {
      if (this.isBatchSetting && !this.isOpenImageList) {
        // 同一設定中のため、すべてのファイルを操作
        this.inputFiles.length = 0;
        this.inputFiles.splice();
      } else {
        this.inputFiles.splice(index, 1);
      }
    },
    deleteSetting(index, index2) {
      if (this.isBatchSetting) {
        // 同一設定中のため、すべてのファイルを操作
        if (this.inputFiles[index].length === 1) {
          // 最後の設定ファイルのため、画像自体を削除
          this.inputFiles.length = 0;
          this.inputFiles.splice();
        } else {
          // 選択された設定ファイルを削除
          const length = this.inputFiles.length;
          for (let i = 0; i < length; i++) {
            this.inputFiles[i].splice(index2, 1);
          }
        }
      } else if (!this.isBatchSetting) {
        if (this.inputFiles[index].length === 1) {
          this.inputFiles.splice(index, 1);
        } else {
          this.inputFiles[index].splice(index2, 1);
        }
      }
    },
    openMenu(index, index2) {
      this.isOpenMenu = true;
      this.selectedMenuIndex = index;
      this.selectedMenuIndex2 = index2;
    },
    closeMenu() {
      this.isOpenMenu = false;
      this.selectedMenuIndex = null;
      this.selectedMenuIndex2 = null;
    },
    setReceiveData(res) {
      if (this.isBatchSetting) {
        const length = this.inputFiles.length;
        const index2 = res.index2;
        for (let i = 0; i < length; i++) {
          this.inputFiles[i][index2].settingFormat = res.format;
          this.inputFiles[i][index2].settingFormatLevel = res.formatLevel;
          this.inputFiles[i][index2].settingWidth = res.width;
          this.inputFiles[i][index2].settingHeight = res.height;
          this.inputFiles[i][index2].settingFit = res.fit;
          this.inputFiles[i][index2].settingPosition = res.position;
          this.inputFiles[i][index2].settingBackground = res.background;
          this.inputFiles[i][index2].outputInfo = '';
          this.inputFiles[i][index2].outputImage = '';
          this.inputFiles[i][index2].outputImageSize = 0;
          this.inputFiles[i][index2].outputFile = [];
        }
      } else {
        const index = res.index;
        const index2 = res.index2;
        this.inputFiles[index][index2].settingFormat = res.format;
        this.inputFiles[index][index2].settingFormatLevel = res.formatLevel;
        this.inputFiles[index][index2].settingWidth = res.width;
        this.inputFiles[index][index2].settingHeight = res.height;
        this.inputFiles[index][index2].settingFit = res.fit;
        this.inputFiles[index][index2].settingPosition = res.position;
        this.inputFiles[index][index2].settingBackground = res.background;
        this.inputFiles[index][index2].outputInfo = '';
        this.inputFiles[index][index2].outputImage = '';
        this.inputFiles[index][index2].outputImageSize = 0;
        this.inputFiles[index][index2].outputFile = [];
      }

      this.closeMenu();
    },
    getFormat(index, index2) {
      if (this.inputFiles[index][index2].settingFormat === 'original') {
        return this.inputFiles[index][index2].originalFormat;
      } else {
        return this.inputFiles[index][index2].settingFormat;
      }
    },
    clickSwitch() {
      this.isBatchSetting = !this.isBatchSetting;

      // 画像がない場合はここで終わり
      if (this.inputFiles.length === 0) return;

      // すべての画像に１つ目の設定を適応
      if (this.isBatchSetting) {
        // すべての画像のオリジナルデータを退避
        const length = this.inputFiles.length;
        const originalData = [];
        for (let i = 0; i < length; i++) {
          const data = {
            originalName: this.inputFiles[i][0].originalName,
            originalFileSize: this.inputFiles[i][0].originalFileSize,
            originalWidth: this.inputFiles[i][0].originalWidth,
            originalHeight: this.inputFiles[i][0].originalHeight,
            originalFormat: this.inputFiles[i][0].originalFormat,
            originalInfo: this.inputFiles[i][0].originalInfo,
            originalImage: this.inputFiles[i][0].originalImage,
          };
          originalData.push(data);
        }

        // １つ目の画像の設定データを退避
        const length2 = this.inputFiles[0].length;
        const settingData = [];
        for (let i = 0; i < length2; i++) {
          const data = {
            settingFormat: this.inputFiles[0][i].settingFormat,
            settingFormatLevel: this.inputFiles[0][i].settingFormatLevel,
            settingWidth: this.inputFiles[0][i].settingWidth,
            settingHeight: this.inputFiles[0][i].settingHeight,
            settingFit: this.inputFiles[0][i].settingFit,
            settingPosition: this.inputFiles[0][i].settingPosition,
            settingBackground: this.inputFiles[0][i].settingBackground,
            resize: !(
              originalData[0].originalWidth === this.inputFiles[0][i].settingWidth &&
              originalData[0].originalHeight === this.inputFiles[0][i].settingHeight
            ),
          };
          settingData.push(data);
        }

        // 新規に設定ファイルを作成
        this.inputFiles = [];
        for (let i = 0; i < length; i++) {
          // データを作成
          const data = [
            {
              originalName: originalData[i].originalName,
              originalFileSize: originalData[i].originalFileSize,
              originalWidth: originalData[i].originalWidth,
              originalHeight: originalData[i].originalHeight,
              originalFormat: originalData[i].originalFormat,
              originalInfo: originalData[i].originalInfo,
              originalImage: originalData[i].originalImage,
              settingFormat: settingData[0].settingFormat,
              settingFormatLevel: settingData[0].settingFormatLevel,
              settingWidth: settingData[0].resize ? settingData[0].settingWidth : originalData[i].originalWidth,
              settingHeight: settingData[0].resize ? settingData[0].settingHeight : originalData[i].originalHeight,
              settingFit: settingData[0].settingFit,
              settingPosition: settingData[0].settingPosition,
              settingBackground: settingData[0].settingBackground,
              outputInfo: '',
              outputImage: '',
              outputImageSize: 0,
              outputFile: [],
            },
          ];
          this.inputFiles.push(data);
          for (let j = 1; j < length2; j++) {
            // データを作成
            const data = {
              originalName: originalData[i].originalName,
              originalFileSize: originalData[i].originalFileSize,
              originalWidth: originalData[i].originalWidth,
              originalHeight: originalData[i].originalHeight,
              originalFormat: originalData[i].originalFormat,
              originalInfo: originalData[i].originalInfo,
              originalImage: originalData[i].originalImage,
              settingFormat: settingData[j].settingFormat,
              settingFormatLevel: settingData[j].settingFormatLevel,
              settingWidth: settingData[j].resize ? settingData[j].settingWidth : originalData[i].originalWidth,
              settingHeight: settingData[j].resize ? settingData[j].settingHeight : originalData[i].originalHeight,
              settingFit: settingData[j].settingFit,
              settingPosition: settingData[j].settingPosition,
              settingBackground: settingData[j].settingBackground,
              outputInfo: '',
              outputImage: '',
              outputImageSize: 0,
              outputFile: [],
            };
            this.inputFiles[i].push(data);
          }
        }
      }
    },
    clickSettingBar() {
      if (this.isOpenMenu) this.closeMenu();
      else if (this.isOpenImageList) this.closeImageList();
    },
    openImageList() {
      this.isOpenImageList = true;
    },
    closeImageList() {
      this.isOpenImageList = false;
    },
    clickDownloadByFolder() {
      this.isDownloadByFolder = !this.isDownloadByFolder;
    },
    cancelConvert() {
      this.isCancelConversion = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--color1);

  @include responsive(xl) {
    align-items: center;
    justify-content: center;
  }
}

.main {
  position: relative;
  display: flex;
  overflow-x: auto;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 60px 30px 200px 30px;
  min-height: calc(100vh - 40px);
  width: 1200px;
  border-radius: 10px;
  background-color: var(--white);
}

.contents {
  width: 100%;
}

.content {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
  padding: 10px 140px 10px 230px;
  min-height: 224px;
  width: 100%;
  border: 2px var(--color3) solid;
  border-radius: 8px;
  background-color: var(--color1);
}

.image-area {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border-radius: 8px;
  background-color: var(--white);
  &.add-image-animation {
    animation: add-image .8s both;

    @keyframes add-image {
      0%,100% {
        transform: translateX(0%);
        transform-origin: 50% 50%;
      }
      15% {
        transform: translateX(-30px) rotate(-6deg);
      }
      30% {
        transform: translateX(15px) rotate(6deg);
      }
      45% {
        transform: translateX(-15px) rotate(-3.6deg);
      }
      60% {
        transform: translateX(9px) rotate(2.4deg);
      }
      75% {
        transform: translateX(-6px) rotate(-1.2deg);
      }
    }
  }
}

.image-outer {
  position: relative;
}

.image-button {
  display: flex;
  width: inherit;
  height: inherit;
  .image {
    width: inherit;
    height: inherit;
  }
}

.multi-icon {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 16px;
  fill: var(--white);
}

.boby-outer {
  position: relative;
  padding-bottom: 80px;
  width: 100%;
}

.name {
  margin-bottom: 10px;
  color: var(--gray7);
  font-weight: 400;
  font-size: var(--font-size-lg);
}

.setting-outer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
  width: 700px;
  border-radius: 8px;
  background-color: var(--white);
  &:not(:first-child) {
    margin-bottom: 10px;
  }
}

.setting-contents {
  display: flex;
  align-items: center;
  justify-content: center;
}

.setting-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 6px;
  .text {
    margin-left: 8px;
    color: var(--gray8);
    font-weight: 400;
    &.change {
      color: var(--color4);
    }
  }
}

.format {
  width: 60px;
}

.size {
  width: 100px;
}

.capacity {
  width: 70px;
}

.format-icon {
  width: 11px;
  fill: var(--color2);
}

.size-icon {
  width: 15px;
  fill: var(--color2);
}

.capacity-icon {
  width: 14px;
  fill: var(--color2);
}

.setting-arrow {
  margin: 0 16px;
  width: 32px;
}

.setting-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  padding: 5px;
  width: 28px;
  height: 28px;
  border-radius: 5px;

  @include hover() {
    background-color: var(--gray0);
  }
  &::before {
    position: absolute;
    top: -1px;
    left: -14px;
    width: 1px;
    height: 32px;
    background-color: var(--color3);
    content: '';
  }
}

.setting-icon {
  width: 20px;
  fill: var(--gray7);
}

.success-message {
  position: absolute;
  top: 0;
  left: calc(100% + 14px);
  display: flex;
  align-items: center;
  width: 30px;
  height: 100%;
}

.success-icon {
  width: 16px;
  fill: var(--green);
}

.button-outer {
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 120px;
  height: 144px;
}

.add-button {
  position: absolute;
  bottom: 18px;
  left: calc(50% - 25px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: var(--white);

  @include hover() {
    background-color: var(--color9);
    .add-icon {
      fill: var(--color10);
    }
  }
  .add-icon {
    width: 20px;
    transition: fill .2s;
    fill: var(--color3);
  }
}

.drop-area {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
  padding: 80px;
  width: 100%;
  border: 2px var(--color3) dashed;
  border-radius: 8px;
  background-color: var(--color1);
  .icon {
    width: 50px;
    fill: var(--color3);
  }
  .text-outer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
  .text {
    color: var(--gray8);
    font-size: var(--font-size-lg);
    pointer-events: none;
    &.margin-top-20 {
      margin-top: 20px;
    }
  }
  &.enter {
    background-color: var(--color5);
  }
}

.upload-outer {
  display: inline;
  margin-right: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  background-color: var(--color4);
  color: var(--white);
  font-size: var(--font-size-md);
  cursor: pointer;

  @include hover() {
    background-color: var(--color8);
  }
}

.upload {
  display: none;
}

.setting-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  background-color: var(--color1);
}

.setting-bar-inner {
  position: relative;
  margin-bottom: 20px;
  width: 1200px;
  height: 70px;
  border-top: 2px var(--color1) solid;
  border-radius: 0 0 10px 10px;
  background-color: var(--white);
}

.progress-bar {
  position: absolute;
  top: 25px;
  left: 350px;
  display: flex;
  align-items: center;
  .text {
    margin-right: 6px;
    width: 40px;
    color: var(--gray7);
    text-align: right;
  }
  .progress-outer {
    position: relative;
    margin-top: 2px;
    margin-right: 4px;
    width: 350px;
    height: 5px;
    .progress {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: 5px;
    }

    .back {
      width: 100%;
      background-color: var(--gray1);
    }
    .front {
      background-color: var(--color4);
    }
    .converting {
      transition: width .5s;
    }
  }
  .percent {
    margin-right: 12px;
    width: 34px;
    color: var(--gray7);
    text-align: right;
  }
  .subject {
    width: 50px;
    color: var(--gray7);
  }
}

.setting-bar-buttons {
  position: absolute;
  top: 14px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
