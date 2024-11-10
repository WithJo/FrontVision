import React from 'react';
import { Box, Typography } from '@mui/material';

function SongList({ songs, onSongSelect }) {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
                최신 음악
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                {songs.map((song) => (
                    <Box key={song.id} sx={{ cursor: 'pointer' }} onClick={() => onSongSelect(song)}>
                        <img src="/path/to/album-cover.jpg" alt={song.title} width="100" />
                        <Typography>{song.title}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default SongList;
