import React from "react";
import { Box, Typography, Button } from "@mui/material";

function Music({ videoRef, currentSong, isVideoVisible, onMinimizeVideo }) {
    if (!currentSong) return null; // 선택된 곡이 없을 경우 아무것도 렌더링하지 않음

    return (
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            {/* 비디오 영역 */}
            <Box
                sx={{
                    width: "60%",
                    display: isVideoVisible ? "block" : "none",
                }}
            >
                <video
                    ref={videoRef}
                    src={currentSong.musicVideoUrl}
                    width="100%"
                    onPlay={() => videoRef.current && videoRef.current.play()}
                    onPause={() => videoRef.current && videoRef.current.pause()}
                />
                <Button onClick={onMinimizeVideo}>내리기</Button>
            </Box>

            {/* 가사 표시 영역 */}
            <Box sx={{ width: "40%", p: 2 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    {currentSong.title}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                    {currentSong.lyrics}
                </Typography>
            </Box>
        </Box>
    );
}

export default Music;
