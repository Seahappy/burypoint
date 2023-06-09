<script lang="ts" setup>
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
  accountNumber: "aaaa"
})
</script>
<template>
  a
</template>