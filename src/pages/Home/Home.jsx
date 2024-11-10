import { useState, useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TopSearchBar from "../../components/TopSearchBar";
import SideBar from "../../components/SideBar";
import BottomBar from "../../components/BottomBar";
import { getSong } from "../../apis/getSong";

const sampleSongs = [
    {
        id: 1,
        title: "Espresso", // 노래 제목 추가
        lyrics: `Now he's thinkin' 'bout me every night, oh
Is it that sweet? I guess so
Say you can't sleep, baby, I know
That's that me espresso
Move it up, down, left, right, oh
Switch it up like Nintendo
Say you can't sleep, baby, I know
That's that me espresso
I can't relate to desperation
My give-a-fucks are on vacation
And I got this one boy and he won't stop calling
When they act this way, I know I got 'em
Too bad your ex don't do it for ya
Walked in and dream-came-trued it for ya
Soft skin and I perfumed it for ya
(Yes) I know I Mountain Dew it for ya
(Yes) that morning coffee, brewed it for ya
(Yes) one touch and I brand-newed it for ya
Now he's thinkin' 'bout me every night, oh
Is it that sweet? I guess so
Say you can't sleep, baby, I know
That's that me espresso
Move it up, down, left, right, oh
Switch it up like Nintendo
Say you can't sleep, baby, I know
That's that me espresso
Holy shit
Is it that sweet? I guess so
I'm working late, 'cause I'm a singer
Oh, he looks so cute wrapped around my finger
My twisted humor make him laugh so often
My honey bee, come and get this pollen
Too bad your ex don't do it for ya
Walked in and dream-came-trued it for ya
Soft skin and I perfumed it for ya
(Yes) I know I Mountain Dew it for ya
(Yes) that morning coffee, brewed it for ya
(Yes) one touch and I brand-newed it for ya (stupid)
Now he's thinkin' 'bout me every night, oh
Is it that sweet? I guess so
Say you can't sleep, baby, I know
That's that me espresso
Move it up down, left, right, oh
Switch it up like Nintendo
Say you can't sleep, baby, I know
That's that me espresso
Thinkin' 'bout me every night, oh
Is it that sweet? I guess so
Say you can't sleep, baby, I know
That's that me espresso
Move it up down, left, right, oh
Switch it up like Nintendo
Say you can't sleep, baby, I know
That's that me espresso
Is it that sweet? I guess so
That's that me espresso`,
        musicVideoUrl: "/videos/sample.mp4",
    },
    // 다른 노래 샘플
    {
        id: 2,
        title: "노래 2",
        lyrics: "이 노래의 두 번째 가사입니다.",
        musicVideoUrl: "/videos/sample2.mp4",
    },
    {
        id: 3,
        title: "노래 3",
        lyrics: "이 노래의 세 번째 가사입니다.",
        musicVideoUrl: "/videos/sample.mp4",
    },
];

function Home() {
    const [currentSong, setCurrentSong] = useState(null);
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true); // 재생 상태 관리
    const [songData, setSongData] = useState([]);
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchSong = async () => {
            try {
                getSong;
                const data = await getSong();
                setSongData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSong();
    }, []);

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
            <Box
                sx={{
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "space-around",
                }}
            >
                <SideBar />
                <Box
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        display: "flex",
                        gap: 2,
                        height: "calc(100vh - 120px)",
                    }}
                >
                    <Box
                        sx={{
                            width: "60%",
                            display: isVideoVisible ? "flex" : "none",
                            flexDirection: "column",
                            justifyContent: "center",
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
                            // 현재 재생 중인 곡의 가사 표시
                            <Box
                                sx={{
                                    p: 2,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography variant="h5" sx={{ mb: 2 }}>
                                    {currentSong.title}
                                </Typography>
                                {/* 가사에만 스크롤을 추가 */}
                                <Box
                                    sx={{
                                        flexGrow: 1, // 남은 공간을 모두 차지하도록 설정
                                        overflowY: "auto", // 가사 부분에만 스크롤
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{ whiteSpace: "pre-line" }}
                                    >
                                        {currentSong.lyrics}
                                    </Typography>
                                </Box>
                            </Box>
                        ) : (
                            // 최신 음악 리스트
                            <Box>
                                <Typography variant="h4" sx={{ mb: 2 }}>
                                    최신 음악
                                </Typography>
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    {songData.map((song) => (
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
