
export const links = [
        {
            name: '암호화', submenu: true, sublink: [
                {
                    Head: "AES",
                    sublink: [
                        { name: "암호화 알고리즘", link: "/encrypt/aes" },
                    ]
                },
                {
                    Head: "RSA 암호화",
                    sublink: [
                        { name: "암호화 알고리즘", link: "/encrypt/rsa" },
                    ]
                },
            ]
        },
        { name: '유틸', submenu: true, sublink: [
            {
                Head: "시간",
                sublink: [
                    { name: "요일 구하기", link: "/util/time/dayoftheweek" },
                    { name: "날짜 차이 계산", link: "/util/time/timecalculate" },
                ]
            },
            {
                Head: "문자",
                sublink: [
                    { name: "텍스트 도구", link: "/util/text/textutil" },
                    { name: "문자열 유사성 확인", link: "/util/text/textsimilarity" },
                ]
            },
            {
                Head: "기타",
                sublink: [
                    { name: "나의 아이피 확인", link: "/util/ip/my" },
                ]
            },
            {
                Head: "SQL",
                sublink: [
                    { name: "Coming Soon", link: "/" },
                ]
            },
        ]
    },
        { name: '알고리즘', submenu: true, sublink: [
            {
                Head: "Basic",
                sublink: [
                    { name: "투 포인트 알고리즘", link: "/algorithm/basic/twopoint" },
                    { name: "슬라이딩 윈도우", link: "/algorithm/basic/slidingwindow" },
                ]
            },
            {
                Head: "그래프이론",
                sublink: [
                    { name: "BFS", link: "/algorithm/graph/bfs" },
                    { name: "DFS", link: "/" },
                ]
            },
        ]
    },
]
