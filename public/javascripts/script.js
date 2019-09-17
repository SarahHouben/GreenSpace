document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);


// //Cloudinary Upload Widget for User profile image

var myWidget = cloudinary.createUploadWidget({
  cloudName: 'dmlqhwwfc',
  uploadPreset: 'umqopfpp',
  // cloudName: process.env.CLOUDINARY_CLOUDNAME,
  // uploadPreset: process.env.CLOUDINARY_UPLOADPRESET,

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
    myWidget.open();
  }, false);
}