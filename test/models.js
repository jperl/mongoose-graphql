import mongoose, { Schema } from 'mongoose';

export const LocationModel = mongoose.model('Location', new Schema({
  name: String,
  placeId: String,
}));

export const locationTypeString =
  `type Location {
  _id: String
  name: String
  placeId: String
}`;

export const OrderModel = mongoose.model('Order', new Schema({
  name: String,
  location: {
    locationId: String,
    instructions: String,
  },
  type: {
    type: String,
    enum: ['DELIVERY', 'PICKUP'],
    required: 'Order type is required.',
  }
}));
