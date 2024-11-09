export const scenes = [
    {
      id: 'rabbit_hole',
      title: 'The Mysterious Rabbit Hole',
      description: 'A peculiar white rabbit dashes past you, checking its pocket watch anxiously. The rabbit disappears down a rather large hole beneath a hedge.',
      background: 'rabbit_hole_bg',
      choices: [
        {
          text: 'Follow the White Rabbit down the hole',
          nextScene: 'falling',
          effect: {
            health: -5,
            items: ['pocket_watch'],
            achievement: 'curious_soul'
          }
        },
        {
          text: 'Examine the area around the hole first',
          nextScene: 'hole_exterior',
          effect: {
            items: ['mushroom']
          }
        }
      ]
    },
    {
      id: 'falling',
      title: 'The Long Fall',
      description: "You're falling down what seems to be an impossibly deep hole. Strange objects float past you: books, teacups, maps, and paintings. The walls are lined with cupboards and bookshelves.",
      background: 'falling_bg',
      choices: [
        {
          text: 'Grab a floating book',
          nextScene: 'reading_fall',
          effect: {
            items: ['magic_book']
          }
        },
        {
          text: 'Try to slow your fall by grabbing the walls',
          nextScene: 'slow_fall',
          effect: {
            health: -10
          }
        },
        {
          text: 'Let yourself fall freely',
          nextScene: 'bottom_hall',
          requirements: {
            health: 50
          }
        }
      ]
    },
    {
      id: 'hole_exterior',
      title: 'Around the Rabbit Hole',
      description: 'The area around the rabbit hole is dotted with unusual mushrooms and flowers. A faint ticking sound emanates from below.',
      background: 'garden_bg',
      choices: [
        {
          text: 'Now follow the rabbit',
          nextScene: 'falling',
          effect: {
            items: ['courage_badge']
          }
        },
        {
          text: 'Return to the garden path',
          nextScene: 'garden_path',
          effect: {
            health: 5
          }
        }
      ]
    }
    // More scenes...
  ];