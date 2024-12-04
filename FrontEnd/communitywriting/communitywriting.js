document.getElementById("submit").addEventListener("click", () => {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const photo = document.getElementById("photo").files[0];

    if (!title || !content) {
        alert("제목과 내용을 입력하세요.");
        return;
    }

    const post = {
        title,
        content,
        photo: photo ? photo.name : "사진 없음",
        date: new Date().toLocaleDateString("ko-KR"),
        author: "익명"
    };

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("게시글이 등록되었습니다.");
    window.location.href = "communitylist.html"; 
});
