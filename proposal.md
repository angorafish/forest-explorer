Capstone: Step Two - Write a Project Proposal

You’re about to tackle step two of your capstone project! To review the other steps of
the project, refer to this document.

Project Proposal (2-4 Hours)

Step Two is all about fleshing out your project idea. For this step, please write a proposal based
on the project idea you agreed on with your mentor


1. What tech stack will you use for your final project? We recommend that you use React and Node for this project, however if you are extremely interested in becoming a Python developer you are welcome to use Python/Flask for this project.
I will be using React/Node for this project in order to keep things simple using JS for front and back-end, as well as to reap the benefits of react.

2. Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application?
I am going to first focus on an extensive back-end design in order to manage the vast data surrounding national forests, with the goal of moving on to focusing on the front end specifically after, resulting in an evenly-focused full-stack app. If it proves to be too much I will keep my focus on the back-end, but plan to possibly spend an additional week on the front-end since I have time.

3. Will this be a website? A mobile app? Something else?
This will be made as a website, with the future possibility of creating a mobile-compatible app version.

4. What goal will your project be designed to achieve?
My national forest explorer will be designed to provide users with a comprehensive platform to explore and interact with various national forest lands and their amenities. The app aims to inform and educate users by offering detailed information about each forest, including its history, flora, and fauna. It will facilitate trip planning by listing activities, providing details about different locations, and offering an itinerary-building function with a calendar. The app will enhance user experience with interactive maps and a user-friendly interface.

Furthermore, the app aims to promote community engagement through user ratings, reviews, and photos, creating a well-rounded resource for research. It will also promote environmental awareness by including information on conservation efforts and providing educational resources. By integrating existing APIs, the app will offer up-to-date information on weather, forest conditions, and trail statuses, while custom data collection will enhance its value. The goal is to create a valuable tool for nature enthusiasts and travelers, showcasing my full-stack development skills through a dynamic and interactive web application.

5. What kind of users will visit your app? In other words, what is the demographic of your users?
The demographic of my users will vastly be those with a common interest in exploring and in nature in general. The general age range will be 18-65 years old, and there will be an emphasis on group activities and family-friendly resources. Additionally, the app will seek to interest nature photographers, environmental advocates looking to research, community members surrounding the forest land, and those planning camping or hiking trips.

6. What data do you plan on using? How are you planning on collecting your data? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain. You are welcome to create your own API and populate it with data. If you are using a Python/Flask stack are required to create your own API.
In order to make my forest explorer most functional, I will need data about the national parks and their amenities, real-time weather and location-specific condition data, a means to create interactive maps, and user-generated reviews and photos.

Some of the APIs I am considering:
Google Maps API - https://developers.google.com/maps/documentation
Mappbox API - https://docs.mapbox.com/api/
OpenWeatherMap API - https://openweathermap.org/api
National park service API - https://www.nps.gov/subjects/developer/api-documentation.html


7. In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information:
## a. What does your database schema look like?
The schema will be designed to store information about forests, trails, amenities, user-generated content, and user accounts:

Users:
-`user_id` (Primary key)
-`username`
-`email`
-`password_hash`
-`created_at`
-`updated_at`

Forests:
-`forest_id` (Primary key)
-`name`
-`location`
-`size`
-`description`
-`history`
-`flora_fauna`
-`conservation_status`
-`created_at`
-`updated_at`

Trails:
-`trail_id` (Primary key)
-`forest_id` (Foreign key)
-`name`
-`length`
-`difficulty`
-`elevation`
-`coordinates`
-`created_at`
-`updated_at`

Campsites:
-`campsite_id` (Primary key)
-`forest_id` (Foreign key)
-`name`
-`facilities`
-`availability`
-`coordinates`
-`created_at`
-`updated_at`

Reviews:
-`review_id` (Primary key)
-`user_id` (Foreign key)
-`forest_id` (Foreign key)
-`trail_id` (Foreign key)
-`campsite_id` (Foreign key)
-`rating`
-`comment`
-`created_at`
-`updated_at`

Photos:
-`photo_id` (Primary key)
-`user_id` (Foreign key)
-`forest_id` (Foreign key)
-`trail_id` (Foreign key)
-`campsite_id` (Foreign key)
-`url`
-`created_at`
-`updated_at`

Itineraries:
-`itinerary_id` (Primary key)
-`user_id` (Foreign key)
-`name`
-`description`
-`created_at`
-`updated_at`

Itinerary_items:
-`item_id` (Primary key)
-`itinerary_id` (Foreign key)
-`forest_id` (Foreign key)
-`trail_id` (Foreign key)
-`campsite_id` (Foreign key)
-`date`
-`time`
-`note`
-`created_at`
-`updated_at`

## b. What kinds of issues might you run into with your API? This is especially important if you are creating your own API, web scraping produces notoriously messy data.
## c. Is there any sensitive information you need to secure?
## d. What functionality will your app include?
## e. What will the user flow look like?
## f. What features make your site more than a CRUD app? What are your stretch goals? Please create a GitHub repos