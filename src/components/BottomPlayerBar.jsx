import React, { useRef, useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Slider, Box, Typography } from "@mui/material";

function BottomPlayerBar() {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoverTime, setHoverTime] = useState(null); // 슬라이더에서 마우스 위치에 대한 시간 표시
  const [hoverPosition, setHoverPosition] = useState(0); // 마우스 커서 위치

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        setDuration(video.duration);
      };
      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  const handleVolumeChange = (event, newValue) => {
    videoRef.current.volume = newValue / 100;
  };

  const handleSeekChange = (event, newValue) => {
    videoRef.current.currentTime = (newValue / 100) * duration;
  };

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // 마우스가 슬라이더 위에서의 x 좌표
    const percent = x / rect.width;
    const newHoverTime = percent * duration;
    setHoverTime(newHoverTime);
    setHoverPosition(x); // 마우스 커서 위치 설정
  };

  const handleMouseLeave = () => {
    setHoverTime(null); // 마우스가 슬라이더에서 떠나면 hoverTime을 null로 설정
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <>
      {/* 녹색 슬라이더 */}
      <Box
        sx={{
          position: "fixed",
          bottom: 47, // BottomPlayerBar 위에 위치하도록 조정 (값은 조정 가능)
          left: 0,
          right: 0,
          marginLeft: -1,
          marginRight: -1,
          zIndex: 1500, // 다른 요소 위에 표시
        }}
      >
        <Slider
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeekChange}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave} // 마우스가 떠났을 때 이벤트 추가
          aria-label="Playback Position"
          sx={{
            width: "100%",
            '& .MuiSlider-track': {
              height: 7, // 트랙의 두께 설정

              background: 'linear-gradient(to right, #238847, #166849)', // 그라데이션 효과: 밝은 초록에서 어두운 초록으로
            },
            '& .MuiSlider-thumb': {
              backgroundColor: '#388e3c', // 슬라이더 thumb(핸들)의 색상 설정
            },
            '& .MuiSlider-rail': {
              height: 6, // 트랙의 두께 설정

              opacity: 1,
              backgroundColor: 'gray', // 슬라이더의 "비활성화된" 부분의 색상
            },
          }}
        />
        {hoverTime !== null && (
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              bottom: 50, // 슬라이더 위로 약간의 여백
              left: `${hoverPosition}px`, // 마우스 커서 위치에 따라 이동
              color: "white",
              backgroundColor: "rgba(0,0,0,0.7)",
              padding: "2px 5px",
              borderRadius: "4px",
              transform: "translateX(-50%)", // 커서 중심에 맞춤
            }}
          >
            {formatTime(hoverTime)}
          </Typography>
        )}
      </Box>

      {/* Bottom Player Bar */}
      <AppBar position="fixed" sx={{ top: "auto", bottom: 0, backgroundColor: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", color: "white" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={handlePlay}
              variant="contained"
              sx={{ backgroundColor: "white", color: "black", mr: 1 }}
            >
              Play
            </Button>
            <Button
              onClick={handlePause}
              variant="contained"
              sx={{ backgroundColor: "white", color: "black" }}
            >
              Pause
            </Button>
            <Typography variant="body2" sx={{ color: "white", ml: 2 }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ color: "white", mr: 2 }}>
              Volume
            </Typography>
            <Slider
              defaultValue={50}
              aria-label="Volume"
              valueLabelDisplay="auto"
              onChange={handleVolumeChange}
              sx={{ color: "white", width: 200 }}
            />
          </Box>
        </Toolbar>
        <video
          ref={videoRef}
          src="/videos/sample.mp4"
          width="300"
          height="150"
          controls
          style={{ display: "none" }}
        />
      </AppBar>
    </>
  );
}

export default BottomPlayerBar;
