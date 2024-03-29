


export const InputRegex = {
    LoginEmail : /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // 로그인 이메일 정규식
    LoginPassword : /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, // 로그인 비밀번호 
    
    TwoPointerTarget : /^\d$/, // 1자리 숫자를 나타내는 정규식
    TwoPointerArr : /^\d{1,100}$/, // 100자리 숫자를 나타내는 정규식
    
    SlidingWindowRange : /^\d$/, // 1자리 숫자를 나타내는 정규식
    SlidingWindowArr : /^\d{1,100}$/, // 100자리 숫자를 나타내는 정규식

    DateyyyyMMdd :/^\d{4}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])$/, // yyyyMMdd 날짜

    AesIv : /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{16}$/, // aesIv 16 바이트 
    AesKey : /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{32}$/, // aesKey 32 바이트 

    UrlPath : /^\/[\w\-\/]+$/

}
