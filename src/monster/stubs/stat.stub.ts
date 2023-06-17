import { Stat } from 'src/entities/stat.entity';

export const statsStub = (): Stat[] => {
  return [
    {
      id: '36bdc65e-fbcf-4d55-acf6-7a23fb6ce692',
      hp: 100,
      attack: 150,
      def: 200,
      speed: 250,
    },
    {
      id: 'a573e263-3537-4dec-b861-e9f769fc2ed3',
      hp: 300,
      attack: 350,
      def: 400,
      speed: 450,
    },
    {
      id: 'af5e45b3-422b-4e5b-ab22-060300feb7a0',
      hp: 150,
      attack: 200,
      def: 250,
      speed: 300,
    },
    {
      id: '91364d2c-9b2c-4e23-80d0-e04c60848c87',
      hp: 200,
      attack: 250,
      def: 300,
      speed: 350,
    },
  ];
};
