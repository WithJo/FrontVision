import { AppBar, Toolbar, Typography } from "@mui/material";

function BottomPlayerBar() {
    return (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar sx={{ justifyContent: 'center' }}>
                <Typography variant="body1">현재 재생 중: 곡 제목</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default BottomPlayerBar;
