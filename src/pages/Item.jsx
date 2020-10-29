import React, { useContext, useState } from 'react';
import { IonBackButton, IonButton, IonCard, IonCardHeader, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Item.css';
import APPLINKS from '../components/Const';
import { FirebaseContext } from '../context/FirebaseContext';

const Item = ({match}) => {
  const firebase = useContext(FirebaseContext);
  const [item, setItem] = useState({});

  const {photo, name , description, id } = item;
  useIonViewWillEnter(()=> {
    firebase.getItem(match.params.id).then(item => {
      console.log(item.data());
      setItem(item.data());
    })
  })

  function shareLink() {
    if (navigator.canShare && navigator.canShare({ files: [photo] })) {
      navigator.share({
        files: [photo],
        title: `${name}`,
        text: `${window.location.href}`,
      })
      .then(() => console.log('Share was successful.'))
      .catch((error) => console.log('Sharing failed', error));
    } else {
      console.log(`Your system doesn't support sharing files.`);
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonBackButton />
  <IonTitle className='ion-text-center'>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonCard className='ion-padding ion-justify-content-center ion-text-center' >
          <img src={photo} alt="" width="360" />
          <IonCardHeader>
            <IonButton fill="outline" onClick={shareLink}>Share</IonButton>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};


export default Item;
