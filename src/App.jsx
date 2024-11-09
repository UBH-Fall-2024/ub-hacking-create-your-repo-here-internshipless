import React from 'react'
import './styles/global.css'
import { Button } from './components/ui/Button'
import { Clock, Heart, Book } from 'lucide-react'

function App() {
  return (
    // Main container with full screen background and centered content
    <div className="h-screen w-screen bg-gradient-to-b from-wonderland-background to-purple-100 
                    flex items-center justify-center overflow-hidden fixed inset-0">
      {/* Content wrapper with fixed width for better readability */}
      <div className="w-full max-w-xl px-4">
        {/* Title section */}
        <div className="text-center">
          <h1 className="text-6xl font-bold text-wonderland-primary 
                         mb-6 animate-fade-in">
            Alice's Wonderland
          </h1>
          <p className="text-lg text-purple-600 animate-fade-in delay-200
                        mb-12 leading-relaxed">
            Embark on a magical journey and explore unknown adventures in this
            imaginative world
          </p>
        </div>

        {/* Button group - centered with fixed width */}
        <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto">
          {/* Start Adventure button */}
          <Button 
            className="w-full h-14 text-lg bg-violet-500 hover:bg-violet-600
                       transition-all duration-300 animate-fade-in delay-300"
          >
            <Clock className="mr-2 h-5 w-5" />
            Start Adventure
          </Button>

          {/* Game Guide button */}
          <Button 
            className="w-full h-14 text-lg bg-pink-500 hover:bg-pink-600
                       transition-all duration-300 animate-fade-in delay-400"
            variant="secondary"
          >
            <Book className="mr-2 h-5 w-5" />
            Game Guide
          </Button>

          {/* About Game button */}
          <Button 
            className="w-full h-14 text-lg border-2 border-violet-400 text-violet-500
                       hover:bg-violet-50 transition-all duration-300 
                       animate-fade-in delay-500"
            variant="outline"
          >
            <Heart className="mr-2 h-5 w-5" />
            About the Game
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App