import { Monster } from 'src/entities/monster.entity';
import { CreateMonsterDto } from '../dto/create-monster.dto';

export const monstersStub = (): Monster[] => {
  return [
    {
      id: '81fa9ca6-4dab-4f4a-9691-acb622fd358c',
      name: 'Chikorita',
      description: 'desc Chikorita',
      baseType: {
        id: '144fa5b5-909f-4371-a63a-d2c6b6440644',
        name: 'Leaf Monster',
        monsters: [],
      },
      monsterTypes: [
        {
          id: '1ce00fdd-b607-4674-9d1e-b33f672d36c1',
          name: 'GRASS',
          monsters: [],
        },
      ],
      hp: 100,
      attack: 150,
      def: 200,
      speed: 250,
      catched: false,
    },
    {
      id: 'd46940a3-204c-444b-9ae1-982661273595',
      name: 'Lugia',
      description: 'desc Lugia',
      baseType: {
        id: 'a25e4f80-248b-43eb-bfb8-aa9b72d4ff88',
        name: 'Diving Monster',
        monsters: [],
      },
      monsterTypes: [
        {
          id: 'b559050d-d70f-494c-a5ff-6e2a8cd85727',
          name: 'FLYING',
          monsters: [],
        },
        {
          id: 'c2f63136-a2c7-415f-b302-a54f2cf8b6c3',
          name: 'PHYSIC',
          monsters: [],
        },
      ],
      hp: 300,
      attack: 350,
      def: 400,
      speed: 450,
      catched: false,
    },
    {
      id: 'c6241c21-0d1e-4994-8675-995ea0bc27c6',
      name: 'Charmander',
      description: 'desc Charmander',
      baseType: {
        id: '6fd47426-08a3-41c2-a5f5-1365ea11c667',
        name: 'Lizard Monster',
        monsters: [],
      },
      monsterTypes: [
        {
          id: '68e478a2-f3c3-4876-a797-e2d11eaf510d',
          name: 'FIRE',
          monsters: [],
        },
      ],
      hp: 150,
      attack: 200,
      def: 250,
      speed: 300,
      catched: false,
    },
    {
      id: '90b53457-1f27-456d-ba01-937bd1c089de',
      name: 'Dragonite',
      description: 'desc Dragonite',
      baseType: {
        id: 'a25e4f80-248b-43eb-bfb8-aa9b72d4ff88',
        name: 'Diving Monster',
        monsters: [],
      },
      monsterTypes: [
        {
          id: 'a28722e3-2ef2-4038-9c7e-18010bd8b44f',
          name: 'DRAGON',
          monsters: [],
        },
        {
          id: 'b559050d-d70f-494c-a5ff-6e2a8cd85727',
          name: 'FLYING',
          monsters: [],
        },
      ],
      hp: 200,
      attack: 250,
      def: 300,
      speed: 350,
      catched: false,
    },
  ];
};

export const inputMonsterStub = (): CreateMonsterDto => ({
  name: 'Chikorita',
  description: 'desc Chikorita',
  baseType: '144fa5b5-909f-4371-a63a-d2c6b6440644',
  monsterTypes: ['1ce00fdd-b607-4674-9d1e-b33f672d36c1'],
  hp: 100,
  attack: 150,
  def: 200,
  speed: 250,
});

export const monstersWithCatchStub = (): Monster[] => {
  return [
    {
      id: '81fa9ca6-4dab-4f4a-9691-acb622fd358c',
      name: 'Chikorita',
      description: 'desc Chikorita',
      baseType: {
        id: '144fa5b5-909f-4371-a63a-d2c6b6440644',
        name: 'Leaf Monster',
        monsters: [],
      },
      monsterTypes: [
        {
          id: '1ce00fdd-b607-4674-9d1e-b33f672d36c1',
          name: 'GRASS',
          monsters: [],
        },
      ],
      hp: 100,
      attack: 150,
      def: 200,
      speed: 250,
      catched: true,
    },
    {
      id: 'd46940a3-204c-444b-9ae1-982661273595',
      name: 'Lugia',
      description: 'desc Lugia',
      baseType: {
        id: 'a25e4f80-248b-43eb-bfb8-aa9b72d4ff88',
        name: 'Diving Monster',
        monsters: [],
      },
      monsterTypes: [
        {
          id: 'b559050d-d70f-494c-a5ff-6e2a8cd85727',
          name: 'FLYING',
          monsters: [],
        },
        {
          id: 'c2f63136-a2c7-415f-b302-a54f2cf8b6c3',
          name: 'PHYSIC',
          monsters: [],
        },
      ],
      hp: 300,
      attack: 350,
      def: 400,
      speed: 450,
      catched: false,
    },
    {
      id: 'c6241c21-0d1e-4994-8675-995ea0bc27c6',
      name: 'Charmander',
      description: 'desc Charmander',
      baseType: {
        id: '6fd47426-08a3-41c2-a5f5-1365ea11c667',
        name: 'Lizard Monster',
        monsters: [],
      },
      monsterTypes: [
        {
          id: '68e478a2-f3c3-4876-a797-e2d11eaf510d',
          name: 'FIRE',
          monsters: [],
        },
      ],
      hp: 150,
      attack: 200,
      def: 250,
      speed: 300,
      catched: false,
    },
    {
      id: '90b53457-1f27-456d-ba01-937bd1c089de',
      name: 'Dragonite',
      description: 'desc Dragonite',
      baseType: {
        id: 'a25e4f80-248b-43eb-bfb8-aa9b72d4ff88',
        name: 'Diving Monster',
        monsters: [],
      },
      monsterTypes: [
        {
          id: 'a28722e3-2ef2-4038-9c7e-18010bd8b44f',
          name: 'DRAGON',
          monsters: [],
        },
        {
          id: 'b559050d-d70f-494c-a5ff-6e2a8cd85727',
          name: 'FLYING',
          monsters: [],
        },
      ],
      hp: 200,
      attack: 250,
      def: 300,
      speed: 350,
      catched: false,
    },
  ];
};
