// 定义乘客类型
export interface Passenger {
    _id: string;
    name: string;
    trips: number;
    airline: { _id: string; name: string }[];
  }
  
  // 定义乘客状态类型
  export interface PassengerState {
    passenger: Passenger | null;
  }
  