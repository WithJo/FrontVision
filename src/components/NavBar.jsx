import { Drawer, List, ListItem, ListItemText } from "@mui/material";

function NavBar() {
    return (
        <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
            <List>
                {["홈", "듣기", "보관함"].map((text) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default NavBar;
