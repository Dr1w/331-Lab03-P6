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

<script>
import axios from 'axios';

export default {
  name: 'AirlineDetailView',
  data() {
    return {
      airline: null,
    };
  },
  created() {
    const airlineId = this.$route.params.airlineId;
    axios.get(`https://api.instantwebtools.net/v1/airlines/${airlineId}`)
      .then(response => {
        this.airline = response.data;
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
  }
};
</script>
