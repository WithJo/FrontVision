import React, { useState, useEffect } from "react";
import { Box, IconButton, Slider, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function BottomBar({
    videoRef,
    currentSong,
    isVideoVisible,
    setIsVideoVisible,
    isPlaying,
    togglePlayPause,
}) {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(50);

    useEffect(() => {
        if (videoRef.current) {
            const handleLoadedMetadata = () => {
                setDuration(videoRef.current.duration);
            };
            videoRef.current.addEventListener(
                "loadedmetadata",
                handleLoadedMetadata
            );
            return () =>
                videoRef.current.removeEventListener(
                    "loadedmetadata",
                    handleLoadedMetadata
                );
        }
    }, [videoRef]);

    useEffect(() => {
        const updateCurrentTime = () => {
            if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
            }
        };

        if (isPlaying && videoRef.current) {
            videoRef.current.addEventListener("timeupdate", updateCurrentTime);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener(
                    "timeupdate",
                    updateCurrentTime
                );
            }
        };
    }, [isPlaying, videoRef]);

    const handleSeekChange = (event, newValue) => {
        if (videoRef.current) {
            videoRef.current.currentTime = newValue;
            setCurrentTime(newValue);
        }
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        if (videoRef.current) {
            videoRef.current.volume = newValue / 100;
        }
    };

    return (
        currentSong && (
            <Box
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "#333",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    p: 1,
                }}
            >
                <IconButton
                    onClick={togglePlayPause}
                    color="inherit"
                    sx={{ marginLeft: "20px" }}
                >
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>

                <Slider
                    value={currentTime}
                    min={0}
                    max={duration}
                    onChange={handleSeekChange}
                    sx={{
                        marginLeft: "20px",
                        width: "30%",
                        color: "#ffffff", // 전체 슬라이더 색상 변경
                        "& .MuiSlider-thumb": {
                            color: "#ffffff", // 슬라이더의 thumb 색상
                        },
                        "& .MuiSlider-track": {
                            color: "#ffffff", // 슬라이더의 track 색상
                        },
                        "& .MuiSlider-rail": {
                            color: "#ffffff80", // 슬라이더의 진행되지 않은 부분
                        },
                    }}
                />
                <Typography variant="body2" sx={{ marginLeft: "20px" }}>
                    {Math.floor(currentTime / 60)}:
                    {("0" + Math.floor(currentTime % 60)).slice(-2)} /{" "}
                    {Math.floor(duration / 60)}:
                    {("0" + Math.floor(duration % 60)).slice(-2)}
                </Typography>

                <VolumeUpIcon sx={{ marginLeft: "40rem" }} />
                <Slider
                    value={currentTime}
                    min={0}
                    max={duration}
                    onChange={handleSeekChange}
                    sx={{
                        marginLeft: "20px",
                        width: "10%",
                        color: "#ffffff", // 전체 슬라이더 색상 변경
                        "& .MuiSlider-thumb": {
                            color: "#ffffff", // 슬라이더의 thumb 색상
                        },
                        "& .MuiSlider-track": {
                            color: "#ffffff", // 슬라이더의 track 색상
                        },
                        "& .MuiSlider-rail": {
                            color: "#ffffff80", // 슬라이더의 진행되지 않은 부분
                        },
                    }}
                />

                <IconButton
                    onClick={() => setIsVideoVisible(!isVideoVisible)}
                    color="inherit"
                    sx={{ marginLeft: "20px" }}
                >
                    {isVideoVisible ? (
                        <KeyboardArrowDownIcon />
                    ) : (
                        <KeyboardArrowUpIcon />
                    )}
                </IconButton>
            </Box>
        )
    );
}

export default BottomBar;
