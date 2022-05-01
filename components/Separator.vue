<template>
	<div v-if="!slots.default"
		class="flex-shrink-0 bg-gray-200 dark:bg-gray-800 transition-colors duration-200"
		:class="[vert ? 'w-px self-stretch' : 'h-px w-full']"></div>
	<div v-else class="flex items-center">
		<div :class="[
			'bg-gray-200 dark:bg-gray-800 transition-colors duration-200 flex-1',
			vert ? 'w-px self-stretch' : 'h-px w-full',
		]"></div>
		<div
			class="flex-shrink-0 px-2 text-gray-400 dark:text-gray-600 transition-colors duration-200">
			<slot />
		</div>
		<div :class="[
			'bg-gray-200 dark:bg-gray-800 transition-colors duration-200 flex-1',
			vert ? 'w-px self-stretch' : 'h-px w-full',
		]"></div>
	</div>
</template>

<script lang="ts" setup>

let slots = useSlots()

defineProps({
	vert: {
		type: Boolean,
		default: false,
	},
})
</script>
