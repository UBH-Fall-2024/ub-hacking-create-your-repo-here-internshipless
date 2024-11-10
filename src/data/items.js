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
            effects: {
                language_skill: 15,
                wisdom: 5
            },
            usable: true,
            consumable: false
        }
        //...more items
    }
