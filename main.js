let baseUrl = "https://tarmeezacademy.com/api/v1",
  postContainer = document.getElementById("posts");

axios.get(`${baseUrl}/posts?limit=15`).then((response) => {
  let posts = response.data.data;
  console.log(posts);

  // Add posts to the page
  addPosts(posts);
});

// Add posts to the page function
function addPosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    let content = `
    <div class="card mt-4 shadow">
    <div class="card-header">

    ${handelUserImage(posts[i].author.profile_image)}

      <b>@${posts[i].author.username}</b>
    </div>
    <div class="card-body">
    ${handelPostImage(posts[i].image)}
      <h6 class="mt-2" style="color: rgba(0, 0, 0, 0.555)">
        ${posts[i].created_at}
      </h6>

      <h4>${posts[i].title}</h4>

      <p>${posts[i].body}</p>

      <hr />

      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-pen"
          viewBox="0 0 16 16"
        >
          <path
            d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
          />
        </svg>
        <span>(${posts[i].comments_count}) Comments</span>
      </div>
    </div>
  </div>
    `;

    postContainer.innerHTML += content;
  }
}

function handelUserImage(userImage) {
  if (userImage.length > 0) {
    return `
    <img
    src=${userImage}
    alt="User Photo"
    class="rounded-circle border border-2"
    style="height: 50px; width: 50px"
  />`;
  } else {
    return `
    <img
    src="profile-pics/1.png"
    alt="User Photo"
    class="rounded-circle border border-2"
    style="height: 50px; width: 50px"
  />`;
  }
}

function handelPostImage(theImage) {
  if (!theImage.length == 0) {
    return `<img
    src=${theImage}
    alt="Post Photo"
    class="img-fluid rounded"
  />`;
  } else {
    return ``;
  }
}
