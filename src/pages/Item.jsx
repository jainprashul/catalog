import React, { useContext, useState } from 'react';
import { IonBackButton, IonButton, IonCard, IonCardHeader, IonContent, IonHeader, IonNote, IonPage, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Item.css';
import APPLINKS from '../helpers/Const';
import { FirebaseContext } from '../context/FirebaseContext';
import { Plugins } from '@capacitor/core';
import { Adsense } from '@ctrl/react-adsense';
const { Share } = Plugins;

const Item = ({ match }) => {
  const firebase = useContext(FirebaseContext);
  const [item, setItem] = useState({});
  const [liked, setLiked] = useState(false);
  const [shopDtl, setShopDtl] = useState({});

  console.log(shopDtl);
  let whatsappUrl =  `https://wa.me/91${shopDtl.phoneNumber}?text=${encodeURI('I would like to know about this product.\n' + window.location.href) }`
  const {shop , id} = match.params;

  useIonViewWillEnter(() => {

    firebase.getUser(shop).then(res => {
      const user = res.docs[0].data();
      // console.log(user);
      setShopDtl(user);
    })
    firebase.getItem(shop, id).then(item => {
      console.log(item.data());
      setItem(item.data());
    })

  })

  const { photo, name, description, like } = item;

  document.title = `${name} - ${shopDtl.shop}`;


  function likeADD() {
    firebase.item(shop , id).update({
      like: like + 1
    })
    setLiked(true);
  }

  function shareLink() {
    Share.share({
      title: `${name} - ${shopDtl.shop} (${shopDtl.name})`,
      url: `${window.location.href}`,
      dialogTitle: `${name} - ${shopDtl.shop} (${shopDtl.name})`,
      text: `Check Out the Pattern and Collection from ${shopDtl.shop}. \n Contact ${shopDtl.phoneNumber} \n`

    });
    // if (navigator.canShare) {
    //   navigator.share({
    //     title: `${name} - Priti Jain (VidyaSagar Collection)`,
    //     text: `Check Out the Pattern and Collection from VidyaSagar Collection. /n Contact 8989488761`,
    //     url: `${window.location.href}`,
    //   })
    //     .then(() => console.log('Share was successful.'))
    //     .catch((error) => console.log('Sharing failed', error));
    // } else {
    //   console.log(`Your system doesn't support sharing files.`);
    // }
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
      <Adsense
            client="ca-pub-2188611974126942"
          />
        <IonCard className='ion-padding ion-justify-content-center ion-text-center' >
          <img src={photo} alt="" width="360" />
          <IonCardHeader className='ion-padding'>
            <p>
              <IonText>{description}</IonText>
              <p>{like} people likes this.</p>
            </p>

            <IonButton fill="outline" onClick={shareLink}>Share</IonButton>
            <IonButton fill="outline" disabled={liked} onClick={likeADD}>Like</IonButton>
            <p>
  <IonNote >
    <a href={`${shop}`}>More Items from {shopDtl.shop}</a>
  </IonNote>

            </p>
            <IonButton fill="outline" expand='block' href={whatsappUrl} target='_blank' >Contact to Buy</IonButton>
          </IonCardHeader>
        </IonCard>
        <Adsense
            client="ca-pub-2188611974126942"
            slot="7259870550"
            style={{ display: 'block' }}
            layout="in-article"
            format="fluid"
          />
      </IonContent>
    </IonPage>
  );
};


export default Item;
