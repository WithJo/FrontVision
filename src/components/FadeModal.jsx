import React from 'react';
import { Modal, Box, Typography, Fade, Backdrop } from '@mui/material';

function FadeModal({ open, onClose, message, duration = 2000 }) {
    React.useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [open, onClose, duration]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.4)', // 배경 회색 톤 강화
                    },
                    timeout: 500,
                },
            }}
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                },
                '& :focus': {
                    outline: 'none'
                }
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: 300,
                        bgcolor: '#ffffff',
                        borderRadius: '16px',
                        boxShadow: `
                            0 4px 6px -1px rgba(0, 0, 0, 0.1),
                            0 2px 4px -1px rgba(0, 0, 0, 0.06),
                            0 20px 25px -5px rgba(0, 0, 0, 0.1),
                            0 10px 10px -5px rgba(0, 0, 0, 0.04)
                        `, // 다층 그림자 효과
                        py: 3,
                        px: 4,
                        textAlign: 'center',
                        border: 'none',
                        outline: 'none',
                        '&:focus': {
                            outline: 'none'
                        }
                    }}
                >
                    <Typography 
                        sx={{
                            fontWeight: 500,
                            color: '#1a1a1a',
                            fontSize: '1.1rem',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {message}
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    );
}

export default FadeModal;