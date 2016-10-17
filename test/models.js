/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Schema } from 'mongoose';

export const StoreModel = mongoose.model('Store', new Schema({
  joinDate: Date,
  name: String,
  no: Number,
  placeId: String,
}));

export const StoreType = `type Store {
  _id: String
  joinDate: Float
  name: String
  no: Float
  placeId: String
}`;

export const OrderModel = mongoose.model('Order', new Schema({
  name: String,
  location: {
    deliveryInstructions: String,
    placeId: String,
  },
  // TODO
  // store: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'patient',
  // },
  // TODO
  // type: {
  //   type: String,
  //   enum: ['DELIVERY', 'PICKUP'],
  //   required: 'Order type is required.',
  // },
}));

export const OrderTypes = `type OrderLocation {
  deliveryInstructions: String
  placeId: String
}
type Order {
  _id: String
  location: OrderLocation
  name: String
}`;
