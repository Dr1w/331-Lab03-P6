<template>
    <div>
      <h1>Airline Detail</h1>
      <div v-if="airline">
        <p>Name: {{ airline.name }}</p>
        <p>Country: {{ airline.country }}</p>
        <img :src="airline.logo" alt="Logo" v-if="airline.logo" />
      </div>
      <div v-else>
        Airline information not available or loading...
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { getAirlineById } from '@/services/apiService';
  
  export default defineComponent({
    name: 'AirlineDetailView',
    setup() {
      const route = useRoute();
      const airline = ref<any>(null);
  
      onMounted(async () => {
        const airlineId = route.params.airlineId as string;
  
        try {
          const response = await getAirlineById(airlineId);
          airline.value = response.data;
        } catch (error) {
          console.error("There was an error!", error);
        }
      });
  
      return { airline };
    },
  });
  </script>
  