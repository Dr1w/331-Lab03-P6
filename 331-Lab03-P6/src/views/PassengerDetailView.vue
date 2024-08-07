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
      <!-- 6.1 添加编辑按钮 -->
      <button @click="editPassenger">Edit</button>
    </div>
    <div v-else>
      Loading or no data available...
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPassengerById, getAirlineById } from '@/services/apiService';

export default defineComponent({
  name: 'PassengerDetailView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const passenger = ref<any>(null);
    const airline = ref<any>(null);

    onMounted(async () => {
      const passengerId = route.params.id as string;

      try {
        const passengerResponse = await getPassengerById(passengerId);
        passenger.value = passengerResponse.data;

        if (passenger.value.airline.length > 0) {
          const airlineId = passenger.value.airline[0]._id;
          const airlineResponse = await getAirlineById(airlineId);
          airline.value = airlineResponse.data;
        }
      } catch (error) {
        console.error("There was an error!", error);
        router.push({ name: 'NotFound' });
      }
    });

      // 6.1 修改编辑函数
      const editPassenger = () => {
      router.push({ name: 'EditView' });
    };
    return { passenger, airline, editPassenger };
  },
});
</script>
