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
            window.location.href = "communitydetail.html";
        });
    });
});
document.getElementById("write-post-btn").addEventListener("click", () => {
    window.location.href = "communitywriting.html";
});
