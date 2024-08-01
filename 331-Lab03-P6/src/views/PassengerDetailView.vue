<template>
    <div>
      <h1>Passenger Details</h1>
      <div v-if="passenger">
        <p>Name: {{ passenger.name }}</p>
        <p>Trips: {{ passenger.trips }}</p>
        <router-link :to="'/passenger/' + passenger._id + '/airline/' + passenger.airline.id">View Airline</router-link>
      </div>
      <div v-else>
        <p>Passenger not found.</p>
      </div>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PassengerDetailView',
    data() {
      return {
        passenger: null
      };
    },
    created() {
      const id = this.$route.params.id;
      axios.get(`https://api.instantwebtools.net/v1/passenger/${id}`)
        .then(response => {
          this.passenger = response.data;
        })
        .catch(error => {
          console.error("There was an error!", error);
          this.passenger = null;
        });
    }
  };
  </script>
  