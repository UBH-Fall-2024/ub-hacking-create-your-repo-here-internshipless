// Define the game scenes data structure
export const scenes = [
        {
            id: 'rabbit_hole',
            title: 'Mysterious Rabbit Hole',
            description: 'You have discovered a mysterious rabbit hole, and a white rabbit is frantically running past. Do you want to follow it and jump down?',
            background: 'rabbit_hole_bg',
            choices: [
                {
                    text: 'Follow the white rabbit',
                    nextScene: 'falling',
                    effect: {
                        health: -5,
                        items: ['pocket_watch'],
                        achievement: 'curious_soul'
                    }
                },
                {
                    text: 'Observe the surroundings',
                    nextScene: 'garden',
                    effect: {
                        items: ['flower']
                    }
                }
            ],
            requirements: null
        },
        {
            id: 'falling',
            title: 'The Long Fall',
            description: 'You are slowly descending in the rabbit hole, surrounded by various strange objects...',
            background: 'falling_bg',
            choices: [
                {
                    text: 'Grab the floating book',
                    nextScene: 'library',
                    effect: {
                        items: ['magic_book'],
                        knowledge: 10
                    },
                    requirements: {
                        health: 50
                    }
                },
                {
                    text: 'Attempt to control the descent speed',
                    nextScene: 'bottom_hall',
                    effect: {
                        health: -10,
                        skills: ['floating']
                    }
                }
            ]
        }
        // More scenes...
    ]
