import { useLocation } from "react-router-dom";

function Music() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("id"); // props 또는 URL에서 id 가져오기

    return (
        <div>
            <h2>확장된 콘텐츠</h2>
            <p>ID: {id}</p>
            {/* ID에 맞는 콘텐츠를 렌더링 */}
        </div>
    );
}

export default Music;
