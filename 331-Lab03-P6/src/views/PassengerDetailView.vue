<template>
    <div>
      <h1>Passenger Detail</h1>
      <div v-if="passenger">
        <p>Name: {{ passenger.name }}</p>
        <p>Trips: {{ passenger.trips }}</p>
        <router-view />
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { getPassengerById } from '../services/apiService';
  import { Passenger } from '../type';
  
  export default defineComponent({
    name: 'PassengerDetailView',
    setup() {
      const passenger = ref<Passenger | null>(null);
      const passengerId = (useRoute().params.id as string);
  
      onMounted(async () => {
        try {
          passenger.value = await getPassengerById(passengerId);
          if (!passenger.value) {
            useRouter().push('/resource-not-found');
          }
        } catch (error) {
          console.error("There was an error!", error);
          useRouter().push('/resource-not-found');
        }
      });
  
      return {
        passenger
      };
    }
  });
  </script>
  