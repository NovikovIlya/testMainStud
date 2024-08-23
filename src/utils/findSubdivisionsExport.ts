export const findSubdivisionsExport = (subdivisionsAll:any,field:any) => {
    console.log('bbbbbbbbbbbbb',subdivisionsAll)
    return subdivisionsAll?.find((item:any)=>{
        if(field.includes('-')){
            if('responses' in item){
                return item.responses?.find((elem:any)=> {
                    if(field.split(" - ")[1] === elem.value){  
                        console.log('44444444444')
                        return elem
                    }      
                })
            }
            
            if(item.value === field.split(" - ")[1]){
                return item
            }else{
                return field.split(" - ")[1]
          }
        }else{
            if('responses' in item){
                return item.responses?.find((elem:any)=> {
                    if(field === elem.value){
                        return elem
                    }
                })
            }
            else if(item.value === field){
                console.log('55555')
                return item
            }
        }
    
    })
}