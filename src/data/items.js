// Define items and their properties
export const items = {
        pocket_watch: {
            id: 'pocket_watch',
            name: "White Rabbit's Pocket Watch",
            description: 'A golden pocket watch with the hands running backwards.',
            type: 'key_item',
            icon: '⌚',
            usable: false,
            consumable: false
        },
        magic_book: {
            id: 'magic_book',
            name: 'Magic Book',
            description: 'An ancient book containing magical knowledge.',
            type: 'knowledge',
            usable: true,
            consumable: true,
            icon : '📚',
            usable: false,
            consumable: false
        },
        health_potion: {
            id: 'health_potion',
            name: 'Health Potion',
            description: 'A magical potion that restores health.',
            icon: '🧪',
            type: 'consumable',
            usable: true,
            consumable: true,
            stackable: true,
            maxStack: 99,
            effects: {
              health: 30
            }
          },
          mushroom: {
            id: 'mushroom',
            name: 'Magic Mushroom',
            description: 'A colorful mushroom with magical properties.',
            icon: '🍄',
            type: 'consumable',
            usable: true,
            consumable: true,
            stackable: true,
            maxStack: 99,
            effects: {
              random: true,
              type: 'size',
            }
          },
        //...more items
    }
