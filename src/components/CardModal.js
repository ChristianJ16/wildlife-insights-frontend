import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import axios from 'axios'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '500px',
    },
}

const API_BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/`

const CardModal = ({ isOpen, onRequestClose, animal }) => {
    const [favoriteLists, setFavoriteLists] = useState([])
    const [selectedList, setSelectedList] = useState('')

    useEffect(() => {
        if (isOpen) {
            fetchFavoriteLists()
        }
    }, [isOpen])

    const fetchFavoriteLists = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}favorite-lists/`)
            setFavoriteLists(response.data)
        } catch (error) {
            console.error('Error fetching favorite lists:', error)
        }
    }

    const handleAddToFavorites = async () => {
        if (!selectedList) return

        try {
            const response = await axios.post(`${API_BASE_URL}favorite-lists/${selectedList}/add-animal/`, { animal })
            if (response.status === 200) {
                console.log('Animal added to favorites!')
                onRequestClose()
            }
        } catch (error) {
            console.error('Error adding animal to favorites:', error)
        }
    }

    if (!animal) return null

    const { name, characteristics } = animal
    const { weight, habitat, diet, top_speed, skin_type, slogan, lifespan, biggest_threat, group } = characteristics

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Animal Details"
            appElement={document.getElementById('root')}
        >
            <div className="p-4 text-black text-lg font-semibold rounded bg-cover bg-center"style={{
            backgroundImage: `url("https://cdn.pixabay.com/photo/2016/03/27/19/15/bamboo-1283766_1280.jpg")`
        }}>
                <h2 className="text-2xl font-bold mb-4 underline">{name}</h2>
                <p className="mb-2"><strong>Slogan:</strong> {slogan}</p>
                <p className="mb-2"><strong>Weight:</strong> {weight}</p>
                <p className="mb-2"><strong>Group:</strong> {group}</p>
                <p className="mb-2"><strong>Habitat:</strong> {habitat}</p>
                <p className="mb-2"><strong>Diet:</strong> {diet}</p>
                <p className="mb-2"><strong>Top Speed:</strong> {top_speed}</p>
                <p className="mb-2"><strong>Skin Type:</strong> {skin_type}</p>
                <p className="mb-2"><strong>Life Span:</strong> {lifespan}</p>
                <p className="mb-2"><strong>Biggest Threat:</strong> {biggest_threat}</p>
                
                <select
                    value={selectedList}
                    onChange={(e) => setSelectedList(e.target.value)}
                    className="border rounded px-4 py-2 mb-4 w-full text-black font-normal"
                >
                    <option value="">Select a list</option>
                    {favoriteLists.map((list) => (
                        <option key={list.id} value={list.id}>{list.name}</option>
                    ))}
                </select>
                <div className="flex justify-between">
                    <button
                        onClick={handleAddToFavorites}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"style={{
                            boxShadow: '0 0 5px black'
                        }}
                    >
                        Add to Favorites
                    </button>
                    <button
                        onClick={onRequestClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"style={{
                            boxShadow: '0 0 5px black'
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default CardModal
