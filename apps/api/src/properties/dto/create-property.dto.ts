export class CreatePropertyDto {
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'apartment' | 'house' | 'villa' | 'land';
}
