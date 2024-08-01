<template>
    <div>
      <h1>Airline Details</h1>
      <div v-if="airline">
        <p>Name: {{ airline.name }}</p>
        <p>Country: {{ airline.country }}</p>
      </div>
      <div v-else>
        <p>Airline not found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AirlineDetailView',
    data() {
      return {
        airline: null
      };
    },
    created() {
      const id = this.$route.params.airlineId;
      axios.get(`https://api.instantwebtools.net/v1/airlines/${id}`)
        .then(response => {
          this.airline = response.data;
        })
        .catch(error => {
          console.error("There was an error!", error);
          this.airline = null;
        });
    }
  };
  </script>
  