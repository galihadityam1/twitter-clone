/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.js",
    "./screens/Login.js",
    "./screens/Register.js",
    "./screens/Home.js",
    "./screens/ProfileSearch.js",
    "./screens/Profile.js",
    "./screens/DetailPost.js",
    "./screens/SearchScreen.js",
    "./screens/AddPostScreen.js",
    "./screens/FollowingScreen.js",
    "./screens/FollowerScreen.js",
    "./components/CardComponent.js",
    "./components/CommentComponent.js",
    "./components/ProfileCard.js",
    "./components/CardProfileComponent.js",
    "./navigators/StackNavigator.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
