import { AppBar, Toolbar, Typography, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function TopSearchBar({ isVideoVisible, setIsVideoVisible }) {
    const handleLogoClick = () => {
        // 현재 비디오가 보이는 상태일 때만 토글
        if (isVideoVisible) {
            setIsVideoVisible(false);
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box 
                    onClick={handleLogoClick}
                    sx={{ 
                        cursor: 'pointer',
                        '&:hover': {
                            opacity: 0.8
                        }
                    }}
                >
                    <Typography variant="h1">Signify</Typography>
                </Box>
                <TextField
                    placeholder="노래, 앨범, 아티스트 검색"
                    size="small"
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        marginLeft: "110px",
                        input: {
                            color: "black",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "white",
                                borderWidth: "2px",
                            },
                            "&:hover fieldset": {
                                borderColor: "lightgray",
                                borderWidth: "2px",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "white",
                                borderWidth: "2px",
                            },
                        },
                    }}
                />
            </Toolbar>
        </AppBar>
    );
}

export default TopSearchBar;