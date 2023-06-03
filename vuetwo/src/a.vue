<!--
 * @Description: 
 * @Author: Cxy
 * @Date: 2023-05-18 09:46:49
 * @LastEditors: Cxy
 * @LastEditTime: 2023-05-31 15:22:39
 * @FilePath: \futian\pnpmft\vuetwo\src\a.vue
-->
<template>
  <div>a</div>
</template>

<script>
export default {
  mounted() {
    this.$BPTimePage((dp, cb) => {
      cb({ c: 1, time: dp.time });
    });
  },
};
</script>