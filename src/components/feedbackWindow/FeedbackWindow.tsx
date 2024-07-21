import React, {useState} from 'react';
import {FirstWindow} from "./firstWindow/FirstWindow";
import {FeedbackForm} from "./feedbackForm/FeedbackForm";
import { TypeFeedbackWindow } from '../../models/FeedBack';


export const FeedbackWindow = ({closeWindow}: TypeFeedbackWindow) => {

    const [isFirstWindow, setIsFirstWindow] = useState(true)

    return (
        <>
            {
                isFirstWindow
                    ?
                    <FirstWindow
                        closeWindow={closeWindow}
                        setIsFirstWindow={setIsFirstWindow}
                    />
                    :
                    <FeedbackForm closeWindow={closeWindow} setIsFirstWindow={setIsFirstWindow}/>
            }
        </>
    );
};

