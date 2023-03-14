
export const links = [
        {
            name: '암호화', submenu: true, sublink: [
                {
                    Head: "AES 암호화",
                    sublink: [
                        { name: "AES 키생성", link: "/" },
                        { name: "AES 암호화", link: "/" },
                        { name: "AES 복호화", link: "/" },
                    ]
                },
                {
                    Head: "RSA 암호화",
                    sublink: [
                        { name: "RSA 키생성", link: "/" },
                        { name: "RSA 암호화", link: "/" },
                        { name: "RSA 복호화", link: "/" },
                    ]
                },
            ]
        },
        { name: '유틸', submenu: true, sublink: [
            {
                Head: "시간",
                sublink: [
                    { name: "요일 구하기", link: "/" },
                    { name: "날짜 차이 계산", link: "/" },
                ]
            },
            {
                Head: "문자",
                sublink: [
                    { name: "글자 바이트 구하기", link: "/" },
                    { name: "한글 초성 추출", link: "/" },
                    { name: "글자 수 확인", link: "/" },
                    { name: "대소문자 변경", link: "/" },
                    { name: "문자열 유사성 확인", link: "/" },
                ]
            },
            {
                Head: "기타",
                sublink: [
                    { name: "나의 아이피 확인", link: "/" },
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
                    { name: "투 포인트 알고리즘", link: "/" },
                    { name: "슬라이딩 윈도우", link: "/" },
                ]
            },
            {
                Head: "그래프이론",
                sublink: [
                    { name: "BFS", link: "/" },
                    { name: "DFS", link: "/" },
                ]
            },
        ]
    },
]
