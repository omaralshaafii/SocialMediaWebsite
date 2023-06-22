// Global vars
postContainer = document.getElementById("posts");

function getPosts(num) {
  axios.get(`${baseUrl}/posts?page=${num}`).then((response) => {
    currentPage = response.data.meta.current_page;
    lastPage = response.data.meta.last_page;

    let posts = response.data.data;
    console.log(posts);

    // Add posts to the page
    addPostsToPage(posts);
  });
}

getPosts(1);

// Add posts to the page function
function addPostsToPage(posts) {
  for (let i = 0; i < posts.length; i++) {
    let content = `
    <div class="card mt-4 shadow">
    <div class="card-header d-flex" style="justify-content: space-between;">

    <div class="authorInfo">
    ${handelUserImage(posts[i].author.profile_image)}
      <b>@${posts[i].author.username}</b>
    </div>

    ${checkPostOwner(
      posts[i].author.id,
      posts[i].id,
      posts[i].title,
      posts[i].body,
      posts[i].image
    )}

    </div>
    <div  onclick="goPostDetails(${
      posts[i].id
    })" class="card-body thePostBody" style="cursor: pointer;">
    ${handelPostImage(posts[i].image)}
      <h6 class="mt-2" style="color: rgba(0, 0, 0, 0.555)">
        ${posts[i].created_at}
      </h6>

      <h4>${posts[i].title || ""}</h4>

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
    // TODO: show post tags

    postContainer.innerHTML += content;
  }
}

// Show user photo or defult photo
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

// Handel post photo
function handelPostImage(theImage) {
  if (!theImage.length == 0) {
    return `<img
    src=${theImage}
    alt="Post Photo"
    class="img-fluid rounded"
    style="width: 100%; max-height: 400px;"
;
  />`;
  } else {
    return ``;
  }
}

// Post new post
function newPost() {
  let formData = new FormData();

  let postTitle = document.getElementById("post-title").value;
  let postBody = document.getElementById("post-body").value;
  let postImage = document.getElementById("post-image").files[0];

  formData.append("title", postTitle);
  formData.append("body", postBody);
  //make post without imge allowed
  if (postImage != undefined) {
    formData.append("image", postImage);
  }

  let headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  axios
    .post(`${baseUrl}/posts`, formData, { headers: headers })
    .then((response) => {
      console.log(response);

      // Close modal
      document.getElementById("post-modal-closer").click();

      // show success login alert
      showAlert("Post uploaded successfully!");

      // Show the new post at the home page after the sendding the post
      postContainer.innerHTML = "";
      getPosts(1);
    })
    .catch((error) => {
      console.log(error);

      let errorMsg = error.response.data.message;

      document.getElementById("newpost-error").textContent = `${errorMsg}
  `;
    });
}

document.getElementById("addPostBtn").addEventListener("click", newPost);

// Infinite scrolling
window.addEventListener("scroll", () => {
  let isEnd;
  function isEndOfPage() {
    const scrollPosition = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );

    // Check if the user has reached the end of the page
    isEnd =
      scrollPosition + window.innerHeight >=
      document.documentElement.scrollHeight;
  }

  isEndOfPage();

  if (isEnd && currentPage <= lastPage) {
    getPosts(currentPage + 1);
  }
});

// Go to details of the post
function goPostDetails(postId) {
  window.location = `postDetails.html?id=${postId}`;
}

// Check the owner of the post
