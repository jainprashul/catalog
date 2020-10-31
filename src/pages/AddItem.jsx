import React, { useContext, useRef, useState } from 'react'
import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { compressImage, createToast } from '../helpers/hooks';
import { FirebaseContext } from '../context/FirebaseContext';
import { APPSTRING } from '../components/Const';
let currentPhotoFile = null;

const AddItem = () => {

    const firebase = useContext(FirebaseContext)

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [url, setUrl] = useState('');
    const [size, setSize] = useState('');

    const pHotoRef = useRef()

    async function uploadPhoto(){
        let uploadTask = firebase.uploadImage(currentPhotoFile, 'xxx');

        uploadTask.on(APPSTRING.UPLOAD_CHANGED, null, err => {
            createToast(err.message)
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                setUrl(url);
                createToast('Upload Success');

                const data = {
                    name, description, photo: url
                }
        
                console.log(data);
        
                firebase.addItem(data).then( res => {
                    console.log(res);
                });
            })
        });
    }

    function onPhotoChange(e){

        console.log(e.target.files[0]);

         if (e.target.files && e.target.files[0]) {
            compressImage(e.target.files).then(({ photo, info }) => {

                currentPhotoFile = photo.data

                console.log(currentPhotoFile);

                // currentPhotoFile = (e.target.files[0]);
                // Check this file is an image?
                const prefixFiletype = photo.type
                if (prefixFiletype.indexOf(APPSTRING.PREFIX_IMAGE) === 0) {
                    console.log(currentPhotoFile);
                    setPhoto(currentPhotoFile);
                } else {
                    createToast('This file is not an image');
                }
            })          
        }
    }

    function onSubmit(e){
        e.preventDefault();
        
        uploadPhoto();
    }

    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add IteM</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding"fullscreen>

        <IonCard>       
        <form onSubmit={onSubmit}>
            <IonItem>
                <IonLabel>Name</IonLabel>
                <IonInput type="text" id="name" value={name} required onIonChange={(e)=> {setName((e.target.value).trim())}} />
            </IonItem>
            <IonItem>
                <IonLabel>Description</IonLabel>
                <IonTextarea id='description' value={description} required onIonChange={(e)=> {setDescription((e.target.value).trim())}}></IonTextarea>
            </IonItem>
            <IonItem>
                <IonLabel>Photo Upload</IonLabel>
                <input ref={pHotoRef} type='file' id="photo" required onChange={onPhotoChange} />
            </IonItem>
            <IonButton fill='outline' type='submit'>Submit</IonButton>
                
                </form>            
        </IonCard>
        </IonContent>
      </IonPage>
    )
}

export default AddItem
