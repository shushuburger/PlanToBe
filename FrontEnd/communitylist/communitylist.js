document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("post-table-body");
    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    if (posts.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='3'>등록된 게시글이 없습니다.</td></tr>";
    } else {
        posts.forEach((post, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${post.date}</td>
                <td><a href="#" class="post-link" data-index="${index}">${post.title}</a></td>
                <td>${post.author}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    document.querySelectorAll(".post-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const index = e.target.getAttribute("data-index");
            const selectedPost = posts[index];
            localStorage.setItem("selectedPost", JSON.stringify(selectedPost));
            window.location.href = "../communitydetail/communitydetail.html";
        });
    });
});
document.getElementById("write-post-btn").addEventListener("click", () => {
    window.location.href = "../communitywriting/communitywriting.html";
});
document.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("logo");
    
    logo.addEventListener("click", () => {
        window.location.href = "../main.html";  // 메인 화면으로 이동
    });
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