function toggleContent(contentId) {
    // 모든 콘텐츠를 숨김
    var contents = document.querySelectorAll('.content');
    contents.forEach(function(content) {
        content.style.display = 'none';
    });

    // 클릭된 메뉴의 콘텐츠만 표시
    var selectedContent = document.getElementById(contentId);
    selectedContent.style.display = 'block';

    // 모든 메뉴 항목에서 'selected' 클래스를 제거
    var menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(function(item) {
        item.classList.remove('selected');
    });

    // 클릭된 메뉴 항목에 'selected' 클래스 추가
    var selectedMenuItem = document.querySelector(`.menu-item[onclick="toggleContent('${contentId}')"]`);
    selectedMenuItem.classList.add('selected');
}

// 페이지 이동을 위한 함수
function goToNextPage(page, title) {
    // URL 파라미터로 제목을 인코딩하여 전달
    const encodedTitle = encodeURIComponent(title);
    window.location.href = `${page}?title=${encodedTitle}`;
}
document.getElementById('header-logo').addEventListener('click', () => {
    window.location.href = '../main.html'; // Adjust path as needed
});