<div id="map" class="search-map"></div>
<div class="panel">
      <h2>GreenSpaces near you</h2>
    </div>


<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYLwxbUeRyQSlAjR9qLXh3pnr4TFCAIW0&callback=initMap">
  </script>
<script>
  // Note: This example requires that you consent to location sharing when
  // prompted by your browser. If you see the error "The Geolocation service
  // failed.", it means you probably did not give permission for the browser to
  // locate you.
  var map, infoWindow, marker;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 52.520008, lng: 13.404954 },
      zoom: 15
    });
    var image = 'https://res.cloudinary.com/dmlqhwwfc/image/upload/v1568720489/GreenSpace/greenspace_logo_small_70pxW_jbnsv9.png'
    let data = {{{ array }}};

  let marker = data.map(el => new google.maps.Marker({
    position: { lat: el.location.lat, lng: el.location.lng },
    map: map,
    icon: image,
    title: el._id
  }
  )
  )
  axios.get('http://localhost:3000/search/location/test').then((response) => {
    var places = response.data.places;
    var images = response.data.images;

    //console.log(images)
    marker.forEach((markerUnit, i) => {

      let greenspaceData = places.filter(function (data) {

        return data._id === markerUnit.title;
      });
      let imageData = images.filter(function (data) {

        return data.greenspace === markerUnit.title;
      });
      //console.log(imageData)
      

    
      var img;
      let name = greenspaceData[0].name;
      let id = greenspaceData[0]._id;
      if (imageData.length === 0) {
        img = "https://res.cloudinary.com/dmlqhwwfc/image/upload/v1568704142/GreenSpace/default_greenspace_image.jpg"
      } else {
        img = imageData[0].image;
      };



      var contentString = `<div class="popup-section"><h4>${name}</h4><img class="popup-image" src=${img} alt="GreenSpace"><a class="popup-link" href="/greenspace/${id}"><button class="popup-button">More Info</button></a></div>`;

      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 150,
        maxHeight:200,
        backgroundColor:"1c1c33"
      });

      var toggle = true;
       markerUnit.addListener('click', () =>{ 
       if(toggle){
      infowindow.open(map, markerUnit)
      toggle = false;
      }else{
        infowindow.close(map, markerUnit)
        toggle =true;
      }
       
       });
    })



    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
           
         let img = `{{{ user.image }}}`
      //========================= style profile image with class ===================================
        let styling = `<img class="popup-profile-image" src="${img}" >`
        infoWindow.setPosition(pos);
        infoWindow.setContent(styling);
        infoWindow.open(map);
        map.setCenter(pos);
      }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }



  })
  }
</script>





if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
console.log(pos)
        })




        
          navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
    
                })

              }