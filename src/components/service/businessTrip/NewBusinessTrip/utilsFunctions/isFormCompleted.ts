import {FormInstance} from "antd/es/form/hooks/useForm";
import {Form} from "antd";


interface InterfaceIsFormCompleted {
    form: FormInstance
    setTrue: () => void
    setFalse: () => void
    nameList: Array<string>
}

/**
 * Функция проверяет, заполнены ли поля и прошли ли они проверку
 * Если прошли, то подчёркивает название вкладки зелёным
 * Если не прошли, то не подчёркивыает
 *
 * @param form - объект формы, который проверяет фунцкия
 * @param setTrue - функция, которая подчёркивает название вкладки зелёным
 * @param setFalse - функция, которая отключает подчёркивание названия вкладки
 * @param nameList - список названий полей формы
 *
 */


export function isFormCompleted({form, setTrue, setFalse, nameList}: InterfaceIsFormCompleted) {

    form.validateFields(
        nameList,
        {validateOnly: true, recursive: true}
    ).catch(e => {
        if (e.errorFields.length === 0) {
            setTrue()
        } else {
            setFalse()
        }
    })
}