<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const $BPTimePage = getCurrentInstance()?.appContext.config.globalProperties.$BPTimePage
$BPTimePage((dp: any, cb: Function) => {
    cb({ c: 1, time: dp.time })
})

const $BPUpdateOptions = getCurrentInstance()?.appContext.config.globalProperties.$BPUpdateOptions
$BPUpdateOptions({
  // uniqueIDConfig: {
  //   value: "123"
  // },
  accountNumber: "asd"
})
</script>
<template>
    b
</template>