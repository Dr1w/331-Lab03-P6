<template>
    <div>
      <h1>Edit Event Here</h1>
      <!-- 6.2 添加按钮 -->
      <button @click="editPassenger">Edit Passenger</button>
      <!-- 6.2 显示闪烁消息 -->
      <div v-if="flashMessage" class="flash-message">{{ flashMessage }}</div>
        <!-- 6.5 添加返回按钮 -->
        <button @click="goBack">Back</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'EditView',
    setup() {
      const router = useRouter();
      const flashMessage = ref<string | null>(null);
  
      // 6.2 编辑函数
      const editPassenger = () => {
        flashMessage.value = 'Start Update In Progress'; // 显示闪烁消息
        setTimeout(() => {
          flashMessage.value = null;
          router.push({ name: 'home' }); // 跳转到 HomeView
        }, 5000); // 5秒后重定向
      };
      const goBack = () => {
      router.back();
    };
      return { editPassenger, flashMessage, goBack };
    },
  });
  </script>
  
  <style scoped>
  .flash-message {
    background-color: yellow;
    padding: 10px;
    margin-top: 20px;
    text-align: center;
  }
  </style>
  