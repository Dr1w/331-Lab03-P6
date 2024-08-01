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
  import { getAirlineById } from '../services/apiService';
  import { Airline } from '../type';
  
  export default defineComponent({
    name: 'AirlineDetailView',
    setup() {
      const airline = ref<Airline | null>(null);
      const airlineId = (useRoute().params.airlineId as string);
  
      onMounted(async () => {
        try {
          airline.value = await getAirlineById(airlineId);
          if (!airline.value) {
            useRouter().push('/resource-not-found');
          }
        } catch (error) {
          console.error("There was an error!", error);
          useRouter().push('/resource-not-found');
        }
      });
  
      return {
        airline
      };
    }
  });
  </script>
  