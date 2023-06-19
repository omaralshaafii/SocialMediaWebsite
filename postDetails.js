let UrlParams = new URLSearchParams(window.location.search);
let postId = UrlParams.get("id");
let postElement = document.getElementById("post");

function getPost() {
  axios
    .get(`${baseUrl}/posts/${postId}`)
    .then((response) => {
      let post = response.data.data;
      console.log(post);

      // Add post to the page
      addPostToPage(post);
    })
    .catch((error) => {
      console.log(error);
      postElement.innerHTML = `
      <h3 class="mt-5">${error.message}</h3>
      `;
    });
}

getPost();

// Add post to the page function
function addPostToPage(post) {
  let content = `

  <div class="card mt-4 shadow">
  <div class="card-header">
    ${handelUserImage(post.author.profile_image)}

    <b>@${post.author.username}</b>
  </div>
  <div
    onclick="goPostDetails(${post.id})"
    class="card-body thePostBody"
    style="cursor: pointer"
  >
    ${handelPostImage(post.image)}
    <h6 class="mt-2" style="color: rgba(0, 0, 0, 0.555)">
      ${post.created_at}
    </h6>

    <h4>${post.title || ""}</h4>

    <p>${post.body}</p>

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
      <span>(${post.comments_count}) Comments</span>
    </div>
    <hr />

    <div id=comments">${handelComments(post.comments)}</div>
    
    <div class="input-group mt-3">
      <input
        type="text"
        class="form-control"
        placeholder="Comment..."
        aria-describedby="basic-addon2"
      />
      <button class="btn btn-success">Comment</button>
    </div>
  </div>
</div>
`;
  // TODO: show post tags

  postElement.innerHTML = content;
  console.log(post.comments);
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

function handelComments(comments) {
  let commentsContainer = document.createElement("div");
  commentsContainer.setAttribute("id", "comments");

  for (let i = 0; i < comments.length; i++) {
    let commentContent = `
        <div class="comment mt-3">
        <div class="commenter mb-2">
          <img src="${
            comments[i].author.profile_image.length > 0
              ? comments[i].author.profile_image
              : "profile-pics/1.png"
          }" alt="UserImage" class="rounded-circle" style="width: 50px; height: 50px;" />
          <span>@${comments[i].author.username}</span>
        </div>
        <div class="commentInfo">${comments[i].body}</div>
      </div>
        `;
    commentsContainer.innerHTML += commentContent;
  }
  return `${commentsContainer.innerHTML}`;
}

/**
 
    width: 50px;
    height: 50px;
    border-radius: 50%;

 */
