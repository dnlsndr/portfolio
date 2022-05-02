<template>

  <Head>
    <Link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    <Meta name="theme-color" content="#121212" />
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
    <!-- <NavigationMenu slide-out-left v-model:opened="menuOpen">

    </NavigationMenu> -->
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
        <div class="font-outfit text-xl">
          dnlsndr

        </div>
        <!-- <div @click="menuOpen = !menuOpen" class="
            cursor-pointer
            w-8
            h-8
            flex
            justify-center
            items-center
            rounded-full
          ">
          <ph-hamburger size="24" weight="light" />
        </div> -->
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
          <transition name="scale" mode="out-in">
            <PhSunHorizon key="undefined"
              v-if="themeReady && theme === undefined" size="24"
              weight="light" />
            <PhSun key="dark" v-else-if="themeReady && theme === 'dark'"
              size="24" weight="light" />
            <PhMoon key="light" v-else-if="themeReady && theme === 'light'"
              size="24" weight="light" />
          </transition>
        </div>
      </div>

      <section class="mb-16">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
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
  PhSunHorizon
} from '@dnlsndr/vue-phosphor-icons'
import Separator from '@/components/Separator.vue'

let theme = ref(undefined)
let themeReady = ref(false)

useHead({
  script: [
    {
      src: "/theme.js"
    }
  ]
})

let menuOpen = ref(false)

onMounted(() => {
  if (localStorage.theme) {
    theme.value = localStorage.theme
  }
  themeReady.value = true
})


function setDarkTheme(value: boolean) {
  if (value) {
    localStorage.theme = 'dark'
    document.documentElement.classList.add('dark')
    theme.value = 'dark'
  } else {
    localStorage.theme = 'light'
    document.documentElement.classList.remove('dark')
    theme.value = 'light'
  }
}

const toggleTheme = () => {
  if (!('theme' in localStorage)) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkTheme(false)
    } else {
      setDarkTheme(true)
    }
    return
  }

  if (localStorage.theme === 'dark') {
    setDarkTheme(false)
  } else {
    setDarkTheme(true)
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