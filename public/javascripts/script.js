// document.addEventListener(
//   "DOMContentLoaded",
//   () => {
//     console.log("IronGenerator JS imported successfully!");
//   },
//   false
// );



// //Cloudinary Upload Widget for User profile image

var myWidget = cloudinary.createUploadWidget({
  cloudName: 'dmlqhwwfc',
  uploadPreset: 'umqopfpp',
  sources: [
    "local",
    "url",
    "camera",
    "facebook",
    "instagram"
  ],
  styles: {
    palette: {
      window: "#F5F5F5",
      sourceBg: "#FFFFFF",
      windowBorder: "#74A772",
      tabIcon: "#00C710",
      inactiveTabIcon: "#91B390",
      menuIcons: "#08C700",
      link: "#65A747",
      action: "#00C710",
      inProgress: "#0194c7",
      complete: "#74A772",
      error: "#c43737",
      textDark: "#6D5243",
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
}, (error, result) => {
  if (!error && result && result.event === "success") {
    console.log('Done! Here is the image info: ', result.info);
    // send to tthe backend to the route /user/whatever
    // we send the secure url
    //import axios
    let profileImage = result.info.secure_url
    axios.post("/user/:userId/profile-image", {
      profileImage
    })
  }
})




let uploadButton = document.getElementById("upload_widget")
if (uploadButton) {
  uploadButton.addEventListener("click", function () {
    myWidget.open()
  }, false);
}



//   ####### CHECK IF FORM FOR NEW GREENSPACE IS FILLED IN #######

const formCheck = (event) => {
  let formIDs = ["name", "lat", "lng"]

  let tagArray = Array.from(document.querySelectorAll("#tags")).map(tag => tag.checked)
  console.log(tagArray)
  formIDs.forEach(ids => {
    if (document.getElementById(ids).value === "" || document.getElementById(ids).value === undefined) {
      event.preventDefault();
      document.querySelector(".form-error").innerText = "Please fill out all the info"
    } else if (!tagArray.includes(true)) {
      event.preventDefault();
      document.querySelector(".form-error").innerText = "Please click at least one tag out all the info"
    } else {
      document.getElementById("form-button").setAttribute = ("type", "submit")
    }
  })
}