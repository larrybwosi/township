export class Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'apartment' | 'house' | 'villa' | 'land';
  status: 'available' | 'sold' | 'rented';
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}
