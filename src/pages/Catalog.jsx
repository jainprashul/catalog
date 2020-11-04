import React, { useContext, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import './Catalog.css';
import { FirebaseContext } from '../context/FirebaseContext';
import CatalogItem from '../components/CatalogItem';
import { logoWhatsapp } from 'ionicons/icons';

const Catalog = ({ match }) => {

  // console.log(match);
  const { shop } = match.params;
  const firebase = useContext(FirebaseContext)
  const [items, setItems] = useState([])

  const [shopDtl, setShopDtl] = useState({})
  console.log(shopDtl);

  useIonViewDidEnter(() => {
    firebase.getUser(shop).then(res => {
      const user = res.docs[0].data();
      // console.log(user);
      setShopDtl(user);
    })

    firebase.getCatalog(shop).then(async (res) => {
      let arr = [];
      const docs = await res.docs;
      docs.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id
        arr.push(data)
      })

      setItems(arr);
      // console.log(res);
    })
  })

  const CatalogItems = items.map((item, i) => (
    <CatalogItem key={i} item={item} shop={shop} />
  ));


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='ion-text-center '>{shopDtl.shop} - Catalog</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <h3 className="ion-title ion-text-center">Welcome to</h3>
        <h2 className="ion-title ion-text-center">{shopDtl.shop}</h2>
        <IonGrid>
          <IonRow>
            {CatalogItems}
          </IonRow>
        </IonGrid>

      </IonContent>
      <IonFooter>
        <IonToolbar>
          
            <IonButton fill='outline'  expand='block'>
              <IonIcon color='success' icon={logoWhatsapp} size='large' />
              Contact Us</IonButton>
          
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Catalog;
