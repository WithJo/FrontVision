// VideoContext.js
import React, { createContext, useContext, useRef, useState } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
    const videoRef = useRef(null);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(50);

    const play = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const pause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const seek = (time) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const changeVolume = (vol) => {
        setVolume(vol);
        if (videoRef.current) {
            videoRef.current.volume = vol / 100;
        }
    };

    return (
        <VideoContext.Provider
            value={{
                videoRef,
                currentSong,
                setCurrentSong,
                isPlaying,
                play,
                pause,
                currentTime,
                setCurrentTime,
                seek,
                volume,
                changeVolume,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
};

export const useVideo = () => useContext(VideoContext);
