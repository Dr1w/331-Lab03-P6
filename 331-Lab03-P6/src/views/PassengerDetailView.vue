<template>
    <div>
      <h1>Passenger Detail</h1>
      <div v-if="passenger">
        <p>Name: {{ passenger.name }}</p>
        <p>Trips: {{ passenger.trips }}</p>
        <router-link :to="'airline/' + passenger.airline[0]._id">View Airline Details</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PassengerDetailView',
    data() {
      return {
        passenger: null,
      };
    },
    created() {
      const passengerId = this.$route.params.id;
      axios.get(`https://api.instantwebtools.net/v1/passenger/${passengerId}`)
        .then(response => {
          this.passenger = response.data;
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    }
  };
  </script>
  