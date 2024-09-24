<template>
  <van-nav-bar left-arrow :title="props.title" @click-left="onClickLeft" />
</template>

<script setup>
const props = defineProps(['title'])
function onClickLeft() {
  history.back()
}
</script>

<style>
.van-nav-bar__left {
  padding-left: 11px;
}

/* .van-nav-bar__title {
    font-size: 19px;
  } */

/* .van-nav-bar .van-icon {
    font-size: 18px;
    color: #000;
  } */
</style>
