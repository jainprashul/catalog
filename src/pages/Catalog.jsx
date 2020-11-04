import React, { useContext, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import './Catalog.css';
import { FirebaseContext } from '../context/FirebaseContext';
import CatalogItem from '../components/CatalogItem';
import { logoWhatsapp } from 'ionicons/icons';
import { Adsense } from '@ctrl/react-adsense';

const Catalog = ({ match }) => {

  // console.log(match);
  const { shop } = match.params;
  const firebase = useContext(FirebaseContext)
  const [items, setItems] = useState([])

  const [shopDtl, setShopDtl] = useState({})
  console.log(shopDtl);

  document.title = `${shopDtl.shop} - Catalog Alpha`

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
      <Adsense
            client="ca-pub-2188611974126942"
            
          />
        <h3 className="ion-title ion-text-center">Welcome to</h3>
        <h2 className="ion-title ion-text-center">{shopDtl.shop}</h2>
        <IonGrid>
          <IonRow>
            {CatalogItems}
          </IonRow>
        </IonGrid>

        <Adsense
            client="ca-pub-2188611974126942"
            slot="7259870550"
            style={{ display: 'block' }}
            layout="in-article"
            format="fluid"
          />

      </IonContent>
      <IonFooter>
        <IonToolbar>
            <IonButton fill='outline' href={`https://wa.me/91${shopDtl.phoneNumber}?text=${encodeURI('Hello I have seen your products in Catalog Alpha. I would like to Know More ')}`} target='_blank'   expand='block'>
              <IonIcon color='success' icon={logoWhatsapp} size='large' />
              Contact Us</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Catalog;
