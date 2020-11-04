import { IonButton, IonContent, IonPage, IonSlide, IonSlides } from '@ionic/react'
import React from 'react'
import { APPSTRING } from '../helpers/Const';
import './Welcome.css'

const Welcome = () => {
    const slideOpts = {
        initialSlide: 0,
        speed: 400
    };

    return (
        <IonPage>
            <IonContent fullscreen >
                <IonSlides pager={true} options={slideOpts}>

                    <IonSlide>
                        <div className="slide1">
                        <h1 className="welcome-title">Catalog Alpha</h1>
                        <img src={APPSTRING.icon} alt="" width="20%"/>
                        <h3>One Stop Solution</h3>
                        <h4>For your bussiness.</h4>
                        </div>
                    </IonSlide>
                    <IonSlide>
                        <div className="slide2">
                        <h3>Create a free account and bussiness catalog.</h3>
                        <h4>For your bussiness</h4>
                        <h5>This will help you identify your bussiness.</h5>
                        <p>Free bussiness websites for you to showcase your products.</p>
                        
                        <IonButton fill='outline' href="https://catalog-manage.now.sh"> Get Started</IonButton>
                        </div>

                    </IonSlide>
                    
                </IonSlides>

            </IonContent>
        </IonPage>
    )
}

export default Welcome
