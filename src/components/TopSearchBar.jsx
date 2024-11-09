import { AppBar, Toolbar, Typography, TextField } from "@mui/material";

function TopSearchBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Music
                </Typography>
                <TextField placeholder="노래, 앨범, 아티스트 검색" variant="outlined" size="small" />
            </Toolbar>
        </AppBar>
    );
}

export default TopSearchBar;
