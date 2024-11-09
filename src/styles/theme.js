import { createTheme } from "@mui/material";
import { orange, grey, red, blue } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: grey[900],
            light: grey[500],
        },
        separator: {
            main: orange[100],
            light: grey[200],
        },
        subbackground: {
            main: grey[400],
        },
        transaction: {
            date: grey[600],
            plus: red["A700"],
            minus: blue["A700"],
        },
    },
    typography: {
        h1: {
            fontSize: "2.5rem", // h1의 폰트 크기
            fontWeight: 600, // h1의 폰트 두께
        },
        h6: {
            fontSize: "1.25rem", // h6의 폰트 크기 (기본값은 1.25rem)
            fontWeight: 500, // h6의 폰트 두께 (기본값은 500)
            lineHeight: 1.5, // 줄 높이
            color: grey[800], // 텍스트 색상 (원하는 색상으로 변경 가능)
        },
        body1: {
            fontSize: "1rem", // body1의 폰트 크기
        },
        caption: {
            fontSize: "0.75rem", // 캡션 텍스트 크기
            color: grey[600], // 캡션 텍스트 색상
        },
        button: {
            textTransform: "none", // 버튼 텍스트 대문자 변환 해제
        },
    },
});

export default theme;
