document.addEventListener("DOMContentLoaded", () => {
    const post = JSON.parse(localStorage.getItem("selectedPost"));

    if (!post) {
        alert("게시글 데이터를 불러올 수 없습니다.");
        window.location.href = "../communitylist/communitylist.html";
        return;
    }

    document.getElementById("detail-title").textContent = post.title;
    document.getElementById("detail-date").textContent = `날짜: ${post.date}`;
    document.getElementById("detail-author").textContent = `글쓴이: ${post.author}`;
    document.getElementById("detail-content").textContent = post.content;

    if (post.photo && post.photo !== "사진 없음") {
        const photoElement = document.getElementById("detail-photo");
        photoElement.src = post.photo;
        photoElement.style.display = "block";
    }

    const commentSection = document.getElementById("comments");
    const comments = JSON.parse(localStorage.getItem("comments")) || {};
    const postComments = comments[post.title] || [];

    function renderComments() {
        commentSection.innerHTML = "";
        postComments.forEach(comment => {
            const commentElement = document.createElement("p");
            commentElement.textContent = comment;
            commentSection.appendChild(commentElement);
        });
    }

    renderComments();

    document.getElementById("add-comment-button").addEventListener("click", () => {
        const commentInput = document.getElementById("comment-input");
        const commentText = commentInput.value.trim();

        if (commentText === "") {
            alert("댓글을 입력하세요.");
            return;
        }

        postComments.push(commentText);
        comments[post.title] = postComments;
        localStorage.setItem("comments", JSON.stringify(comments));

        commentInput.value = "";
        renderComments();
    });

    document.getElementById("back-button").addEventListener("click", () => {
        window.location.href = "../communitylist/communitylist.html";
    });

    document.getElementById("delete-button").addEventListener("click", () => {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        const selectedPost = JSON.parse(localStorage.getItem("selectedPost"));

        if (!selectedPost) {
            alert("게시글 데이터를 찾을 수 없습니다.");
            return;
        }

        const updatedPosts = posts.filter(post => post.title !== selectedPost.title || post.date !== selectedPost.date);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
        localStorage.removeItem("selectedPost");

        alert("게시글이 삭제되었습니다.");
        window.location.href = "../communitylist/communitylist.html";
    });

    const logo = document.getElementById("logo");
    logo.addEventListener("click", () => {
        window.location.href = "../main.html";
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