<template>
  <div>
    <h1>Passenger List</h1>
    <ul>
      <li v-for="passenger in passengers" :key="passenger._id">
        <router-link :to="'/passenger/' + passenger._id">{{ passenger.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getPassengers } from '../services/apiService';
import { Passenger } from '../type';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const passengers = ref<Passenger[]>([]);

    onMounted(async () => {
      try {
        passengers.value = await getPassengers();
      } catch (error) {
        console.error("There was an error!", error);
      }
    });

    return {
      passengers
    };
  }
});
</script>
