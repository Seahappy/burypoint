<script setup lang="ts">
import { getCurrentInstance } from 'vue'

import { useRoute, useRouter } from 'vue-router';
console.log(getCurrentInstance()?.appContext);
const $BPClick = getCurrentInstance()?.appContext.config.globalProperties.$BPClick
const btn = () => $BPClick()
const $BPVisits = getCurrentInstance()?.appContext.config.globalProperties.$BPVisits
$BPVisits({ c: 1 })

const router = useRouter()
const route = useRoute()
const changeR = () => {
  router.push(route.path === '/a' ? '/b' : '/a')
}
</script>

<template>
  <div v-BPClick:login="{ a: 123 }">
    login
  </div>
  <div v-BPClick="{ a: 123 }">
    default
  </div>
  <div v-BPVisiblePage="{ a: 132432 }"></div>
  <button @click="btn">btn</button>
  <hr>
  <div @click="changeR">
    <RouterView></RouterView>
  </div>
  <div class="box">


    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div>
      <div>
        <div>
          <div style="background-color: aqua;" v-BPVisiblePage="{ a: 1 }"></div>
        </div>
      </div>
    </div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style>
.box div {
  height: 100px;
  background: #000;

}
</style>