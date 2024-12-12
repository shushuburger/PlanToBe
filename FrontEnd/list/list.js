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

const searchInput = document.getElementById("searchInput");        
searchInput.addEventListener("keyup", function (event) {
    // Enter 키가 눌렸을 때만 동작
    if (event.key === "Enter") {
        const searchQuery = searchInput.value.trim().toLowerCase(); // 공백 제거 및 소문자 변환

        if (searchQuery.length > 0) {
            // 로컬스토리지에서 plantData 가져오기
            const plantData = JSON.parse(localStorage.getItem("plantData"));

            // plantData가 존재하고, 그 key들만 뽑아서 리스트로 만들기
            const plantKeys = plantData ? Object.keys(plantData) : [];

            // plantKeys에서 searchQuery와 일치하는 키가 있는지 확인
            const foundKey = plantKeys.find(key => key.toLowerCase().includes(searchQuery));

            if (foundKey) {
                // 식물이 존재하면 plant_detail.html로 이동하며 정보를 전달
                window.location.href = `../plant_detail/plant_detail.html?plant=${encodeURIComponent(foundKey)}`;
            } else {
                // 일치하는 식물이 없으면 실패 메시지 출력
                alert("식물 정보가 존재하지 않습니다.");
            }
        }
    }
});