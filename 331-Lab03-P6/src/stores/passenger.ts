import type { PassengerState, Passenger } from "@/types"; // 定义 PassengerState 和 Passenger
import { defineStore } from "pinia";

export const usePassengerStore = defineStore('passenger', {
  state: (): PassengerState => ({
    passenger: null,
    airline: null
  }),
  actions: {
    setPassenger(passenger: Passenger): void {
      this.passenger = passenger;
    },
    clearPassenger(): void {
      this.passenger = null;
    },
    setAirline(airline: any): void {
      this.airline = airline;
    }
  }
});
