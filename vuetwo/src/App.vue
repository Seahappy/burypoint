<!--
 * @Description: 
 * @Author: Cxy
 * @Date: 2023-05-18 09:24:21
 * @LastEditors: Cxy
 * @LastEditTime: 2023-05-31 15:23:05
 * @FilePath: \futian\pnpmft\vuetwo\src\App.vue
-->
<template>
  <div>
    <button @click="$router.push('/a')" v-BPClick:login="{ a: 123 }">a</button>
    <button @click="$router.push('/b')">b</button>
    <div>ftClick123</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$router);
  },
};
</script>