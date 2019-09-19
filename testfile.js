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

    //prettier-ignore
    // let data = {{{ array }}};

   
   

  //console.log(data)
  let marker = data.map(el => new google.maps.Marker({

    position: { lat: el.location.lat, lng: el.location.lng },
    map: map,
    icon: image,
    title: el._id
  }

  )

  )

  axios.get('http://localhost:3000/search/address').then((response) => {
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
      let service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
  {
    origins: [{
  lat : {{ data.lat }}, 
   lng : {{ data.lat }} 
}],
    destinations: [{
  lat : greenspaceData[0].location.lat, 
   lng : greenspaceData[0].location.lng 
}],
    travelMode: 'WALKING',
  }, callback)

var dist  ;
 function callback(response, status) {
  if (status == 'OK') {
    var origins = response.originAddresses;
    
    var destinations = response.destinationAddresses;

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
        var element = results[j];
        var distance = element.distance.text;
        var duration = element.duration.text;
        var from = origins[i];
        var to = destinations[j];
      }
    }
  }
  dist = response;
  handleEverything()
}

console.log(dist)

function handleEverything() {

      // dist will be availabe here
      // console.log(markerUnit.title)
      var img;
      let name = greenspaceData[0].name;
      let id = greenspaceData[0]._id;
      if (imageData.length === 0) {
        img = "https://middlesbrough.gov.uk/sites/default/files/Albert_Park_2008.jpg"
      } else {
        img = imageData[0].image;
      };


      
      var contentString = `<div class="popup-section"><h4>${name}</h4><img class="popup-image" src=${img} alt="GreenSpace"><a class="popup-link" href="/greenspace/${id}"><button class="popup-button">More Info</button></a></div>`;

      var infowindow = new google.maps.InfoWindow({
        content: contentString
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
          lat: {{ data.lat }},
        lng: {{ data.lng }}
  };
   let img = `{{{ user.image }}}`
      //========================= style profile image with class ===================================
        let styling = `<img src="${img}" >`
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
//axios

  }

  }