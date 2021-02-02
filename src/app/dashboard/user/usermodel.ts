export interface User {
  menu: Menu[];
  status: String;
  role: String;
  ownerType: String;
  purchases: any[];
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string;
  resturant_id?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  subscriptions?: Object;
  passwordConfirm?: string;
  resetPasswordExpire?: string;
  resetPasswordToken?: string;
  gst?: boolean;
}

export interface Menu {
  rating: number;
  categoryimg: string;
  options: [];
  status: String;
  _id: string;
  name: string;
  category?: string;
  price: number;
  resturant_id: String;
  photo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

