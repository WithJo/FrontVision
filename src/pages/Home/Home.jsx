import {
    Box,
    Grid2,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from "@mui/material";
import TopSearchBar from "../../components/TopSearchBar";
import NavBar from "../../components/NavBar";
import BottomPlayerBar from "../../components/BottomPlayerBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Music from "../Music/Music";

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [contentId, setContentId] = useState(null);

    useEffect(() => {
        // URL 쿼리 파라미터로부터 초기 상태 설정
        const params = new URLSearchParams(location.search);
        setContentId(params.get("id"));
        setIsExpanded(!!params.get("id")); // id가 있으면 확장 상태로 설정
    }, [location.search]);

    const toggleExpansion = () => {
        const params = new URLSearchParams(location.search);

        if (isExpanded) {
            params.delete("id"); // 닫혔을 때는 id 파라미터 제거
        } else {
            const newId = "12345"; // 예시 ID 값, 실제로는 특정 콘텐츠의 ID를 사용
            params.set("id", newId); // 열렸을 때는 id 파라미터 추가
            setContentId(newId);
        }

        navigate(`?${params.toString()}`);
        setIsExpanded(!isExpanded);
    };
    return (
        <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
            <TopSearchBar />

            <Box sx={{ display: "flex", flexGrow: 1 }}>
                <NavBar />
                {isExpanded ? <Music /> : <DefaultContent />}
                <button onClick={toggleExpansion} className="toggle-button">
                    {isExpanded ? "내리기" : "올리기"}
                </button>
            </Box>

            <BottomPlayerBar />
        </Box>
    );
}

function DefaultContent() {
    return (
        <>
            <Box sx={{ flexGrow: 1, p: 2, backgroundColor: "grey.200" }}>
                <Grid2 container spacing={2}>
                    {["노래 1", "노래 2", "노래 3"].map((title) => (
                        <Grid2 item xs={12} sm={6} md={4} key={title}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="h5">
                                            {title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </>
    );
}

export default Home;
