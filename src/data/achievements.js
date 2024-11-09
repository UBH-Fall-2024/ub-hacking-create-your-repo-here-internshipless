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
            }
        },
        collector: {
            id: 'collector',
            name: 'Collector',
            description: 'Collect more than 10 items',
            icon: 'chest_icon',
            requirements: {
                items: 10,
                type: 'count'
            }
        }
    }
    //... more achievements
