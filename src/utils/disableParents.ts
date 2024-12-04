export  const disableParents = (data:any) => {
    return data?.map((item: any) => ({
      ...item,
      disabled: !!item.children, // Делаем родительские элементы недоступными
      children: item.children ? disableParents(item.children) : undefined,
    }));
};