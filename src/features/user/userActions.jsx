import moment from 'moment';
import { toastr } from 'react-redux-toastr';

export const updateProfile = (user) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const {isLoaded, isEmpty, ...updatedUser} = user;
        if(updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
            updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
        }

        try {
            await firebase.updateProfile(updatedUser);
            toastr.success('Success', 'Profile updated')
        } catch (error) {
            console.log(error)
        }
    }

export const uploadProfileImage = (file, fileName) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `$${user.uid}/user_images`;
        const options = {
            name: fileName
        };
        try {
            // upload the file to firebase storage
            // get url of image
            // get userdoc
            // check if user has photo, if not update profile with new image
            // add the new photo to photos collection
        } catch (error) {
            console.log(error);
        }
    }

