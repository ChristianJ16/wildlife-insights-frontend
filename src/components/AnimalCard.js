import React from 'react'

const AnimalCard = ({ animal, onClick }) => {
    const { name } = animal

    return (
        <div
            className="animal-card w-64 h-32 p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer flex items-center justify-center"
            style={{
                background: 'rgba(0,0,0, 0.5)'
            }}
            onClick={() => onClick(animal)}
        >
            <h2 className="text-white text-3xl font-semibold text-center" style={{
                textShadow: '0 0 5px black'
            }}
            
            >{name}</h2>
        </div>
    )
}

export default AnimalCard

