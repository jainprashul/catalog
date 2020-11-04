import { IonAvatar, IonCard, IonCardHeader, IonCardSubtitle, IonCol, IonImg, IonItem, IonLabel } from '@ionic/react'
import React from 'react'
import APPLINKS, { APPSTRING } from '../helpers/Const';

const CatalogItem = ({ item, shop }) => {

    const { name, description, id, photo } = item;
    console.log(item);

    let url = `/${shop}/item/${id}`;

    return (
        <IonCol size-sm size='12' sizeMd='4'>
            <IonCard className='ion-padding ion-justify-content-center ion-text-center' href={url}>
                <img src={photo} alt="" width="360" />
            <IonCardHeader>
            
            </IonCardHeader>
            </IonCard>
        </IonCol>
    )
}

export default CatalogItem
