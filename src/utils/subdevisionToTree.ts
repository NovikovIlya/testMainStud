export function transformSubdivisionData(data:any) {
    return data ? data.map((item:any) => {
        return {
            title: item.value,
            value: item.id,
            children: item?.responses?.map((response:any) => {
                return {
                    title: response.value,
                    value: response.id,
                };
            })
        };
    }) : [];
}