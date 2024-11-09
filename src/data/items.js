// Define items and their properties
export const items = {
        pocket_watch: {
            id: 'pocket_watch',
            name: "White Rabbit's Pocket Watch",
            description: 'A golden pocket watch with the hands running backwards.',
            type: 'tool',
            effects: {
                time_control: true,
                value: 10
            },
            usable: true,
            consumable: false
        },
        magic_book: {
            id: 'magic_book',
            name: 'Magic Book',
            description: 'A magical book that seems to enable you to understand the language of the Wonderland.',
            type: 'knowledge',
            effects: {
                language_skill: 15,
                wisdom: 5
            },
            usable: true,
            consumable: false
        }
        //...more items
    }
