// 기존 Home 컴포넌트에 들어있던 항목이 너무 길어져서 SongList.jsx와 CurrentSongLyrics.jsx로 분리

import { useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import TopSearchBar from "../../components/TopSearchBar";
import SideBar from "../../components/SideBar";
import BottomBar from "../../components/BottomBar";
import CurrentSongLyrics from "./CurrentSongLyrics";
import SongList from "./SongList";

const sampleSongs = [
  {
    id: 1,
    title: "Power", // 노래 제목 추가
    lyrics: "이 노래의 첫 번째 가사입니다.",
    musicVideoUrl: "/videos/sample1.mp4",
    thumbnailUrl: "/thumbnails/sample1.jpg"
  },
  // 다른 노래 샘플
  {
    id: 2,
    title: "BBI BBI",
    lyrics: "이 노래의 두 번째 가사입니다.",
    musicVideoUrl: "/videos/sample2.mp4",
    thumbnailUrl: "/thumbnails/sample2.jpg"

  },
  {
    id: 3,
    title: "Armageddon",
    lyrics: "이 노래의 세 번째 가사입니다.",
    musicVideoUrl: "/videos/sample3.mp4",
    thumbnailUrl: "/thumbnails/sample3.jpg"

  },
];

function Home() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const handlePlay = (song) => {
    setCurrentSong(song);
    setIsVideoVisible(true);
    setIsPlaying(true);
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
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <TopSearchBar />
      <Box
        sx={{ display: "flex", flexGrow: 1, justifyContent: "space-around" }}
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
              style={{ display: isVideoVisible ? "block" : "none" }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </Box>

          <Box
            sx={{ width: isVideoVisible ? "40%" : "100%", overflowY: "auto" }}
          >
            {currentSong && isVideoVisible ? (
              <CurrentSongLyrics currentSong={currentSong} />
            ) : (
              <SongList songs={sampleSongs} onSongSelect={handlePlay} />
            )}
          </Box>
        </Box>
      </Box>

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
