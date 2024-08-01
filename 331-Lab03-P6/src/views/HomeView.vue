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

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      passengers: []
    };
  },
  created() {
    axios.get('https://api.instantwebtools.net/v1/passenger')
      .then(response => {
        this.passengers = response.data.data;
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
  }
};
</script>
