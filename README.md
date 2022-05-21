
<div align="center">
  <img src="https://res.cloudinary.com/sharath-media-library/image/upload/v1650477413/unbox%20tube/UnboxTube-logos_transparent_nf40e2.png" width="150" title="App Logo">


   # [UnboxTube](https://unboxtube.netlify.app/)
     
</div>
 Single place to watch all your favorite tech influencers unboxing, reviewing and testing your favorite gadgets. Completely Responsive Application built using ReactJS.


#### Stack Used

- React
- [Nothing UI](https://nothing-ui-library.netlify.app/)- Component Library
- Javascript
- CSS

#### Built With -

- Context API + useReducer
- [React Router v6](https://reactrouter.com/docs/en/v6/getting-started/overview)

#### Packages Used - 
 - [MockBee](https://www.npmjs.com/package/create-mock-backend) - A mock backend for getting mock APIs to build the functional logic of the application
 - [Axios](https://www.npmjs.com/package/axios) - For making API calls
 - [React Toastify](https://www.npmjs.com/package/react-toastify)
 - [React Tooltip](https://www.npmjs.com/package/react-tooltip)
 - [react-icons](https://react-icons.github.io/react-icons/) - for icons

#### How To Run in Local - 
Run these commands in your terminal
 ```
 git clone https://github.com/sharathnair9999/UnboxTube.git
 cd ./UnboxTube
 npm install
```

Add `.env` file to the root directory and place a JWT secret key in it like below and save it
`REACT_APP_JWT_SECRET = <your_secret_code>`

After that Run in your local with this command. 

`npm start`
secret_code can be anything of your choice. 
And now this application runs in your local machine too. 

# Features

- Landing Page (Lazy Loading)  - Public Route
	- Video Categories
	- 
- Authentication: 
    - User Signup 
    - User Login (Email, Password || Test User)
    - Logout
    - Protected Routes
    - Public Routes

### Public Routes
- Video Listing Page
	- Landing Page
	- Video Card with Video title, Video Actions(Add to Likes, Watch Later, Playlist)
	- Single Video Page with Next Videos to watch on Right Side Panel
	- Login
	- Signup

### Private Routes
- Liked Videos Page
	- Add / Remove Video From Likes
- Watch Later
	- Add / Remove Video from/to Watch Later 
- User History
	- Add to History
	-  Remove from History
	- Enable / Disable History
- Playlist Management
	- Create Playlist
	- Add Video to the playlist
	- Remove Video from playlist
	- View a playlist and videos in it. 
	- Delete Videos from playlist
	- Delete Playlist
