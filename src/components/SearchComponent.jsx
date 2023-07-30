import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Grid, InputBase, IconButton, Paper, Card, Typography } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import Cards from '../common/DetailCard'

const SearchComponent = () => {
    const [results, setResults] = useState([])
    const [tableData, setTableData] = useState([])
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        axios
            .get(
                'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c20560f4d16fdd15e1d5bc655d65fdc8&hash=bf9532152981aaf1fbb3a4dbfa9f3cbd'
            )
            .then((res) => {
                setResults(res.data.data.results)
                setTableData(res.data.data.results)
            })
            .catch((error) => {
                console.log('Error fetching characters data: ', error)
            })

        axios
            .get(
                'https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=c20560f4d16fdd15e1d5bc655d65fdc8&hash=bf9532152981aaf1fbb3a4dbfa9f3cbd'
            )
            .then((res) => {
                setResults(res.data.data.results)
                setTableData(res.data.data.results)
            })
            .catch((error) => {
                console.log('Error fetching comics data: ', error)
            })
    }, [])

    const handleChange = (e) => {
        e.preventDefault()
        setSearchText(e.target.value)
        filterResults(e.target.value)
    }

    const filterResults = (keyword) => {
        let filteredResults = tableData.filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()))
        setResults(filteredResults)
    }

    return (
        <div className="containerInput">
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                <InputBase value={searchText} placeholder="Nombre" onChange={handleChange} sx={{ ml: 1, flex: 1 }} />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <Grid container rowSpacing={4}>
                {results.map((item, id) => (
                    <Grid item key={id} md={4}>
                        <Card>
                            <Typography>{item.title}</Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default SearchComponent
