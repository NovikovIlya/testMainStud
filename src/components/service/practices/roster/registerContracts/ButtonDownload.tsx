import React, {useEffect} from 'react';
import {useLazyGetCopyFileQuery} from "../../../../../store/api/practiceApi/contracts";

interface Props {
    id: string
}

export const ButtonDownload = ({id}: Props) => {
    const token = localStorage.getItem('access')!.replaceAll('"', '')
    console.log(id)
    const [getFile, results] = useLazyGetCopyFileQuery()

    // useEffect(() => {
    //     if (results.error) {
    //         if ('data' in results.error) {
    //             console.log(results.error.data)
    //         }
    //     }
    //
    // },[results])

    function onClick() {
        getFile(id)
            .then(x => {
                if ('data' in x.error!) {
                    console.log(x.error)
                    //console.log(String(x.error.data))
                    // const blobdata = new Blob([x.error.data], {type: 'application/pdf'})
                    // //console.log(blobdata)
                    // const url = URL.createObjectURL(new Blob([blobdata]))
                    // const link = document.createElement('a')
                    // link.href = url
                    // link.setAttribute('download', 'Доп.соглашение к договору.pdf')
                    // document.body.appendChild(link)
                    // link.click()
                }
            })
    }


    return (
        <a onClick={onClick}>
            Cкан договора
        </a>
    );
};

