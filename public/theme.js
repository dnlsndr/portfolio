
console.log("test");

if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
  console.log("init light");
  document.documentElement.classList.remove('dark')
  // document.documentElement.style.setProperty("color-scheme", "light")
} else {
  console.log("init dark");
  document.documentElement.classList.add('dark')
  // document.documentElement.style.setProperty("color-scheme", "dark")
}