export const optionsCourseValidAdd = ((pickCourse:any) => {
    switch (pickCourse) {
        case '1':
            return [
           
                { value: '1', label: '1' },
                { value: '2', label: '2' }
            ];
        case '2':
            return [
               
                { value: '3', label: '3' },
                { value: '4', label: '4' }
            ];
        case '3':
            return [
             
                { value: '5', label: '5' },
                { value: '6', label: '6' }
            ];
        case '4':
            return [
              
                { value: '7', label: '7' },
                { value: '8', label: '8' }
            ];
        case '5':
            return [
           
                { value: '9', label: '9' },
                { value: '10', label: '10' }
            ];
        case '6':
            return [
              
                { value: '12', label: '12' }
            ];
        default:
            return [];
    }
})