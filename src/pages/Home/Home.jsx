// 기존 Home 컴포넌트에 들어있던 항목이 너무 길어져서 SongList.jsx와 CurrentSongLyrics.jsx로 분리

import { useState, useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TopSearchBar from "../../components/TopSearchBar";
import SideBar from "../../components/SideBar";
import BottomBar from "../../components/BottomBar";
import CurrentSongLyrics from "./CurrentSongLyrics";
import SongList from "./SongList";
import { getSong } from "../../apis/getSong";

const sampleSongs = [
    {
        id: 1,
        title: "Power", // 노래 제목 추가
        artist: "G-Dragon",
        lyrics: `When G.D’s in the house (Übermensch)
When G.D’s in the house
Guess who’s back (It’s ur boy G.D)

Now I got the power, The power power up power power
The power up power power yet, yet
억까 짤 퍼다 샬라샬라하다가 shout out
Pump up the power 난 자유로워 yap, yap
Do not waste your time yea it’s gotta be me
Prove ‘em all wrong I’ve got all the receipts
I got the power the power power up power
나는 나다워서 아름다워 yep, yep

애들이 나보고 개꿀이라더군
댓글 리플 관종 걔들 입틀막고
2세대 한정품이 세기의 완성품
(Like a Dragon fly) 누울 자리 글로 발명품

Hi-Hey-How u doin’ My-my name is (Called)
G to the D or ‘GOAT’ the livin’ legend
King is still poppin’ (star) ’K‘- 다시
I heard you’ve got the straight flush (Whateva) “He’s 4ever royal.”

I don’t give a 쉬-잇 웃다 끝 ‘돈’ 기부 ‘억’ 씨-익
권력오남용 묻고 관용 천재 지병 불가항력
Way too strong I’ve got that

Now I got the power, The power power up power power
The power up power power yet, yet
억까 짤 퍼다 샬라샬라하다가 shout out
Pump up the power 난 자유로워 yap, yap
Do not waste your time yea it’s gotta be me
Prove ‘em all wrong I’ve got all the receipts
I got the power the power power up power
나는 나다워서 아름다워 yep, yep

일당백 ‘지뢰밭’ 본업이(Born to be) ‘BANG’ Nothin’ U ain’t know But A ‘G’ Thang
But my girl, Y’all my brothers (Who run the world?) The world is yours
동서남북 Asia (미르시여) Europe to Australia (나르샤) Africa 2 America (어서옵쇼)
Started from the bottom ‘Now, Here’ (아리랑)

I don’t give a 쉬-잇 웃다 끝 ‘돈’ 기부 ‘억’ 씨-익
권력오남용 묻고 관용 천재 지병 불가항력
Way too strong I’ve got that

Now I got the power, The power power up power power
The power up power power yet, yet
억까 짤 퍼다 샬라샬라하다가 shout out
Pump up the power 난 자유로워 yap, yap
Do not waste your time yea it’s gotta be me
Prove ‘em all wrong I’ve got all the receipts
I got the power the power power up power
나는 나다워서 아름다워 yep, yep

I got the power the power power, “88 날아.”`,
        musicVideoUrl: "/videos/sample1.mp4",
        thumbnailUrl: "/thumbnails/sample1.jpg",
    },
    // 다른 노래 샘플
    {
        id: 2,
        title: "BBI BBI",
        artist: "IU",
        lyrics: `Hi there 인사해, 호들갑 없이
    시작해요 서론 없이
    스킨십은 사양할게요
    Back off, back off
    이대로 좋아요
    Balance, balance
    It's me 나예요, 다를 거 없이
    요즘엔 뭔가요, 내 gossip?
    탐색하는 불빛
    Scanner, scanner
    오늘은 몇 점인가요?
    Jealous, jealous
    쟤는 대체 왜 저런 옷을 좋아한담?
    기분을 알 수 없는 저 표정은 뭐람?
    태가 달라진 건 아마 stress 때문인가?
    걱정이야, 쟤도 참
    Yellow C-A-R-D (oh-oh)
    이 선 넘으면 침범이야 beep (oh-oh)
    매너는 여기까지 it's mi-mi-mi-mine
    Please keep the li-li-li-line
    Hello, stu-P-I-D (oh-oh)
    그 선 넘으면 정색이야 beep (oh-oh)
    Stop it 거리 유지해
    'Cause we don't know, know, know, know
    Comma, we don't owe, owe, owe, owe (anyth-anything)
    Oh, oh, oh
    I don't care 당신의 비밀이 뭔지
    저마다의 사정 역시
    정중히 사양할게요
    Not my business
    이대로 좋아요
    Talk, talk less
    Still me 또 예요, 놀랄 거 없이
    I'm sure you're gonna say "My gosh"
    바빠지는 눈빛 check-checking
    매일 틀린 그림 찾기 oh, hashtagging
    꼿꼿하게 걷다가 삐끗 넘어질라
    다들 수군대는 걸 자긴 아나 몰라?
    요새 말이 많은 걔랑 어울린다나?
    문제야, 쟤도 참
    Yellow C-A-R-D (oh-oh)
    이 선 넘으면 침범이야 beep (oh-oh)
    매너는 여기까지 it's mi-mi-mi-mine
    Please keep the li-li-li-line
    Hello, stu-P-I-D (oh-oh)
    그 선 넘으면 정색이야 beep (oh-oh)
    Stop it 거리 유지해
    'Cause we don't know, know, know, know
    Comma, we don't owe, owe, owe, owe (anyth-anything)
    편하게 하지 뭐
    어, 거기 너, 말 알아들어? (어?)
    I don't believe it
    에이, 아직 모를 걸
    내 말 틀려? 또 나만 나뻐? (어? 어?)
    I don't believe it
    깜빡이 켜, 교양이 없어 너
    Knock, knock, knock, knock, enough
    더 상대 안 해 block, block, block, block
    잘 모르겠으면 이젠 좀 외워 babe
    Repeat, repeat
    참 쉽지 right?
    Yellow C-A-R-D (bbi, bbi, bbi)
    이 선 넘으면 침범이야 beep (beep, beep)
    매너는 여기까지 it's mi-mi-mi-mine
    Please keep the li-li-li-line
    Hello, stu-P-I-D (bbi, bbi, bbi)
    그 선 넘으면 정색이야 beep (oh-oh)
    Stop it 거리 유지해
    'Cause we don't know, know, know, know
    Comma, we don't owe, owe, owe, owe (anyth-anything)`,
        musicVideoUrl: "/videos/sample2.mp4",
        thumbnailUrl: "/thumbnails/sample2.jpg",
    },
    {
        id: 3,
        title: "Armageddon",
        artist: "Aespa",
        lyrics: `Armageddon
Shoot
I'ma get 'em
Shoot
Watch, uh (hey)
I'ma bite back, uh
짙은 어둠이 막아설 땐 uh
한 걸음 앞으로 날아든 it's bad
사라진 feedback 시작된 code black, huh
깊어가, 혼란스러운 밤
악몽은 또 짙게 번져가
뭔갈 숨기려고 해
I got it, I got it
혼돈을 타고 덮쳐 killing like
Bang, chitty bang bang, chitty bang bang
'Cause I wanna see, I wanna see truly
Bang, chitty bang bang, chitty bang bang
내게 다가와, 다가와
I'ma get it
Done (oh-eyo-eyo)
널 향해 겨눠 get it, gone (oh-eyo-eyo)
이젠 널 끝내 better run
끝을 모르는 너와 나 you gonna, gonna
깨트려 거침없이 done (go way up, way up)
Full shot, pull it up Armageddon
I'ma get 'em
Shoot
I'ma get 'em
Hey ya
또 다른 나
우릴 막지 마
We never play nice
Shoot (mm)
완벽한 pair 넌 똑같은 soul
Three to get ready 우린 shoot and go
겁 없이 누벼 날 이끄는 way
Bang, chitty bang bang, chitty bang bang
Yes, I'm gonna see, I'm gonna see, want it
Bang, chitty bang bang, chitty bang bang
답이 들려와, 들려와
I'ma get it
Done (oh-eyo-eyo)
널 향해 겨눠 get it, gone (oh-eyo-eyo)
이젠 널 끝내 better run
끝을 모르는 너와 나 you gonna, gonna
깨트려 거침없이 done (go way up, way up)
Full shot, pull it up Armageddon
I'ma get 'em
또 어둠을 몰아내고
시작을 꽃피운 너와 나의 story
더 완벽해진 우리 (Armageddon)
정의해 이젠 나만의 complete
내 모든 걸 이끌어 do it all myself
완전한 나를 이뤄내 ooh
Throw it back, throw it back, throw it back
Born like a queen, born like a king, ya
Throw it back, throw it back, throw it back
불러
I'ma get 'em
Done (oh-eyo-eyo)
널 향해 겨눠 get it, gone (oh-eyo-eyo)
이젠 널 끝내 better run
끝을 모르는 너와 나 you gonna, gonna
깨트려 거침없이 done (go way up, way up)
Full shot, pull it up Armageddon
Armageddon
(Oh-eyo-eyo-eyo, warning all night long)
Armageddon
(Oh-eyo-eyo)
끝과 시작의 Armageddon`,
        musicVideoUrl: "/videos/sample3.mp4",
        thumbnailUrl: "/thumbnails/sample3.jpg",
    },
];

const popSongs = [
    {
        id: 1,
        title: "Power", // 노래 제목 추가
        artist: "G-Dragon",
        lyrics: "이 노래의 첫 번째 가사입니다.",
        musicVideoUrl: "/videos/sample1.mp4",
        thumbnailUrl: "/thumbnails/sample1.jpg",
    },
    // 다른 노래 샘플
    {
        id: 2,
        title: "BBI BBI",
        artist: "IU",
        lyrics: "이 노래의 두 번째 가사입니다.",
        musicVideoUrl: "/videos/sample2.mp4",
        thumbnailUrl: "/thumbnails/sample2.jpg",
    },
    {
        id: 3,
        title: "Armageddon",
        lyrics: "이 노래의 세 번째 가사입니다.",
        artist: "Aespa",
        musicVideoUrl: "/videos/sample3.mp4",
        thumbnailUrl: "/thumbnails/sample3.jpg",
    },
];

function Home() {
    const [currentSong, setCurrentSong] = useState(null);
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showLyrics, setShowLyrics] = useState(false); // 가사 표시 상태
    const [songData, setSongData] = useState([]);
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const data = await getSong();
                setSongData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSong();
    }, []);

    const handlePlay = (song) => {
        setCurrentSong(song);
        setIsVideoVisible(true);
        setIsPlaying(true);

        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.onloadedmetadata = () => {
                    setDuration(videoRef.current.duration);
                };
                videoRef.current.play();
            }
        }, 100);
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh", // 전체 높이를 고정
                overflow: "hidden", // 전체 화면 스크롤 방지
            }}
        >
            <Box sx={{ position: "sticky", top: 0, zIndex: 2 }}>
                <TopSearchBar />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "space-around",
                }}
            >
                <Box sx={{ position: "sticky", top: 0, zIndex: 1 }}>
                    <SideBar />
                </Box>

                {/* Content Area */}
                <Box
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        display: "flex",
                        gap: 2,
                        backgroundColor: "#f5f5f5",
                        position: "relative", // 추가
                    }}
                >
                    {/* 항상 보이는 음악 리스트 */}
                    <Box
                        sx={{
                            width: "100%",
                            overflowY: "auto",
                            maxHeight: "calc(100vh - 100px)",
                        }}
                    >
                        <SongList
                            songs={sampleSongs}
                            popsongs={popSongs}
                            onSongSelect={handlePlay}
                        />
                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            left: 0,
                            top: 0,
                            display: "flex",
                            gap: 2,
                            p: 2,
                            transform: isVideoVisible
                                ? "translateY(0)"
                                : "translateY(100%)",
                            transition: "transform 0.3s ease-in-out",
                            backgroundColor: "#f5f5f5",
                            zIndex: 1,
                        }}
                    >
                        <Box
                            sx={{
                                width: "60%",
                                display: isVideoVisible ? "flex" : "none", // 원래 코드의 조건 유지
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <video
                                ref={videoRef}
                                src={
                                    currentSong ? currentSong.musicVideoUrl : ""
                                }
                                width="100%"
                                style={{
                                    display: isVideoVisible ? "block" : "none",
                                }} // 원래 코드의 style 유지
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            />
                        </Box>

                        <Box
                            sx={{
                                width: isVideoVisible ? "40%" : "100%", // 원래 코드의 조건 유지
                                overflowY: "auto",
                                maxHeight: "calc(100vh - 100px)",
                                backgroundColor: "#fff",
                                borderRadius: 2,
                                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                p: 2,
                            }}
                        >
                            {currentSong && isVideoVisible ? (
                                <CurrentSongLyrics currentSong={currentSong} />
                            ) : (
                                <SongList
                                    songs={sampleSongs}
                                    popsongs={popSongs}
                                    onSongSelect={handlePlay}
                                />
                            )}
                        </Box>
                    </Box>

                    {/* 슬라이딩되는 비디오/가사 컨테이너 */}
                    {currentSong && (
                        <Box
                            sx={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                bottom: 0,
                                height: "100%",
                                backgroundColor: "#f5f5f5",
                                display: "flex",
                                gap: 2,
                                transform: isVideoVisible
                                    ? "translateY(0)"
                                    : "translateY(100%)",
                                transition: "transform 0.3s ease-in-out",
                                zIndex: 1,
                                p: 3, // 전체 컨테이너 패딩
                            }}
                        >
                            <Box
                                sx={{
                                    width: "60%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                }}
                            >
                                <video
                                    ref={videoRef}
                                    src={currentSong.musicVideoUrl}
                                    width="100%"
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    style={{
                                        borderRadius: 8, // 비디오에도 둥근 모서리 적용
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    width: "40%",
                                    overflowY: "auto",
                                    p: 2, // 가사 컨테이너 패딩
                                    backgroundColor: "#fff", // 배경색 추가
                                    borderRadius: 2, // 모서리 둥글게
                                    boxShadow: "0 0 10px rgba(0,0,0,0.1)", // 그림자 효과
                                }}
                            >
                                <CurrentSongLyrics currentSong={currentSong} />
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box sx={{ position: "sticky", top: 0, zIndex: 2 }}>
                <BottomBar
                    videoRef={videoRef}
                    currentSong={currentSong}
                    isVideoVisible={isVideoVisible}
                    setIsVideoVisible={setIsVideoVisible}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    togglePlayPause={togglePlayPause}
                />
            </Box>
        </Box>
    );
}

export default Home;
