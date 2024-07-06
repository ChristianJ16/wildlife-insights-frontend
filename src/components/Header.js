import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../App.css"

const Header = () => {
    const navigate = useNavigate()

    const navigateToFavorites = () => {
        navigate('/favorites')
    }

    return (
        <header className="bg-white shadow-md" style={{
          background: 'rgba(255,255,255, .7)'
      }}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="zen-tokyo-zoo-regular text-5xl text-black">
                    Wildlife Insights
                </Link>
                <button
                    onClick={navigateToFavorites}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700" style={{
                      boxShadow: '0 0 5px black'
                  }}
                >
                    Favorites
                </button>
            </div>
            <hr className="border-b" />
        </header>
    )
}

export default Header
