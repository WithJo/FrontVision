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
                    justifyContent: "space-between",
                    p: 1,
                }}
            >
                <IconButton onClick={togglePlayPause} color="inherit">
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>

                <Slider
                    value={currentTime}
                    min={0}
                    max={duration}
                    onChange={handleSeekChange}
                    sx={{ width: "30%" }}
                />
                <Typography variant="body2">
                    {Math.floor(currentTime / 60)}:
                    {("0" + Math.floor(currentTime % 60)).slice(-2)} /{" "}
                    {Math.floor(duration / 60)}:
                    {("0" + Math.floor(duration % 60)).slice(-2)}
                </Typography>

                <VolumeUpIcon />
                <Slider
                    value={volume}
                    min={0}
                    max={100}
                    onChange={handleVolumeChange}
                    sx={{ width: "10%" }}
                />

                <IconButton
                    onClick={() => setIsVideoVisible(!isVideoVisible)}
                    color="inherit"
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
