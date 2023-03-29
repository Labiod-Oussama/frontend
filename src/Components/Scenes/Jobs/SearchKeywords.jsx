import { Box, Chip, ListItem, Paper, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid';
function SearchKeywords({ Search ,handleShowKeywords,handleSearchKeywords}) {
    const [SearchKeys, setSearchKeys] = useState(Search)
    useEffect(() => {
        setSearchKeys(Search)
    }, [Search])
    const handleDelete = (data) => async() => {
        let words=JSON.parse(localStorage.getItem('SearchKeywords')) || [];
        words=await words.filter((chip) => chip !== data)
        localStorage.setItem('SearchKeywords',JSON.stringify(words))
        setSearchKeys(words);
        handleShowKeywords(words)
    };
    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 4 }}>
            {SearchKeys.map((data) => {
                return (
                    <ListItem key={uuid()} sx={{ listStyle: 'none' }}  >
                        <Chip
                            color='primary'
                            label={data}
                            onDelete={handleDelete(data)}
                            sx={{cursor:'pointer'}}
                            onClick={()=>handleSearchKeywords(data)}
                        />
                    </ListItem>
                );
            })}
        </Box>
    )
}

export default SearchKeywords