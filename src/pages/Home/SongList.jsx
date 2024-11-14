import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Divider,
    IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import FadeModal from "../../components/FadeModal";

function SongList({ songs, popsongs, onSongSelect }) {
    // 모달 상태 관리
    const [modalOpen, setModalOpen] = useState(false);

    // 스크롤 핸들러
    const handleScroll = (direction) => {
        const container = document.getElementById('pop-songs-container');
        const scrollAmount = 200;
        if (container) {
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Pop 음악 클릭 핸들러
    const handlePopSongClick = (song) => {
        setModalOpen(true);
    };

    return (
        <Box>
            {/* 추천 음악 섹션 */}
            <Typography variant="h3" sx={{ mb: 2, color: "black" }}>
                추천 음악
            </Typography>
            
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    padding: "10px",
                }}
            >
                {songs.map((song) => (
                    <Card
                        key={song.id}
                        sx={{
                            width: 300,
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            color: "white",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                        onClick={() => onSongSelect(song)}
                    >
                        <CardMedia
                            component="img"
                            height="170"
                            image={song.thumbnailUrl || "/path/to/default-cover.jpg"}
                            alt={song.title}
                        />
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {song.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {song.artist || "Unknown Artist"}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Divider sx={{ backgroundColor: "black", marginY: 4 }} />

            {/* Pop 음악 추천 섹션 */}
            <Typography variant="h3" sx={{ mb: 2, color: "black" }}>
                Pop
            </Typography>
            
            {/* 스크롤 컨테이너 래퍼 */}
            <Box sx={{ position: 'relative' }}>
                {/* 왼쪽 스크롤 버튼 */}
                <IconButton 
                    onClick={() => handleScroll('left')}
                    sx={{
                        position: 'absolute',
                        left: 20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        }
                    }}
                >
                    <ChevronLeft />
                </IconButton>

                {/* Pop 음악 카드 스크롤 컨테이너 */}
                <Box
                    id="pop-songs-container"
                    sx={{
                        display: "flex",
                        gap: 2,
                        padding: "10px",
                        overflowX: "auto",
                        scrollBehavior: "smooth",
                        '&::-webkit-scrollbar': {
                            height: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            },
                        },
                    }}
                >
                    {popsongs.map((song) => (
                        <Card
                            key={song.id}
                            sx={{
                                flex: '0 0 200px',
                                aspectRatio: "1/1",
                                cursor: "pointer",
                                position: "relative",
                                overflow: "hidden",
                                transition: "transform 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                            }}
                            onClick={() => handlePopSongClick(song)}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                }}
                                image={song.thumbnailUrl || "/path/to/default-cover.jpg"}
                                alt={song.title}
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background: "rgba(0, 0, 0, 0.7)",
                                    padding: "10px",
                                    transform: "translateY(100%)",
                                    transition: "transform 0.3s ease-in-out",
                                    ".MuiCard-root:hover &": {
                                        transform: "translateY(0)",
                                    },
                                }}
                            >
                                <Typography variant="subtitle1" sx={{ color: "white" }}>
                                    {song.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                                    {song.artist}
                                </Typography>
                            </Box>
                        </Card>
                    ))}
                </Box>

                {/* 오른쪽 스크롤 버튼 */}
                <IconButton 
                    onClick={() => handleScroll('right')}
                    sx={{
                        position: 'absolute',
                        right: 20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        }
                    }}
                >
                    <ChevronRight />
                </IconButton>
            </Box>

            {/* 모달 컴포넌트 */}
            <FadeModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                message="아직 개발 중인 기능입니다."
                duration={2000}
            />
        </Box>
    );
}

export default SongList;