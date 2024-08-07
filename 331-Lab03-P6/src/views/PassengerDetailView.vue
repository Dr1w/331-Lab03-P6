<template>
  <div>
    <h1>Passenger Detail</h1>
    <div v-if="passenger">
      <p>Name: {{ passenger.name }}</p>
      <p>Trips: {{ passenger.trips }}</p>
      <div v-if="airline">
        <h2>Airline Details</h2>
        <p>Name: {{ airline.name }}</p>
        <p>Country: {{ airline.country }}</p>
        <img :src="airline.logo" alt="Airline Logo" v-if="airline.logo" />
      </div>
      <router-view />
      <!-- 6.1 修改编辑按钮 -->
      <button @click="editPassenger">Edit</button>
    </div>
    <div v-else>
      Loading or no data available...
    </div>
    <!-- 6.5 添加返回按钮 -->
    <button @click="goBack">Back</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePassengerStore } from '@/stores/passenger';

export default defineComponent({
  name: 'PassengerDetailView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const passengerStore = usePassengerStore();

    const passenger = passengerStore.passenger;
    const airline = passengerStore.airline;

    // 6.1 修改编辑函数
    const editPassenger = () => {
      router.push({ name: 'EditView' });
    };
    // 6.5 返回函数
    const goBack = () => {
      router.back();
    };

    return { passenger, airline, editPassenger , goBack };
  },
});
</script>
