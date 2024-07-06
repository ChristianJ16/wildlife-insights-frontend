import React, { useState } from 'react'
import axios from 'axios'
import AnimalCard from './AnimalCard'
import CardModal from './CardModal'
import Header from './Header'

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL

const AnimalInfo = () => {
    const [animalName, setAnimalName] = useState('')
    const [animalData, setAnimalData] = useState([])
    const [selectedAnimal, setSelectedAnimal] = useState(null)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [error, setError] = useState(null)

    const animals = [
        "Aardvark", "Alligator", "Alpaca", "Anaconda", "Ant", "Anteater", "Antelope", "Aphid", "Armadillo", "Asp", "Ass",
        "Baboon", "Badger", "Bald Eagle", "Barracuda", "Bass", "Basset Hound", "Bat", "Bearded Dragon", "Beaver", "Bedbug",
        "Bee", "Bee-eater", "Bird", "Bison", "Black panther", "Black Widow Spider", "Blue Jay", "Blue Whale", "Bobcat", 
        "Buffalo", "Buzzard", "Camel", "Canada Lynx", "Carp", "Cat", "Catfish", "Cheetah", 
        "Chicken", "Chimpanzee", "Chipmunk", "Cobra", "Cod", "Condor", "Cougar", "Cow", "Coyote", "Crab", "Crocodile", "Crow", "Cuckoo", "Deer", "Dinosaur", "Dog", "Dolphin", "Donkey", "Dove", 
        "Duck", "Eagle", "Eel", "Elephant", "Emu", "Falcon", "Ferret", "Finch", "Fish", "Flamingo", "Fox", 
        "Frog", "Goat", "Goose", "Gopher", "Gorilla", "Guinea Pig", "Hamster", "Hare", "Hawk", "Hippopotamus", "Horse", 
        "Hummingbird", "Humpback Whale", "Husky", "Iguana", "Impala", "Kangaroo", "Lemur", "Leopard", "Lion", "Lizard", 
        "Llama", "Lobster", "Margay", "Monitor lizard", "Monkey", "Moose", "Mosquito", "Moth", "Mountain Zebra", "Mouse", 
        "Mule", "Octopus", "Orca", "Ostrich", "Otter", "Owl", "Ox", "Oyster", "Panda", "Parrot", "Peacock", "Pelican", 
        "Penguin", "Perch", "Pheasant", "Pig", "Pigeon", "Polar bear", "Porcupine", "Quagga", "Rabbit", "Raccoon", "Rat", 
        "Rattlesnake", "Red Wolf", "Rooster", "Seal", "Sheep", "Skunk", "Sloth", "Snake", "Spider", "Tiger", 
        "Whale", "Wolf", "Wombat", "Zebra"
    ]

    const fetchAnimalInfo = async (name) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/animal/`, {
                params: { name: name }
            })
            setAnimalData(response.data)
            setError(null)
        } catch (err) {
            setError('No results found')
            setAnimalData([])
        }
    }

    const handleSearchClick = () => {
        fetchAnimalInfo(animalName)
    }

    const handleRandomClick = () => {
        const randomAnimalName = animals[Math.floor(Math.random() * animals.length)]
        setAnimalName(randomAnimalName)
        fetchAnimalInfo(randomAnimalName)
    }

    const openModal = (animal) => {
        setSelectedAnimal(animal)
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setSelectedAnimal(null)
        setModalIsOpen(false)
    }

    return (
        <div>
            <Header />
            <div className="container mx-auto p-4">
                <div className="flex flex-col sm:flex-row items-center justify-center mb-4 mt-36 space-y-2 sm:space-y-0 sm:space-x-2 w-full max-w-lg mx-auto">
                    <input
                        type="text"
                        value={animalName}
                        onChange={(e) => setAnimalName(e.target.value)}
                        placeholder="Enter animal name..."
                        className="border rounded p-2 w-full outline-none"
                        style={{ boxShadow: '0 0 10px black' }}
                    />
                    <button
                        onClick={handleSearchClick}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full sm:w-auto"
                        style={{ boxShadow: '0 0 10px black' }}
                    >
                        Search
                    </button>
                    <button
                        onClick={handleRandomClick}
                        className="p-2 bg-purple-500 text-white rounded hover:bg-purple-700 w-full sm:w-auto"
                        style={{ boxShadow: '0 0 10px black' }}
                    >
                        Random!
                    </button>
                </div>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {animalData.map((animal, index) => (
                        <div key={index} className="flex justify-center">
                            <AnimalCard animal={animal} onClick={openModal} />
                        </div>
                    ))}
                </div>
                <CardModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    animal={selectedAnimal}
                />
            </div>
        </div>
    )
}

export default AnimalInfo
