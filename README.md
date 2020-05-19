# Brews and Blues

https://akarpisz.github.io/masterproject1

This is a search engine for those looking to plan a night out. Using the Zomato API and the Ticketmaster API, a user can click "allow" in the location access prompt, and receive information about the breweries and concerts closest to them. 

The application will function with both inputs left blank, relying solely on the users geolocation to provide search results. The query URL is changed based on whether the user has placed search keywords in the search bar(s). The APIs are called separately, and clicking the search button on either side will return results for either concerts or breweries and bars. Results from both APIs appear in a div below. 

The clear button was added so that you can see results from both APIs simultaneously. Search results from either PI will return location information relative to planning a night out (the hours of operation of a restaurant, addresses of the concert venue or restaurants, etc). We've included the distance from a user's current coordinates to the coordinates of the destination, calculated using the haversine formula. 

Future updates may include:
-Embedded maps
-Use of the Yelp API instead of Zomato
-The coordinate parameter for Ticketmaster may be deprecated, in which case we'll move to using the Bing Maps API to convert the coordinates into a postal code, another parameter that can be used.

