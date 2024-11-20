document.addEventListener("DOMContentLoaded", () => {
    const post = JSON.parse(localStorage.getItem("selectedPost"));

    if (!post) {
        alert("게시글 데이터를 불러올 수 없습니다.");
        window.location.href = "communitylist.html";
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

    document.getElementById("back-button").addEventListener("click", () => {
        window.location.href = "communitylist.html";
    });
});
