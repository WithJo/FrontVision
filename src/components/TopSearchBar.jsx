import { AppBar, Toolbar, Typography, TextField, Box } from "@mui/material";

function TopSearchBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h1">
                    Signify
                </Typography>
                <TextField
                    placeholder="노래, 앨범, 아티스트 검색"
                    size="small"
                    
                    sx={{
                        backgroundColor: 'white', // 배경색을 흰색으로 설정하여 가시성 향상
                        borderRadius: 1, // 둥근 테두리
                        marginLeft: '110px', // NavBar의 너비 + 여백 설정
                        input: {
                            color: 'black', // 텍스트 색상을 검정으로 설정
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white', // 기본 테두리 색상
                                borderWidth: '2px',
                            },
                            '&:hover fieldset': {
                                borderColor: 'lightgray', // 마우스 호버 시 테두리 색상
                                borderWidth: '2px',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white', // 포커스 시 테두리 색상
                                borderWidth: '2px',
                            },
                        },
                    }}
                />
            </Toolbar>
        </AppBar>
    );
}

export default TopSearchBar;
