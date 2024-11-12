// 기존 Home 컴포넌트에 들어있던 항목이 너무 길어져서 SongList.jsx와 CurrentSongLyrics.jsx로 분리

import { useState, useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TopSearchBar from "../../components/TopSearchBar";
import SideBar from "../../components/SideBar";
import BottomBar from "../../components/BottomBar";
import CurrentSongLyrics from "./CurrentSongLyrics";
import SongList from "./SongList";
import { getSong } from "../../apis/getSong";

const popSongs = [
    {
        id: 1,
        title: "Power", // 노래 제목 추가
        artist: "G-Dragon",
        lyric: "이 노래의 첫 번째 가사입니다.",
        videoUrl: "/videos/sample1.mp4",
        thumbnailUrl: "/thumbnails/sample1.jpg",
    },
    // 다른 노래 샘플
    {
        id: 2,
        title: "BBI BBI",
        artist: "IU",
        lyric: "이 노래의 두 번째 가사입니다.",
        videoUrl: "/videos/sample2.mp4",
        thumbnailUrl: "/thumbnails/sample2.jpg",
    },
    {
        id: 3,
        title: "Armageddon",
        lyric: "이 노래의 세 번째 가사입니다.",
        artist: "Aespa",
        videoUrl: "/videos/sample3.mp4",
        thumbnailUrl: "/thumbnails/sample3.jpg",
    },
];

function Home() {
    const [currentSong, setCurrentSong] = useState(null);
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showLyrics, setShowLyrics] = useState(false); // 가사 표시 상태
    const [songData, setSongData] = useState([]);
    const videoRef = useRef(null);
    const [volume, setVolume] = useState(100);

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const data = await getSong();
                setSongData(data.data);
                console.log(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSong();
    }, []);

    useEffect(() => {
        // 키보드 컨트롤
        const handleKeyPress = (e) => {
            if (currentSong && videoRef.current) {  // currentSong만 있으면 됨 (재생 여부 상관없이)
                switch (e.code) {
                    case 'Space':
                        e.preventDefault();
                        togglePlayPause();
                        break;
    
                    case 'ArrowUp':    // 볼륨 증가
                        e.preventDefault();
                        const newVolumeUp = Math.min(1, videoRef.current.volume + 0.1);
                        videoRef.current.volume = newVolumeUp;
                        setVolume(newVolumeUp * 100);  // volume state 업데이트 추가
                        break;
                        
                    case 'ArrowDown':  // 볼륨 감소
                        e.preventDefault();
                        const newVolumeDown = Math.max(0, videoRef.current.volume - 0.1);
                        videoRef.current.volume = newVolumeDown;
                        setVolume(newVolumeDown * 100);  // volume state 업데이트 추가
                        break;
                        
                    case 'ArrowLeft':  // 5초 뒤로
                        e.preventDefault();
                        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
                        break;
                        
                    case 'ArrowRight': // 5초 앞으로
                        e.preventDefault();
                        videoRef.current.currentTime = Math.min(
                            videoRef.current.duration, 
                            videoRef.current.currentTime + 5
                        );
                        break;
                }
            }
        };
    
        // 마우스 뒤로가기/앞으로가기 버튼 처리
        const handleMouseNavigation = (e) => {
            console.log('Mouse button:', e.button);  // 실제 값 확인

            // 뒤로가기 버튼
            if (e.button === 3) {
                if (isVideoVisible) {
                    e.preventDefault();
                    setIsVideoVisible(false);
                }
            }
            // 앞으로가기 버튼
            else if (e.button === 4) {
                if (!isVideoVisible && currentSong) {
                    e.preventDefault();
                    setIsVideoVisible(true);
                }
            }
        };
    
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('mouseup', handleMouseNavigation);
    
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('mouseup', handleMouseNavigation);
        };
    }, [currentSong, isPlaying, isVideoVisible]);

    const handlePlay = (song) => {
        setCurrentSong(song);
        setIsVideoVisible(true);
        setIsPlaying(false);  // 먼저 false로 설정
        
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.play().then(() => {
                    setIsPlaying(true);  // 실제 재생이 시작되면 true로 변경
                });
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
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh", // 전체 높이를 고정
                overflow: "hidden", // 전체 화면 스크롤 방지
            }}
        >
            <Box sx={{ position: "sticky", top: 0, zIndex: 2 }}>
                <TopSearchBar />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "space-around",
                }}
            >
                <Box sx={{ position: "sticky", top: 0, zIndex: 1 }}>
                    <SideBar />
                </Box>

                {/* Content Area */}
                <Box
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        display: "flex",
                        gap: 2,
                        backgroundColor: "#f5f5f5",
                        position: "relative", // 추가
                    }}
                >
                    {/* 항상 보이는 음악 리스트 */}
                    <Box
                        sx={{
                            width: "100%",
                            overflowY: "auto",
                            maxHeight: "calc(100vh - 100px)",
                        }}
                    >
                        <SongList
                            songs={songData}
                            popsongs={popSongs}
                            onSongSelect={handlePlay}
                        />
                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            left: 0,
                            top: 0,
                            display: "flex",
                            gap: 2,
                            p: 2,
                            transform: isVideoVisible
                                ? "translateY(0)"
                                : "translateY(100%)",
                            transition: "transform 0.3s ease-in-out",
                            backgroundColor: "#f5f5f5",
                            zIndex: 1,
                        }}
                    >
                        <Box
                            sx={{
                                width: "60%",
                                display: isVideoVisible ? "flex" : "none", // 원래 코드의 조건 유지
                                flexDirection: "column",
                                justifyContent: "center",
                                gap: 1,
                            }}
                        >
                            <video
                                ref={videoRef}
                                src={currentSong ? currentSong.videoUrl : ""}
                                width="100%"
                                style={{
                                    display: isVideoVisible ? "block" : "none",
                                }} // 원래 코드의 style 유지
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            />
                        </Box>

                        <Box
                            sx={{
                                width: isVideoVisible ? "40%" : "100%", // 원래 코드의 조건 유지
                                overflowY: "auto",
                                maxHeight: "calc(100vh - 100px)",
                                backgroundColor: "#fff",
                                borderRadius: 2,
                                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                p: 2,
                            }}
                        >
                            {currentSong && isVideoVisible ? (
                                <CurrentSongLyrics currentSong={currentSong} />
                            ) : (
                                <SongList
                                    songs={songData}
                                    popsongs={popSongs}
                                    onSongSelect={handlePlay}
                                />
                            )}
                        </Box>
                    </Box>

                    {/* 슬라이딩되는 비디오/가사 컨테이너 */}
                    {currentSong && (
                        <Box
                            sx={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                bottom: 0,
                                height: "100%",
                                backgroundColor: "#f5f5f5",
                                display: "flex",
                                gap: 2,
                                transform: isVideoVisible
                                    ? "translateY(0)"
                                    : "translateY(100%)",
                                transition: "transform 0.3s ease-in-out",
                                zIndex: 1,
                                p: 3, // 전체 컨테이너 패딩
                            }}
                        >
                            <Box
                                sx={{
                                    width: "60%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    gap: 1,
                                }}
                            >
                                <video
                                    ref={videoRef}
                                    src={currentSong.videoUrl}
                                    width="100%"
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    style={{
                                        borderRadius: 8, // 비디오에도 둥근 모서리 적용
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    width: "40%",
                                    overflowY: "auto",
                                    p: 2, // 가사 컨테이너 패딩
                                    backgroundColor: "#fff", // 배경색 추가
                                    borderRadius: 2, // 모서리 둥글게
                                    boxShadow: "0 0 10px rgba(0,0,0,0.1)", // 그림자 효과
                                }}
                            >
                                <CurrentSongLyrics currentSong={currentSong} />
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box sx={{ position: "sticky", top: 0, zIndex: 2 }}>
                <BottomBar
                    videoRef={videoRef}
                    currentSong={currentSong}
                    isVideoVisible={isVideoVisible}
                    setIsVideoVisible={setIsVideoVisible}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    togglePlayPause={togglePlayPause}
                    volume={volume}           
                    setVolume={setVolume}   
                />
            </Box>
        </Box>
    );
}

export default Home;
