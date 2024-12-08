

export function newProcessing(dataDepartments:any) {
    const empty:any = []
     dataDepartments?.forEach((item:any)=>{
        if('responses' in item){
            empty.push({key:item.id,
                value:item.value,
                label:item.value,
            id:item.id})
            item.responses.forEach((i:any)=>{
                empty.push({key:i.value,
                    value:i.value,
                    label:i.label,
                id:i.id})
            })
        }
        else{
            empty.push({key:item.id,
                value:item.value,
                label:item.label,
            id:item.id})
        }
    })
    return empty
    
}