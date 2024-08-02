Step Six - Project Documentation
National Forest Explorer - https://github.com/angorafish/forest-explorer
https://national-forest-frontend-5e04820d306c.herokuapp.com
- Note: herokuapp is not correctly deploying because the file is too large. Working on this.

# Description
My national forest explorer app is an informational and social site where users can explore information on forests and trails around the US, save places to visit, and post about their trips to these places.

# Features
- Login/Signup/Logout: Users can create accounts, log in and log out of their accounts, all from the top right corner of the navbar. This makes it so that users can have customized information and data unique to them and distinguish between themselves and other users.
- Protected routes: This includes saved page, creating new post page, viewing profiles and account-specific information such as notifications and settings. This way, only logged in users can view and alter their content and their content is not exposed to just anyone.
- Explore page: Page showing a map of the national forest lands in the US, with a search bar above that can be used to search for forests and trails. The server populates the search suggestions with forests and trails pulled from the APIs, and users are able to select any options from the search to view. This way, users can discover new forests and trails and even look up particular ones.
- Location details page: From the search, users can select a forest or trail and it will navigate to the location's detail page. Here, the user can learn more about the location, such as the state or location it is within, and sometimes even how big the forest is. This is data both pulled from the APIs and extracted from my own pulled data when it comes to trail details. This way, users can learn more about these locations and decide if they would be interested in visiting them. Users can save locations that interest them with the heart button, and view them later on the saved page.
- Saved page: User-specific page containing a list of all trails and forests the user has saved, which can be clicked on to navigate to their details. This page is useful because users are able to easily find their favorite locations all in one place instead of hafting to search for them.
- Home page: Landing page where users can see all recent posts in order, both photos and reviews. Shows all posts to inspire or intrigue user to click on any post of interest and learn more about the location, interact with fellow users, and maybe inspire a new location search.
- Navbar: Consistent bar across all pages with routes to home, explore page, saved page, new post modal, and depending on state either login/signup button or user account options, including view profile, notifications page, settings, and log out button. This all makes the site very easy to navigate and user-friendly.
- Notifications page: Users can view their recent notifications, ie how other users have interacted with their posts through likes and comments. This keeps the user in the loop about activity on their profile.
- Posts: Posts can be created through the new post button, as either a photo, a rating and review, or both. Users can select a location from the search suggestions pulled from the APIs or enter a unique location title. Posts created will be sent to the top of the homepage feed and be available for all to view and interact with. This creates a channel for users to document their adventures, share them with others and inspire all users. Posts can easily be edited or deleted offering flexibility.
- Comments and likes: Users can interact with posts when logged in by either liking them or leaving a comment, in order to create community engagement.
- Settings: The settings page allows users to change their username, account-registered email, or their password. Users can also delete their account here. This page provides users with freedom and flexibility to alter their account to suit their interests.
- Profiles: Users have their own profile pages which include a profile picture, a cover photo, their username, how long they've been a member for, and a feed of the user's recent posts. Users can edit their own profiles, namely their pictures, but can only view other user's profiles. This enables users to learn about each other in a non-invasive way, as well as also customize their profiles to be unique to them.

# Tests
You can find tests in their designated test folders both on the front and back end. These folders contain unit tests for all significant features, components and routes. The tests can easily be run with the command "npm test".

# User flow
1. Homepage (Landing Page) - visitor access:
-When a user lands on the homepage, they're greeted with a clean and inviting interface that showcases featured recent posts from other explorers.
-There is a navigation bar at the top with the "Explore" option, and an option to login or sign up.

2. Signup/Login - user authentication:
-If user clicks on "Login/Signup", they are taken to a page where they can either sign in with an existing account or create a new one.
-The signup form collects basic details like username, email, and password. 
-After successful signup or login, the user is redirected to the homepage or their profile page, depending on your flow.

3. Explore page - browsing national forests and trails:
-From the navigation bar, the user can click "Explore" to browse through various national forests and trails.
-The page features a map depicting national forest land throughout the US.
-Users can search for specific forests or trails using the search bar at the top.
-Clicking on a specific forest or trail takes the user to a detailed page with more information.

4. Location details - detailed information:
-When a user clicks on a specific location from the explore page, they are taken to a detailed page about that forest or trail.
-This page includes information such as location type, region, size, state, and more.
-Users have the option to save locations they like by clicking the heart logo, or clicking it again to unsave.

5. Profile and saved locations - user profile management:
-The user can click their username (or profile picture if they have one) in the navigation bar to visit their profile page.
-Here, they can view their profile and cover picture, username, when they joined, and a feed of their recent posts or reviews.
-User can edit their profile picture and cover photo on their own profile.
-There's also a "Saved" section that can be accessed through the navbar. Here, users can view the forests or trails they've saved for future reference.

6. Posting and Reviews - creating new posts:
-If a user wants to share their experience or leave a review, they can click on the "New Post" button in the navbar.
-This opens a modal where users can upload photos from their trips, write a review, and rate the location they visited out of five stars.
-When a new post is submitted, it is added to the site, both on their user profile and at the top of the home page feed, where other users can view the post details.

7. Notifications and settings - keeping users engaged:
-Notifications keep users informed about comments and likes on their posts.
-Users can access the "Settings" page from the navigation bar to manage their account details, or delete their account.

8. Interaction with other users - social features:
-Users can view, like and comment on other users' posts and interact with the community.
-Clicking on a username in a comment or post takes the user to that person's profile, where they can see more of their activity.

9. Logout - ending the session:
-When the user is done with the app, they can log out by clicking the "Logout" button at the bottom of the drop down menu under their account logo in the navbar.


# Technology stack
Frontend:
- React
A JS library for building user interfaces, it is used for creating the main structure of the website, and the individual components such as the explore page and navigation bar.
- React router
A library for managing routing in React apps, used to handle navigation between pages of the website.
- Axios
A promise-based HTTP client, used to interact with backend APIs and fetch data for trails, forests, and user data.
- CSS
A styling language used to alter HTML components. Used to style various features to ensure a consistent look throughout the site. 
- HTML
The standard markup language for creating web pages. Used as the basic structure of the website, which is dynamically manipulated by React.

Backend
- Node.js
A JS runtime, used as the server-side environment where backend code is executed. It handles API requests, interacts with the database, and serves the frontend.
- Express.js
A web app framework for Node, used to set up server and define API routes for handling requests.
- Sequelize
An object-relational mapping tool for Node that supports SQL-based databases. Used to interact with PostgreSQL database, manage models, and handle database queries.
- PostgreSQL
An open-source relational database system, used to store all data in the app; user information, posts, forests, trails, comments and reviews.

# Misc
The most important lesson I have learned through this project is to regularly commit to git, and to implement and test features slowly and individually.


# API Links (USFS):

- USFS National Forest System Trails
https://data-usfs.hub.arcgis.com/datasets/0969eb1cbb2f4a1d861ee58fff587cc2_0/explore?location=27.202374%2C-110.397450%2C3.13
- Purpose: Contains information about trails within National Forest System
*I also added my own .csv file inserting data concerning trail locations, specifically 

- Forest Administrative Boundaries
https://data-usfs.hub.arcgis.com/datasets/usfs::forest-administrative-boundaries-feature-layer/about
- Purpose: Provide boundaries of national forests and grasslands

