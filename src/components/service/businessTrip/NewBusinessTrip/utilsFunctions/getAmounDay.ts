import {IFormPlacesAndDate} from "../Staff/PlacesAndDated/PlacesAndDated";
import {ILivingCondition} from "../Staff/LivingConditions/NewDataLivingConditions";
import {ITravelConditions} from "../Staff/TravelConditions/NewDataTravelConditions";

interface IGetAmountDay {
    values: IFormPlacesAndDate | ILivingCondition | ITravelConditions
}

export function getAmountDay({values}: IGetAmountDay) {
    if ("organisations" in values) {
        const onlyOrganisations = values.organisations
        for (let org of onlyOrganisations) {
            //2) вычисляем, сколько дней человек будет в командировке в данной организации
            if (org.dateStartEnd) {
                const sumDayOrg = org.dateStartEnd[1]!.diff(org.dateStartEnd[0], 'day') + 1

                //3) добавляем количество дней в объект данной организации
                org.sumDay = sumDayOrg
            }
        }
        return values
    }
    if ("dataLivingConditions" in values) {
        for (let elem of values.dataLivingConditions) {
            if (elem.dateCheckInOut) {
                const sumDayLiving = elem.dateCheckInOut[1]!.diff(elem.dateCheckInOut[0], 'day') + 1
                elem.sumDay = sumDayLiving
            }
        }
        return values
    }
    if ("travelConditions" in values) {
        for (let elem of values.travelConditions) {
            if (elem.dateStartEnd) {
                const sumDayLiving = elem.dateStartEnd[1]!.diff(elem.dateStartEnd[0], 'day') + 1
                elem.sumDay = sumDayLiving
            }
        }
        return values
    }
}