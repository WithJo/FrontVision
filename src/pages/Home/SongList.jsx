import React from "react";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Divider,
} from "@mui/material";

function SongList({ songs, popsongs, onSongSelect }) {
    return (
        <Box>
            {/* 최신 음악 섹션 */}
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
                                transform: "scale(1.05)", // 호버 시 확대 효과
                            },
                        }}
                        onClick={() => onSongSelect(song)}
                    >
                        {/* 뮤직비디오 이미지 */}
                        <CardMedia
                            component="img"
                            height="170"
                            image={
                                song.thumbnailUrl ||
                                "/path/to/default-cover.jpg"
                            } // song.thumbnailUrl이 없으면 기본 이미지
                            alt={song.title}
                        />
                        <CardContent>
                            {/* 노래 제목 */}
                            <Typography variant="h6" component="div">
                                {song.title}
                            </Typography>
                            {/* 가수 정보 */}
                            <Typography variant="body2" color="text.secondary">
                                {song.artist || "Unknown Artist"}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Divider로 구분선 추가 */}
            <Divider sx={{ backgroundColor: "black", marginY: 4 }} />

            {/* Pop 음악 추천 섹션 */}
            <Typography variant="h3" sx={{ mb: 2, color: "black" }}>
                Pop
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    padding: "10px",
                }}
            >
                {popsongs.map((song) => (
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
                                transform: "scale(1.05)", // 호버 시 확대 효과
                            },
                        }}
                        onClick={() => onSongSelect(song)}
                    >
                        {/* 뮤직비디오 이미지 */}
                        <CardMedia
                            component="img"
                            height="170"
                            image={
                                song.thumbnailUrl ||
                                "/path/to/default-cover.jpg"
                            } // song.thumbnailUrl이 없으면 기본 이미지
                            alt={song.title}
                        />
                        <CardContent>
                            {/* 노래 제목 */}
                            <Typography variant="h6" component="div">
                                {song.title}
                            </Typography>
                            {/* 가수 정보 */}
                            <Typography variant="body2" color="text.secondary">
                                {song.artist || "Unknown Artist"}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Divider로 구분선 추가 */}
            <Divider sx={{ backgroundColor: "black", marginY: 4 }} />

            {/* 힙합 음악 추천 섹션 */}
            <Typography variant="h3" sx={{ mb: 2, color: "black" }}>
                한국 힙합
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    padding: "10px",
                }}
            >
                {popsongs.map((song) => (
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
                                transform: "scale(1.05)", // 호버 시 확대 효과
                            },
                        }}
                        onClick={() => onSongSelect(song)}
                    >
                        {/* 뮤직비디오 이미지 */}
                        <CardMedia
                            component="img"
                            height="170"
                            image={
                                song.thumbnailUrl ||
                                "/path/to/default-cover.jpg"
                            } // song.thumbnailUrl이 없으면 기본 이미지
                            alt={song.title}
                        />
                        <CardContent>
                            {/* 노래 제목 */}
                            <Typography variant="h6" component="div">
                                {song.title}
                            </Typography>
                            {/* 가수 정보 */}
                            <Typography variant="body2" color="text.secondary">
                                {song.artist || "Unknown Artist"}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}

export default SongList;
