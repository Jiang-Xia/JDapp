<template>
  <van-uploader
    class="s-uploader"
    :class="{ 's-customer-position': customerPosition }"
    upload-icon="add"
    v-model="fileList"
    :after-read="afterRead"
    :max-count="maxCount"
    @delete="deleteHandle"
  >
  </van-uploader>
</template>

<script setup>
import { http } from '@/utils/request'
import { ref } from 'vue'
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  maxCount: {
    type: Number,
    default: 1
  },
  customerPosition: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:modelValue'])
const fileList = ref([])
if (props.modelValue.length) {
  fileList.value = props.modelValue
}
const afterRead = async (files) => {
  // 此时可以自行将文件上传至服务器
  console.log('======>', files)
  const res = await http.request({
    url: '/mobile/file/upload',
    method: 'post'
    // data: file.file // 正式环境需取消注释
  })
  fileList.value.find((v) => v.objectUrl === files.objectUrl).url = res
  // console.log('fileList ======>',fileList.value);
  emits('update:modelValue', fileList.value)
}

const deleteHandle = () => {
  // console.log('deleteHandle fileList ======>',fileList.value);
  emits('update:modelValue', fileList.value)
}
</script>

<style lang="less">
.van-nav-bar__left {
  padding-left: 11px;
}
.van-uploader__upload-icon {
  color: #ff7e17;
  /* color: #ff6815; */
  padding: 18px 44px;
  border-radius: 6px;
  background-color: #fff;
}
.s-uploader {
  width: 100%;
  .van-uploader__wrapper {
    width: 100%;
  }
  .van-uploader__preview,
  .van-uploader__upload {
    width: 100%;
    margin-right: 0px;
  }
  .van-uploader__preview-image {
    width: 100%;
  }
}
.s-customer-position {
  position: relative;
  .van-uploader__upload {
    height: 25px;
    width: 25px;
    position: absolute;
    top: -30px;
    right: 0;
    z-index: 99;
  }
  .van-uploader__upload-icon {
    color: #ff7e17;
    padding: 0;
  }
}
</style>
