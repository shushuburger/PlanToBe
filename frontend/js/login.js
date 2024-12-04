document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 동작 방지
    
    // 아이디와 비밀번호 입력값 가져오기
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 간단한 검증 로직 (예제용)
    if (username === "test" && password === "1234") {
        alert("로그인 성공!");
    } else {
        alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
    }
});
