import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const drawerWidth = 240;

function SideBar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: `${drawerWidth}px`,
                flexShrink: 0,
                backgroundColor: "#212121",
            }}
            PaperProps={{
                sx: {
                    width: `${drawerWidth}px`,
                    height: "calc(100vh - 128px)", // 전체 높이에서 상단/하단 여백 제외
                    marginTop: "64px", // 상단 여백 조정
                    backgroundColor: "#212121",
                },
            }}
        >
            <List>
                {["홈", "듣기", "보관함"].map((text) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} sx={{ color: "white" }} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default SideBar;
