import React from 'react'
import Navbar from '../components/NavBar'
import Characters from '../components/Characters'
import NavList from '../components/NavList'

const CharacterView = () => {
    return (
        <>
            <Navbar />
            <NavList />
            <Characters />
        </>
    )
}

export default CharacterView
