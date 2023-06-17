// Global vars
let baseUrl = "https://tarmeezacademy.com/api/v1",
  postContainer = document.getElementById("posts");
const navBtnsLogedout = document.getElementById("nav-btns-logedout");
const navBtnsLogedIn = document.getElementById("nav-btns-logedin");

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
    style="width: 100%";
  />`;
  } else {
    return ``;
  }
}

// Login function
function login() {
  axios
    .post(`${baseUrl}/login`, {
      username: `${username.value}`,
      password: `${password.value}`,
    })
    .then(function (response) {
      console.log(response);

      // Save token in localstorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Close modal
      document.getElementById("login-moda-closer").click();

      // Setup UI for loged in user
      setupUI();

      // show success login alert
      showAlert("Nice, you loged in successfuly!");
    })
    .catch(function (error) {
      console.log(error);

      let errorMsg = error.response.data.message;

      document.getElementById("login-error").innerHTML = `
      <span style="color: red">${errorMsg}</span>
      `;
    });
}

// Show  notification alert
function showAlert(msg) {
  const alertPlaceholder = document.getElementById("theAlert");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };

  appendAlert(msg, "success");

  // TODO: Hide alert after 3 sec

  // setTimeout(() => {
  //   const alert = bootstrap.Alert.getOrCreateInstance("#theAlert");
  //   alert.close();
  // }, 3000);
}

// Setup UI for loged in user function
function setupUI() {
  const token = localStorage.getItem("token");

  if (token) {
    // Add logout & username & photo in nav
    navBtnsLogedout.style.display = "none";
    navBtnsLogedIn.style.display = "block";

    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);

    // Add user photo to nav
    const userImage = userInfo.profile_image;
    document
      .querySelector("#nav-btns-logedin img")
      .setAttribute(
        "src",
        userImage.length > 0 ? userImage : "profile-pics/1.png"
      );

    // Add username
    document.querySelector(
      "#nav-btns-logedin b"
    ).innerHTML = `@${userInfo.username}`;
  }
}

setupUI();

// Logout function
function logout() {
  localStorage.clear();
  navBtnsLogedIn.style.display = "none";
  navBtnsLogedout.style.display = "block";
  showAlert("You loged out successfuly!");
}

// Register function
function register() {
  let parames = {
    username: regUsername.value,
    name: regName.value,
    password: regPassword.value,
  };

  axios
    .post(`${baseUrl}/register`, parames)
    .then((response) => {
      console.log(response);

      // Save token in localstorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Close modal
      document.getElementById("register-moda-closer").click();

      // Setup UI for loged in user
      setupUI();

      // show success login alert
      showAlert("You have created the account successfully!");
    })
    .catch(function (error) {
      console.log(error);

      let errorMsg = error.response.data.message;

      document.getElementById("register-error").innerHTML = `
    <span style="color: red">${errorMsg}</span>
    `;
    });
}

