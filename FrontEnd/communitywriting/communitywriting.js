document.getElementById("submit").addEventListener("click", () => {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const photoInput = document.getElementById("photo");
    const photoFile = photoInput.files[0];

    if (!title || !content) {
        alert("제목과 내용을 입력하세요.");
        return;
    }

    const post = {
        title,
        content,
        photo: null,
        date: new Date().toLocaleDateString("ko-KR"),
        author: "익명"
    };

    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            post.photo = e.target.result;

            savePost(post);
        };
        reader.readAsDataURL(photoFile);
    } else {
        savePost(post);
    }
});

function savePost(post) {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("게시글이 등록되었습니다.");
    window.location.href = "../communitylist/communitylist.html";
}
