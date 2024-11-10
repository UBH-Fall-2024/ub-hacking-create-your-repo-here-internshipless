// Define achievements and their unlock conditions
export const achievements = {
        curious_soul: {
            id: 'curious_soul',
            name: 'Curious Soul',
            description: 'Enter the rabbit hole for the first time with the rabbit',
            icon: 'rabbit_icon',
            requirements: {
                scene: 'falling',
                action: 'enter'
            },
            icon: '🐇',
        },
        collector: {
            id: 'collector',
            name: 'Collector',
            description: 'Collect more than 10 items',
            icon: '📦',
            requirements: {
                items: 10,
                type: 'count'
            }
        },
        healer: {
            id: 'healer',
            name: 'Healer',
            description: 'Use the healing potion',
            icon: '🧪',
            requirements: {
                item: 'healing_potion',
                action: 'use'
            }
        },
        explorer: {
            id: 'explorer',
            name: 'Explorer',
            description: 'Visit 5 different scenes',
            icon: '🗺️',
            requirements: {
                scenes: 5,
                type: 'count'
            }
        },

    }
    //... more achievements
