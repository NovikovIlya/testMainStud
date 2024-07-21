import {NewDepartment} from "../models/Practice";

export function processingOfDivisions(dataDepartments: NewDepartment[]) {
    const newTest = []
    const newDep = dataDepartments.filter(elem => {
        if (elem.responses) {
            return elem
        }
    })
    for (let elem of newDep) {
        const valueElem = elem.value
        for (let elemResp of elem.responses!) {
            newTest.push({
                id: elemResp.id,
                value: `${valueElem} - ${elemResp.value}`,
                label: `${valueElem} - ${elemResp.label}`
            })
        }
    }
    const newDepWithoutResp = dataDepartments.filter(elem => {
        if (!elem.responses) {
            return elem
        }
    })
    return newTest.concat(newDepWithoutResp)
}