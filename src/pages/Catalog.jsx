import React, { useContext, useState } from 'react';
import { IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import './Catalog.css';
import { FirebaseContext } from '../context/FirebaseContext';
import CatalogItem from '../components/CatalogItem';

const Catalog = () => {
  const firebase = useContext(FirebaseContext)
  const [items, setItems] = useState([])

  useIonViewDidEnter(()=> {
    firebase.getCatalog().then(async (res) => {
      let arr = [];
      const docs = await res.docs;
      docs.forEach((doc) => {
        let data  = doc.data();
        data.id = doc.id
        arr.push(data )
      })

      setItems(arr);
      // console.log(res);
    })
  })

  const CatalogItems = items.map((item, i) => (
    <CatalogItem key={i}  item={item} />
  ));


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='ion-text-center '>Catalog</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <h2 className="ion-title ion-text-center">Kurti Designs</h2>
        <IonGrid>
          <IonRow>
            {CatalogItems}
          </IonRow>
        </IonGrid>
      
      </IonContent>
    </IonPage>
  );
};

export default Catalog;
