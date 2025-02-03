export type week =
	| 'sunday'
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'



  export  type SessionProps = {
        title: string
        info: string
        href: string
        img?: string
        width?: number
        height?: number
        buttonText?: string
        buttonType?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined
        mt?: string
        positionImage?: string
        isRounded?: boolean,
        className?:any,
    }