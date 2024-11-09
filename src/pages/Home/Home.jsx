import React, { useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import TopSearchBar from "../../components/TopSearchBar";
import SideBar from "../../components/SideBar";
import BottomBar from "../../components/BottomBar";

const sampleSongs = [
    {
        id: 1,
        title: "노래 1",
        lyrics: "이 노래의 가사입니다. 첫 번째 곡의 가사가 여기에 나옵니다.",
        musicVideoUrl: "/videos/sample.mp4",
    },
    {
        id: 2,
        title: "노래 2",
        lyrics: "이 노래의 두 번째 가사입니다. 두 번째 곡의 가사가 여기에 나옵니다.",
        musicVideoUrl: "/videos/sample2.mp4",
    },
    {
        id: 3,
        title: "노래 3",
        lyrics: "이 노래의 세 번째 가사입니다. 세 번째 곡의 가사가 여기에 나옵니다.",
        musicVideoUrl: "/videos/sample.mp4",
    },
];

function Home() {
    const [currentSong, setCurrentSong] = useState(null);
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true); // 재생 상태 관리
    const videoRef = useRef(null);

    const handlePlay = (song) => {
        setCurrentSong(song);
        setIsVideoVisible(true);
        setIsPlaying(true); // 새로운 노래 선택 시 재생 상태로 설정
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.play();
            }
        }, 100);
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying); // 재생/정지 상태를 토글
        }
    };

    return (
        <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
            <TopSearchBar />
            <Box sx={{ display: "flex", flexGrow: 1 }}>
                <SideBar />
                <Box sx={{ flexGrow: 1, p: 2, display: "flex", gap: 2 }}>
                    <Box
                        sx={{
                            width: "60%",
                            display: isVideoVisible ? "flex" : "none",
                            flexDirection: "column",
                            gap: 1,
                        }}
                    >
                        <video
                            ref={videoRef}
                            src={currentSong ? currentSong.musicVideoUrl : ""}
                            width="100%"
                            style={{
                                display: isVideoVisible ? "block" : "none",
                            }}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        />
                    </Box>

                    <Box
                        sx={{
                            width: isVideoVisible ? "40%" : "100%",
                            overflowY: "auto",
                        }}
                    >
                        {currentSong && isVideoVisible ? (
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h5" sx={{ mb: 2 }}>
                                    {currentSong.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ whiteSpace: "pre-line" }}
                                >
                                    {currentSong.lyrics}
                                </Typography>
                            </Box>
                        ) : (
                            <Box>
                                <Typography variant="h4" sx={{ mb: 2 }}>
                                    최신 음악
                                </Typography>
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    {sampleSongs.map((song) => (
                                        <Box
                                            key={song.id}
                                            sx={{ cursor: "pointer" }}
                                        >
                                            <img
                                                src="/path/to/album-cover.jpg"
                                                alt={song.title}
                                                width="100"
                                                onClick={() => handlePlay(song)}
                                            />
                                            <Typography>
                                                {song.title}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>

            {/* BottomBar에 상태와 제어 함수 전달 */}
            <BottomBar
                videoRef={videoRef}
                currentSong={currentSong}
                isVideoVisible={isVideoVisible}
                setIsVideoVisible={setIsVideoVisible}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                togglePlayPause={togglePlayPause}
            />
        </Box>
    );
}

export default Home;
