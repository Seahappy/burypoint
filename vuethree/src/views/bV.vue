<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const $BPTimePage = getCurrentInstance()?.appContext.config.globalProperties.$BPTimePage
$BPTimePage((dp: any, cb: Function) => {
    cb({ c: 1, time: dp.time })
})
</script>
<template>
    b
</template>