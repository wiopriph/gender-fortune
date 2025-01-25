<script setup lang="ts">
import type {Props} from './types';


const props = withDefaults(defineProps<Props>(), {
  maxWidth: '500px',
  title: '',
});

const rootStyles = computed(() => ({
  'max-width': props.maxWidth
}));

const emit = defineEmits(['close']);

const closeModal = () => {
  unlockScroll();
  emit('close');
};

const keyDownHandler = (event: KeyboardEvent) => {
  if (event.code.toLowerCase() === 'escape') {
    closeModal();
  }
};


const isScrollLocked = ref(false);

const lockScroll = () => {
  if (!isScrollLocked.value) {
    document.body.classList.add('scroll-locked');
    document.addEventListener('keydown', keyDownHandler);
    isScrollLocked.value = true;
  }
};

const unlockScroll = () => {
  if (isScrollLocked.value) {
    document.body.classList.remove('scroll-locked');
    document.removeEventListener('keydown', keyDownHandler);
    isScrollLocked.value = false;
  }
};

onMounted(lockScroll);
onBeforeUnmount(unlockScroll);
</script>

<template>
  <Teleport to="body">
    <div
        :class="$style.modal"
        @click.self="closeModal"
    >
      <div :class="$style.wrapper">
        <div :class="$style.content" :style="rootStyles">
          <slot/>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" module>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  overflow: auto;
  background: rgba(#000000, .9);
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 100%;
  padding: 15px;
  pointer-events: none;
}

.content {
  position: relative;
  width: 100%;
  max-width: 992px;
  margin: 0 auto;
  overflow: hidden;
  pointer-events: auto;
}

.title {
  text-transform: uppercase;
}
</style>
