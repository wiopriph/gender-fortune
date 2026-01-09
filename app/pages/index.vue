<script lang="ts" setup>
import FortuneWheel from 'vue-fortune-wheel';
import 'vue-fortune-wheel/style.css';


const isVerifying = ref(false);

const CANVAS_OPTIONS = {
  radius: 300,
  textRadius: 200,
  textLength: 100,
  lineHeight: 30,
  borderColor: '#FFFFFF',
  borderWidth: 6,
  btnText: 'Узнать',
  btnWidth: 160,
};


const PRIZE_ID = 1;

const PRIZES = [
  {
    id: 1,
    name: 'Мальчик',
    value: 'У вас будет внук',
    bgColor: '#6085DE',
    color: '#FFFFFF',
    probability: 50,
  },
  {
    id: 2,
    name: 'Девочка',
    value: 'У вас будет внучка',
    bgColor: '#FF92A5',
    color: '#ffffff',
    probability: 50,
  },
];


function onCanvasRotateStart(rotate) {
  if (isVerifying.value) {
    rotate();
    isVerifying.value = false;
  }
}

function onRotateEnd() {
  setTimeout(() => {
    isOpenModal.value = true;
  }, 1000);
}

const isOpenModal = ref(false);


const title = 'Коротаев или Коротаева?';
const description = 'Нажми на кнопку, чтобы узнать.';
const image = 'https://korotaev-gender.onrender.com/images/image.webp';

useHead({
  title: computed(() => title),
  meta: computed(() => [
    { key: 'og:type', property: 'og:type', content: 'website' },
    { hid: 'og:image', property: 'og:image', content: image },
    { key: 'og:image:width', property: 'og:image:width', content: '512' },
    { key: 'og:image:height', property: 'og:image:height', content: '512' },
    { key: 'og:title', property: 'og:title', content: title },
    { key: 'og:description', property: 'og:description', content: description },

    { key: 'description', name: 'description', content: description },

    { hid: 'twitter:image', property: 'twitter:image', content: image },
    { key: 'twitter:title', property: 'twitter:title', content: title },
    { key: 'twitter:description', property: 'twitter:description', content: description },
  ]),
});
</script>

<template>
  <div :class="$style.root">
    <FortuneWheel
      :canvas="CANVAS_OPTIONS"
      :duration="7000"
      :prizeId="PRIZE_ID"
      :prizes="PRIZES"
      :verify="isVerifying"
      @rotate-end="onRotateEnd"
      @rotate-start="onCanvasRotateStart"
    />

    <Modal
      v-if="isOpenModal"
      @close="isOpenModal = false"
    >
      <div :class="$style.content">
        <img
          :class="$style.image"
          alt="bird"
          src="/images/bird.webp"
        >
      </div>
    </Modal>
  </div>
</template>

<style lang="scss" module>
.root {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-image: url("/images/background.webp");
  background-size: cover;
}

.content {
  position: relative;
}

.image {
  width: 100%;
}
</style>

<style>
.fw-btn__btn {
  background-color: #87CEEB !important;
}

.fw-btn__btn::before {
  border-bottom: 18px #87CEEB solid !important;;
}
</style>
