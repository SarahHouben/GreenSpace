# GreenSpace


## What Is [GreenSpace](https://greenspaceberlin.herokuapp.com)?

GreenSpace is a web app which allows users to explore & pin “green spaces” in their local area.


## The Idea Behind the Project

There are a lot of parks and lakes within Berlin, which can be easily found via Google Maps. But what about the small green hidden gems, which are hard to find but which come in handy when you might just want to sit on a quiet bench to take a break somewhere, or if you want to have your lunch away from the bustle of the city? 

With GreenSpace, we let users view the pinned GreenSpaces within Berlin. Signed up users can add GreenSpaces to the map, by pinning the location and tagging the space with information, e.g whether the space has a bench, it near a playground etc. The newly pinned GreenSpace is then automatically displayed on the overall GreenSpace-map.

Signed-in users can comment on GreenSpaces and can also add GreenSpaces to their favourites. The list of their favourites can be viewed in their user profile and on their personal map of favourite GreenSpaces.


## The Project

GreenSpace was built as a second project for the Ironhack Berlin Web Dev Bootcamp August 2019 by Marko Milovanov and Sarah Houben within a timeframe of 4 days. 

To build the project, the overall idea was broken down into separate iterations, insuring that the result of each iteration produced an in-itself functional mini-web-app. An overview over the project structure can be viewed [here](https://trello.com/b/QAxMOQaq/project-2-greenspace). 


## The Use of Google Maps APis

![alt text](https://github.com/SarahHouben/GreenSpace/blob/master/public/images/Google_Maps_GreenSpace.png "Google Maps GreenSpace")

1.	User types address in a search bar.  
2.	Google Geo Coding API translates this address to latitude and longitude.
3.	Google Maps JS API uses the location data to centers map and query DB for GreenSpaces in vicinity.
4.	Markers are rendered on the map with the location data of each individual GreenSpace.
5.	When a user interacts with a specific marker, the info window for the GreebSpace is opened.
6.	Then locations of the user and of the GreenSpace are sent to the Google Distance Matrix API which in turn responds with 
the time and walking distance to specific GreenSpace.
7.	At the same time, the locations are sent to Google Directions API which calculates route, in this case on foot, and gives the user a navigation link which, when clicked, starts the Google Maps app using the given location.


## Technology Used

The web app was built Node.js, Express.js, Passport.js, Handlebars.js, MongoDB, Mongoose ODM, Google Maps & SASS


## Possible Future Improvements

In future iterations, users could be given the ability to remove GreenSpaces from their favourite-list.

In addition, an admin could be added to GreenSpace. The admin would be able to delete comments, GreenSpaces and block users if required.

Further, the shown maps could also be limited to a certain radius around Berlin. In order to let users pin GreenSpaces outside of Berlin, this feature has not been implemented.


## Try It Out

Sign up for free on the [GreenSpace web-app ](https://greenspaceberlin.herokuapp.com) and start pinning your GreenSpaces. Or simply view the already pinned GreenSpaces on the website.

