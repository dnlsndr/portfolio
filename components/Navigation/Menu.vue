<template>
  <transition v-bind="$attrs" :name="animationName">
    <div @scroll.prevent v-if="opened" ref="root"
      class="fixed top-0 bottom-0 left-0 right-0 z-[100] p-4 lg:pt-24"
      role="dialog">
      <div
        class="modal-backdrop absolute top-0 left-0 right-0 bottom-0 bg-gray-1000 bg-opacity-50"
        @click.self="close"></div>

      <div :class="['modal-box', modalBoxClass]" @keydown.esc="close">
        <div
          class="relative flex max-h-full min-h-0 w-full flex-col bg-white shadow-xl dark:bg-gray-900"
          :class="[modalClass, !isSlideOut ? 'rounded-md' : 'h-full']">
          <div class="flex flex-shrink-0 items-center p-4 text-xl">
            <div class="leading-4">
              Menu
            </div>
            <div class="ml-auto cursor-pointer" @click="close">
              <PhX size="20" class="block" />
            </div>
          </div>
          <div class="p-4">
            <div class="flex items-center gap-3">
              <PhCampfire size="20" />
              Home
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { computed, defineComponent, onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import { PhX, PhCampfire } from "@dnlsndr/vue-phosphor-icons"
import { useScrollLock } from '@vueuse/core'
const props = defineProps({
  modalClass: {
    type: String,
  },
  opened: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md"
  },
  slideOutLeft: {
    type: Boolean,
    default: false,
  },
  slideOutRight: {
    type: Boolean,
    default: false,
  }
})

const { opened } = toRefs(props)

const emit = defineEmits(['update:opened', 'open', 'close'])

const animationName = computed(() => {
  if (props.slideOutLeft) {
    return "slide-left"
  }
  if (props.slideOutRight) {
    return "slide-right"
  }

  return "fade"
})

const modalBoxClass = computed(() => {
  let classString = "";

  if (props.slideOutLeft) {
    classString += "absolute left-0 top-0 bottom-0 h-full min-h-0 w-full"
  } else if (props.slideOutRight) {
    classString += "absolute right-0 top-0 bottom-0 h-full min-h-0 w-full"
  } else {
    classString += "mx-auto h-full min-h-0"
  }

  switch (props.size) {
    case "lg": {
      classString += " max-w-4xl"
      break;
    }
    case "sm": {
      classString += " max-w-md"
      break;
    }
    default: {
      classString += " max-w-lg"
      break;
    }
  }

  return classString;
})

let scrollLocked

const isSlideOut = computed(() => {
  return props.slideOutLeft || props.slideOutRight
})

watch(() => opened.value, stateChange)

function stateChange(value) {
  if (value) {
    window.addEventListener("keydown", keyPress)
    scrollLocked.value = true
  } else {
    window.removeEventListener("keydown", keyPress)
    scrollLocked.value = false
  }
}


function keyPress(e: KeyboardEvent) {
  if (e.key === "Escape" && opened.value === true) {
    e.stopPropagation()
    e.preventDefault()
    close()
  }
}



onMounted(() => {
  scrollLocked = useScrollLock(document.documentElement)
  stateChange(opened.value)
})

async function close() {
  emit('update:opened', false)
  emit('close')
}


</script>


<style lang="postcss" scoped>
.modal-backdrop {
  backdrop-filter: blur(2px);
}

.fade-enter-active {
  transition: all 200ms ease-in-out;

  .modal-backdrop {
    transition: all 100ms ease-in-out;
  }

  .modal-box {
    transition: all 200ms ease-in-out;
  }
}

.fade-leave-active {
  transition: all 50ms ease-in-out;

  .modal-backdrop {
    transition: all 50ms ease-in-out;
  }

  .modal-box {
    transition: all 50ms ease-in-out;
  }
}

.fade-enter-from {
  .modal-backdrop {
    opacity: 0;
  }

  .modal-box {
    opacity: 0;
  }
}

.fade-leave-to {
  .modal-backdrop {
    opacity: 0;
  }

  .modal-box {
    opacity: 0;
  }
}

.slide-right-enter-active,
.slide-left-enter-active {
  transition: all 150ms ease-in-out;

  .modal-backdrop {
    transition: all 150ms ease-in-out;
  }

  .modal-box {
    transition: all 150ms ease-in-out;
  }
}

.slide-right-leave-active,
.slide-left-leave-active {
  transition: all 150ms ease-in-out;

  .modal-backdrop {
    transition: all 150ms ease-in-out;
  }

  .modal-box {
    transition: all 150ms ease-in-out;
  }
}

.slide-right-enter-from {
  .modal-backdrop {
    opacity: 0;
  }

  .modal-box {
    transform: translateX(100%);
    opacity: 0;
  }
}

.slide-right-leave-to {
  .modal-backdrop {
    opacity: 0;
  }

  .modal-box {
    transform: translateX(100%);
    opacity: 0;
  }
}

.slide-left-enter-from {
  .modal-backdrop {
    opacity: 0;
  }

  .modal-box {
    transform: translateX(-100%);
    opacity: 0;
  }
}

.slide-left-leave-to {
  .modal-backdrop {
    opacity: 0;
  }

  .modal-box {
    transform: translateX(-100%);
    opacity: 0;
  }
}
</style>
