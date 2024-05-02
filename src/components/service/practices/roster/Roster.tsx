import React, {useState} from 'react'

import {CreateContracts} from './CreateContracts'
import {EditContract} from './EditContract'
import {FinalPreview} from './FinalPreview'
import {PreviewContracts} from './PreviewContracts'
import {RegisterContracts} from './registerContracts/RegisterContracts'
import {useLocation} from "react-router-dom";

export const Roster = () => {
    const {pathname} = useLocation()
    const [isCreate, setIsCreate] = useState(false)
    const [isPreview, setIsPreview] = useState(false)
    const [edit, setEdit] = useState('')
    const [preview, setPreview] = useState('')
    const [isFinalReview, setIsFinalReview] = useState(false)
    // if (isFinalReview) return <FinalPreview setIsFinalReview={setIsFinalReview}/>
    // if (isPreview) {
    //     return (
    //         <PreviewContracts
    //             setIsPreview={setIsPreview}
    //             setIsCreate={setIsCreate}
    //             setIsFinalReview={setIsFinalReview}
    //             preview={preview}
    //         />
    //     )
    // }
    // if (edit !== '') {
    //     return <EditContract edit={edit} setEdit={setEdit}/>
    // }
    // if (isCreate) {
    //     return (
    //         <CreateContracts setIsCreate={setIsCreate} setIsPreview={setIsPreview}/>
    //     )
    // }

    if (pathname.includes('previewContracts')) {
        return <PreviewContracts/>
    } else if (pathname.includes('createContract')) {
        return (
            <CreateContracts/>
        )
    } else {
        return <RegisterContracts/>
    }
}
