

document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("GreenSpace JS imported successfully!");
  },
  false
);

// // ###########   Cloudinary Upload Widget for User profile image      ###########

var myWidget = cloudinary.createUploadWidget({
    cloudName: "dmlqhwwfc",
    uploadPreset: "umqopfpp",
    sources: ["local", "url", "camera", "facebook", "instagram"],
    styles: {
      palette: {
        window: "#F5F5F5",
        sourceBg: "#FFFFFF",
        windowBorder: "#74A772",
        tabIcon: "#65A747",
        inactiveTabIcon: "#91B390",
        menuIcons: "#3BA736",
        link: "#65A747",
        action: "#65A747",
        inProgress: "#0194c7",
        complete: "#74A772",
        error: "#c43737",
        textDark: "#65A747",
        textLight: "#FFFFFF"
      },
      fonts: {
        default: null,
        "'Poppins', sans-serif": {
          url: "https://fonts.googleapis.com/css?family=Poppins",
          active: true
        }
      }
    }
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      // send secure url to the backend to the route /user
      //import axios
      let profileImage = result.info.secure_url;
      axios.post("/user/:userId/profile-image", {
          profileImage
        })
        .then(res => {
          let profileImage = document.querySelector('.profile-image')
          profileImage.src = result.info.secure_url;
        });
    }
  }
);

let uploadButton = document.getElementById("upload_widget");
if (uploadButton) {
  uploadButton.addEventListener(
    "click",
    function () {
      myWidget.open();
    },
    false
  );
}

// // ###########   Cloudinary Upload Widget for GreenSpace  images    ###########

var greenSpaceWidget = cloudinary.createUploadWidget({
    cloudName: "dmlqhwwfc",
    uploadPreset: "umqopfpp",
    sources: ["local", "url", "camera", "facebook", "instagram"],
    styles: {
      palette: {
        window: "#F5F5F5",
        sourceBg: "#FFFFFF",
        windowBorder: "#74A772",
        tabIcon: "#65A747",
        inactiveTabIcon: "#91B390",
        menuIcons: "#3BA736",
        link: "#65A747",
        action: "#65A747",
        inProgress: "#0194c7",
        complete: "#74A772",
        error: "#c43737",
        textDark: "#65A747",
        textLight: "#FFFFFF"
      },
      fonts: {
        default: null,
        "'Poppins', sans-serif": {
          url: "https://fonts.googleapis.com/css?family=Poppins",
          active: true
        }
      }
    }
  },
  (error, result) => {
    console.log(result.event)
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      // send secure url to the backend to the route /greenspace:id
      //import axios
      let greenSpaceImage = result.info.secure_url;
      axios.post("/image/greenspace-image", {
        greenSpaceImage
      })
    }
    if (result && result.event === "close") {
      window.location.reload()
    }
  }
);

let greenUploadButton = document.getElementById("upload_greenspace_widget");
if (greenUploadButton) {
  greenUploadButton.addEventListener(
    "click",
    function () {
      greenSpaceWidget.open();
    },
    false
  );
}

//   ####### CHECK IF FORM FOR NEW GREENSPACE IS FULLY FILLED IN #######

const formCheck = event => {
  let formIDs = ["name", "lat", "lng"];

  let tagArray = Array.from(document.querySelectorAll("#tags")).map(
    tag => tag.checked
  );
  console.log(tagArray);
  formIDs.forEach(ids => {
    if (
      document.getElementById(ids).value === "" ||
      document.getElementById(ids).value === undefined
    ) {
      event.preventDefault();
      document.querySelector(".form-error").innerText =
        "Please choose a name and set the marker location.";
    } else if (!tagArray.includes(true)) {
      event.preventDefault();
      document.querySelector(".form-error").innerText =
        "Please select at least one tag.";
    } else {
      document.getElementById("form-button").setAttribute = ("type", "submit");
    }
  });
};

//   ####### CHECK IF COMMENT FORM  IS FILLED IN #######

const commentFormCheck = event => {
  let commentId = "comment";
  if (document.getElementById(commentId).value === "") {
    event.preventDefault();
    document.querySelector(".comment-error").innerText =
      "Please type your comment.";
  } else {
    document.getElementById("form-button").setAttribute = ("type", "submit");
  }
};



//   ####### FAVOURITE BUTTON -- ADD GREENSPACE TO FAVOURITE LIST OF USER  #######


function sendId(e) {
  e.preventDefault();
  let value = document.getElementById('favourit').value
  document.getElementById('fav-star').setAttribute("src", "/images/star_golden.png");
  document.querySelector(".favourite-added").innerText =
    "Added to Favourites.";
  axios.post(`/greenspace/favorite/${value}`, {
    value
  })
}