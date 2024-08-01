<template>
  <div>
    <h1>Passenger List</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="passenger in passengers" :key="passenger._id">
        <router-link :to="{ name: 'PassengerDetail', params: { id: passenger._id } }">
          {{ passenger.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getPassengers } from '@/services/apiService';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const passengers = ref<any[]>([]);
    const error = ref<string | null>(null);

    onMounted(async () => {
      try {
        const response = await getPassengers();
        passengers.value = response.data.data; // 处理分页数据，确保根据实际 API 响应结构进行调整
      } catch (err) {
        error.value = (err as Error).message;
        console.error("There was an error!", err);
      }
    });

    return { passengers, error };
  },
});
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>
