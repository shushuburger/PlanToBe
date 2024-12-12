document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 동작 방지
    
    // 아이디와 비밀번호 입력값 가져오기
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        alert("로그인 성공!");
        // 메인 페이지로 이동
        window.location.href = '../main.html';
    } else {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
});
