<template>

  <Head>
    <Meta name="theme-color" :content="themeColor" />
  </Head>

  <div class="
      min-h-screen
      p-8
      lg:p-12
      bg-white
      dark:bg-gray-1000
      transition-colors
      duration-200
      text-gray-500
      dark:text-gray-400
    ">
    <NavigationMenu v-model:opened="menuOpen">

      test</NavigationMenu>
    <div class="max-w-screen-lg mx-auto">
      <div class="
          mb-16
          flex
          justify-between
          text-gray-800
          dark:text-gray-100
          transition-colors
          duration-200
        ">
        <div @click="menuOpen = !menuOpen" class="
            cursor-pointer
            w-8
            h-8
            flex
            justify-center
            items-center
            rounded-full
          ">
          <ph-hamburger size="24" weight="light" />
        </div>
        <div @click="toggleTheme()" class="
            cursor-pointer
            ml-auto
            w-8
            h-8
            flex
            justify-center
            items-center
            rounded-full
          ">
          <transition v-if="theme !== undefined" name="scale" mode="out-in">
            <ph-sun key="dark" v-if="theme === 'dark'" size="24"
              weight="light" />
            <ph-moon key="light" v-else size="24" weight="light" />
          </transition>
        </div>
      </div>

      <section class="mb-16">
        <slot />
      </section>
      <separator class="mb-16" />

      <div class="
          font-medium
          mb-4
          text-gray-700
          dark:text-gray-200
          transition-colors
          duration-200
        ">
        Important notes
      </div>
      <div class="mb-8">Don't forget to drink enough water</div>
      <div class="
          flex
          items-center
          space-x-2
          text-gray-900
          dark:text-white
          transition-colors
          duration-200
        ">
        <div>Made with</div>
        <ph-heart size="20" weight="fill" class="text-red-400" />
        <div>in Munich</div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {
  PhHeart,
  PhHamburger,
  PhSun,
  PhMoon,
} from '@dnlsndr/vue-phosphor-icons'
import Separator from '@/components/Separator.vue'

let theme = ref(undefined)

let themeColor = computed(() => {
  if (theme.value === "dark") {
    return "#121212"
  } else {
    return "#ffffff"
  }
})

useHead({
  script: [
    {
      src: "/theme.js"
    }
  ]
})

let menuOpen = ref(false)

onMounted(() => {
  if (window.localStorage.theme) {
    theme.value = window.localStorage.theme
  } else {
    theme.value = "dark"
    localStorage.theme = 'dark'
  }
})

const toggleTheme = () => {
  if (localStorage.theme === 'dark') {
    console.log("setting light");
    localStorage.theme = 'light'
    document.documentElement.classList.remove('dark')
    theme.value = 'light'
  } else {
    console.log("setting dark");
    localStorage.theme = 'dark'
    document.documentElement.classList.add('dark')


    theme.value = 'dark'
  }
}

</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.1s ease-out;
}

.scale-enter,
.scale-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>