import {RcFile} from "antd/es/upload";

export interface FeedBackDataWithoutImage {
    email: string
    message: string
}


export interface FeedBackData {
    email: string
    message: string
    image: Blob | RcFile
}

