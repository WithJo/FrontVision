import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';

function SongList({ songs, onSongSelect }) {
    return (
        <Box>
            <Typography variant="h3" sx={{ mb: 2 }}>
                최신 음악
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {songs.map((song) => (
                    <Card
                        key={song.id}
                        sx={{
                            width: 300,
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        onClick={() => onSongSelect(song)}
                    >
                        {/* 뮤직비디오 이미지 */}
                        <CardMedia
                            component="img"
                            height="170"
                            image={song.thumbnailUrl || '/path/to/default-cover.jpg'} // song.imageUrl이 없으면 기본 이미지
                            alt={song.title}
                        />
                        <CardContent>
                            {/* 노래 제목 */}
                            <Typography variant="h6" component="div">
                                {song.title}
                            </Typography>
                            {/* 가수 정보 */}
                            <Typography variant="body2" color="text.secondary">
                                {song.artist || 'Unknown Artist'}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}

export default SongList;
