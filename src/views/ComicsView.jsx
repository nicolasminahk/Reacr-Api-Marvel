import React from 'react'
import Navbar from '../components/NavBar'
import Comics from '../components/Comics'
import NavList from '../components/NavList'

const ComicsView = () => {
    return (
        <div>
            <Navbar />
            <NavList />
            <Comics />
        </div>
    )
}

export default ComicsView
