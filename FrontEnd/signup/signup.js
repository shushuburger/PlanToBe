document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 동작 방지

    // 입력 필드 값 가져오기
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    const userData = {
        username: username,
        password: password,
        phone: phone,
        email: email
    };

    localStorage.setItem('user', JSON.stringify(userData));

    // 간단한 폼 검증 후 알림창 표시
    alert("회원가입 성공!\n아이디: " + username + "\n이메일: " + email + "\n전화번호: " + phone);
    
    window.location.href = '../login/login.html';
});
