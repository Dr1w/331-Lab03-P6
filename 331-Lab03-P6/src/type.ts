// 定义航空公司接口
export interface Airline {
    _id: string;
    name: string;
    country: string;
    logo?: string;
  }
  
  // 定义乘客接口
  export interface Passenger {
    _id: string;
    name: string;
    trips: number;
    airline: Airline[];
  }
  