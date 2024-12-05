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