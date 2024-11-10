import React from 'react';
import { Box, Typography } from '@mui/material';

function CurrentSongLyrics({ currentSong }) {
    return (
        <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                {currentSong.title}
            </Typography>
            
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {currentSong.lyrics}
                </Typography>
            </Box>
        </Box>
    );
}

export default CurrentSongLyrics;
