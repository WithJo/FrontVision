import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import FadeModal from './FadeModal';

const drawerWidth = 240;

function SideBar({ isVideoVisible, setIsVideoVisible }) {  // props 추가
    const [modalOpen, setModalOpen] = useState(false);

    const handleMenuClick = (text) => {
        if (text === "홈") {
            // 홈 버튼 클릭 시 비디오가 보이는 상태일 때만 토글
            if (isVideoVisible) {
                setIsVideoVisible(false);
            }
        } else {
            // 다른 메뉴 클릭 시 모달 표시
            setModalOpen(true);
        }
    };

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    width: `${drawerWidth}px`,
                    flexShrink: 0,
                    backgroundColor: "#212121",
                    '& .MuiDrawer-paper': {
                        width: `${drawerWidth}px`,
                        boxSizing: 'border-box',
                    },
                }}
                PaperProps={{
                    sx: {
                        width: `${drawerWidth}px`,
                        height: "calc(100vh)",
                        marginTop: "64px",
                        backgroundColor: "#212121",
                    },
                }}
            >
                <List>
                    {["홈", "듣기", "보관함"].map((text) => (
                        <ListItem 
                            button
                            key={text}
                            onClick={() => handleMenuClick(text)}  // text 파라미터 전달
                            sx={{
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                },
                                padding: '12px 24px',
                            }}
                        >
                            <ListItemText 
                                primary={text}
                                sx={{ 
                                    color: "white",
                                    '& .MuiTypography-root': {
                                        fontSize: '0.95rem',
                                        fontWeight: 500,
                                        letterSpacing: '0.02em',
                                    }
                                }} 
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <FadeModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                message="아직 개발 중인 기능입니다."
                duration={2000}
            />
        </>
    );
}

export default SideBar;