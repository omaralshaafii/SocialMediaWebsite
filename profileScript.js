let UrlParams = new URLSearchParams(window.location.search);
let userId = UrlParams.get("userId");
let thePostsContainer = document.getElementById("posts");

// Elements
let PhotoElement = document.querySelector(".card-body .photo img");
let nameElement = document.querySelector(".card-body .main-info .name");
let usernameElement = document.querySelector(".card-body .main-info .username");
let postsCountElement = document.querySelector(
  ".card-body .statistics .postsCount .num"
);
let commentsCountElement = document.querySelector(
  ".card-body .statistics .commentsCount .num"
);

// Get user's info

function getUserInfo() {
  axios.get(`${baseUrl}/users/${userId}`).then((response) => {
    addUserInfo(response.data.data);
  });
}

// Add user info to the page
function addUserInfo(response) {
  PhotoElement.setAttribute(
    "src",
    `${
      response.profile_image.length != undefined
        ? response.profile_image
        : "profile-pics/1.png"
    }`
  );
  console.log(response.profile_image);

  nameElement.innerHTML = response.name;
  usernameElement.innerHTML = "@" + response.username;

  postsCountElement.innerHTML = response.posts_count;
  commentsCountElement.innerHTML = response.comments_count;
}

getUserInfo();

// Get user's posts
function getUserPosts() {
  axios.get(`${baseUrl}/users/${userId}/posts`).then((response) => {
    console.log(response.data.data);
    addUserPostToPage(response.data.data);
  });
}

// Add user posts to the page

function addUserPostToPage(posts) {
  for (let i = posts.length - 1; i >= 0; i--) {
    let content = `
        <div class="card mt-4 shadow">
        <div class="card-header d-flex justify-content-between">
    
        <div class="authorInfo" data-userId"${
          posts[i].id
        }" style="justify-content: space-between; cursor: pointer;" onclick = "goToProfile(${
      posts[i].author.id
    })">
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

    thePostsContainer.innerHTML += content;
  }
}

getUserPosts();

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
