## Revents
> Revents is a working prototype for event organizing app that people can use to create or attend events. Link to the live website : https://revents-237521.firebaseapp.com. It is build with React, Redux, Firestore.
## Getting started
```
> git clone https://github.com/hnekhniadovich/revents.git
> cd revents
> npm install
> npm start
```
## Firebase setup
It is necessary to set this project up in Firebase for it to funciton properly. Use the Firebase config object and update the file ./src/app/config/firebase.js.
```
// Firebase configuration from dev console
firebaseConfig: {
  apiKey: "....",
  authDomain: "....",
  databaseURL: "....",
  projectId: "....",
  storageBucket: "....",
  messagingSenderId: "...."
}
```
### Here are come features implemented in this project

* Login and Register functionality using Firebase authentication
* Adding social login for Facebook and Google into the application
* Photo uploading using drag and drop, with resizing and cropping of the images before upload
* Paging, Sorting and Filtering with Firestore
* Creating reusable form components with Redux forms
* Building a great looking application with Semantic UI
