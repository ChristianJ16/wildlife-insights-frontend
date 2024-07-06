import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CardModal from './CardModal'
import Header from './Header'

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL

const FavoriteLists = () => {
    const [favoriteLists, setFavoriteLists] = useState([])
    const [selectedList, setSelectedList] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [editListName, setEditListName] = useState('')
    const [newListName, setNewListName] = useState('')
    const [creatingList, setCreatingList] = useState(false)
    const [selectedAnimal, setSelectedAnimal] = useState(null)

    useEffect(() => {
        fetchFavoriteLists()
    }, [])

    const fetchFavoriteLists = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/favorite-lists/`)
            setFavoriteLists(response.data)
        } catch (error) {
            console.error('Error fetching favorite lists:', error)
        }
    }

    const handleClickList = (list) => {
        if (selectedList && selectedList.id === list.id) {
            setSelectedList(null)
        } else {
            setSelectedList(list)
            setEditMode(false)
        }
    }

    const handleEditClick = (list) => {
        setSelectedList(list)
        setEditListName(list.name)
        setEditMode(true)
    }

    const handleEditChange = (event) => {
        setEditListName(event.target.value)
    }

    const handleEditSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.put(`${API_BASE_URL}/api/favorite-lists/${selectedList.id}/`, { name: editListName })
            fetchFavoriteLists()
            setSelectedList(null)
            setEditMode(false)
        } catch (error) {
            console.error('Error updating favorite list:', error)
        }
    }

    const handleDeleteClick = async (listId) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/favorite-lists/${listId}/`)
            fetchFavoriteLists()
        } catch (error) {
            console.error('Error deleting favorite list:', error)
        }
    }

    const handleCreateList = async () => {
        if (!newListName.trim()) return

        try {
            await axios.post(`${API_BASE_URL}/api/favorite-lists/`, { name: newListName })
            setCreatingList(false)
            setNewListName('')
            fetchFavoriteLists()
        } catch (error) {
            console.error('Error creating new list:', error)
        }
    }

    const openModal = async (animalName) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/animal/?name=${encodeURIComponent(animalName)}`)
            setSelectedAnimal(response.data[0])
        } catch (error) {
            console.error('Error fetching animal details:', error)
        }
    }

    const closeModal = () => {
        setSelectedAnimal(null)
    }

    return (
        <div>
            <Header />
            <div className="flex justify-center">
                <div className="w-full max-w-3xl p-4">
                    <h1 className="text-5xl font-bold mb-4 mt-40 text-center text-white" style={{
                textShadow: '0 0 10px black'
            }}>Favorites</h1>
                    <div className="flex justify-center mb-4">
                        <button
                            onClick={() => setCreatingList(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"style={{
                                boxShadow: '0 0 10px black'
                            }}
                        >
                            Create New
                        </button>
                    </div>
                    {creatingList && (
                        <div className="flex justify-center mb-4">
                            <input
                                type="text"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                placeholder="Enter list name"
                                className="border rounded px-4 py-2 mr-2"style={{
                                    boxShadow: '0 0 10px black'
                                }}
                            />
                            <button
                                onClick={handleCreateList}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-2"style={{
                                    boxShadow: '0 0 10px black'
                                }}
                            >
                                Create
                            </button>
                            <button
                                onClick={() => setCreatingList(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"style={{
                                    boxShadow: '0 0 10px black'
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                    <ul className="space-y-4">
                        {favoriteLists.map((list) => (
                            <li key={list.id} className="border p-4 rounded bg-white" 
                            style={{
                                background: 'rgba(0,0,0, 0.5)',
                                boxShadow: '0 0 5px black'
                            }}>
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => handleClickList(list)}
                                        className="text-2xl font-bold text-white underline"
                                    >
                                        {list.name}
                                    </button>
                                    <div>
                                        <button
                                            onClick={() => handleEditClick(list)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-700 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(list.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                {selectedList && selectedList.id === list.id && (
                                    <div className="mt-4">
                                        <ul className="space-y-2">
                                            {list.animals.map((animal) => (
                                                <li key={animal.id}>
                                                    <button
                                                        onClick={() => openModal(animal.name)}
                                                        className="text-white hover:underline"
                                                    >
                                                        {animal.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    {selectedList && editMode && (
                        <form onSubmit={handleEditSubmit} className="mt-4 flex justify-center">
                            <input
                                type="text"
                                value={editListName}
                                onChange={handleEditChange}
                                placeholder="Edit list name"
                                className="border rounded px-4 py-2 mr-2"style={{
                                    boxShadow: '0 0 10px black'
                                }}
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"style={{
                                    boxShadow: '0 0 10px black'
                                }}
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setSelectedList(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"style={{
                                    boxShadow: '0 0 10px black'
                                }}
                            >
                                Cancel
                            </button>
                        </form>
                    )}
                    <CardModal isOpen={selectedAnimal !== null} onRequestClose={closeModal} animal={selectedAnimal} />
                </div>
            </div>
        </div>
    )
}

export default FavoriteLists
