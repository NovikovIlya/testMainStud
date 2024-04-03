import {AntDesignOutlined} from '@ant-design/icons'
import {Avatar, Button, Card, Form, Rate, Select, Space, Typography} from 'antd'
import {blue307} from '../../../utils/color'
import {
    useGetTeacherInfoQuery,
    useGetTeachersRatingQuery,
    usePostTeacherRatingMutation
} from "../../../store/api/serviceApi";
import {SetStateAction, useEffect, useState} from "react";
import {IAssessmentNumber, ITeacher, IValuesAssessment, TestQuery} from "../../../store/type";
import {ThemeProvider} from "@material-tailwind/react";
import value = ThemeProvider.propTypes.value;


interface IOptionTeacher {
    value: number
    label: string
}

const objQuestId = {
    GeneralErudition: 5,
    KindnessTact: 6,
    AppearanceDemeanor: 7,
    Punctuality: 8,
}

export const AssessmentTeachers = () => {
    const {data, isFetching} = useGetTeachersRatingQuery()
    const optionsTeachers = data?.teachers.map((elem) => (
        {
            value: elem.id,
            label: `${elem.lastname} ${elem.firstname} ${elem.middleName}`
        }
    ))
    const [idTeacher, setIdTeacher] = useState<number>(0)
    const { data: teacherData, isFetching: isFetchingTeacherData } = useGetTeacherInfoQuery(idTeacher)
    const [postAssessmentTeachers] = usePostTeacherRatingMutation()

    function onFinish(values: IValuesAssessment) {
        const rating: Array<IAssessmentNumber> = [
            {teacherId: idTeacher, questId: objQuestId.KindnessTact, answerNumber: values.KindnessTact},
            {teacherId: idTeacher, questId: objQuestId.GeneralErudition, answerNumber: values.GeneralErudition},
            {teacherId: idTeacher, questId: objQuestId.AppearanceDemeanor, answerNumber: values.AppearanceDemeanor},
            {teacherId: idTeacher, questId: objQuestId.Punctuality, answerNumber: values.Punctuality},
        ]
        const newRating = rating.filter(elem => elem.answerNumber !== undefined)
        const ratingObj = {
            rating: newRating
        }
        const query: TestQuery = {
            rating: ratingObj,
            id: idTeacher
        }
        postAssessmentTeachers(query)

    }


    return (
        <>
            <div className={`mb-14 
            text-[28px]`}>
                Оценка работы преподавателей
            </div>
            <Space direction="vertical" size={'small'}>
                <Typography.Text className={`text-[18px]/[18px]
                `}>
                    Выбрать преподавателя
                </Typography.Text>
                <Select
                    onChange={(value) => {setIdTeacher(value)}}
                    placeholder={'Выбрать'}
                    size="large"
                    className={`w-[624px] rounded-lg
                    `}
                    options={optionsTeachers}
                    loading={isFetching}
                />
            </Space>
            <Card className={`w-full  mt-16 p-6
            `}>
                <div className={`flex gap-14
                `}>
                    <Avatar
                        className={`w-full min-w-[100px]
                        `}
                        size={100}
                        src={teacherData?.teacherData.photoLink}
                    />
                    <div className={`flex flex-col gap-[20px]
					`}>
                        <p className={`text-black text-lg font-bold
						`}>
                            {teacherData?.teacherData.lastName} {teacherData?.teacherData.firstName} {teacherData?.teacherData.middleName}
                        </p>
                        <div className={`flex flex-col gap-[10px]
						`}>
                            <p className={`text-black text-base font-bold
                            `}>
                                Должность:
                            </p>
                            <p className={`
							max-w-sm 
							min-w-[384px]`}>
                                {teacherData?.teacherData.post}
                            </p>
                        </div>
                        {/*<div className={`*/}
						{/*	flex*/}
						{/*	flex-col*/}
						{/*	gap-[10px]*/}
						{/*	`}>*/}
                        {/*    <p className={`*/}
						{/*	text-black */}
						{/*	text-base */}
						{/*	font-bold*/}
						{/*	`}>*/}
                        {/*        Преподаваемые дисциплины:*/}
                        {/*    </p>*/}
                        {/*    <p></p>*/}
                        {/*</div>*/}
                    </div>

                    <Form className={`
					w-full`}
                          onFinish={(values) => {onFinish(values)}}
                    >
                        <p className={`
						text-black 
						text-base 
						font-bold`}>
                            Рейтинг преподавателя
                        </p>
                        <div className={`
						w-full 
						flex 
						flex-col 
						mt-5`}>
                            <div className={`
							flex 
							justify-between`}>
                                <p>Доброжелательность и тактичность</p>
                                <div className={`
								flex 
								gap-10 
								items-center`}>
                                    <Form.Item name={'KindnessTact'}>
                                        <Rate className={`text-[${blue307}]`}/>
                                    </Form.Item>
                                    <p>{teacherData?.rating.kindnessAndTact}</p>
                                </div>
                            </div>
                            <div className={`
							flex 
							justify-between`}>
                                <p>Общая эрудиция</p>
                                <div className={`
								flex 
								gap-10 
								items-center`}>
                                    <Form.Item name={'GeneralErudition'}>
                                        <Rate className={`text-[${blue307}]`}/>
                                    </Form.Item>
                                    <p>{teacherData?.rating.generalErudition}</p>
                                </div>
                            </div>
                            <div className={`
							flex 
							justify-between`}>
                                <p>Внешний вид и манера поведения</p>
                                <div className={`
								flex 
								gap-10 
								items-center`}>
                                    <Form.Item name={'AppearanceDemeanor'}>
                                        <Rate className={`text-[${blue307}]`}/>
                                    </Form.Item>
                                    <p>{teacherData?.rating.appearanceAndDemeanor}</p>
                                </div>
                            </div>
                            <div className={`
							flex 
							justify-between`}>
                                <p>Пунктуальность</p>
                                <div className={`
								flex 
								gap-10 
								items-center`}>
                                    <Form.Item name={'Punctuality'}>
                                        <Rate className={`text-[${blue307}]`}/>
                                    </Form.Item>
                                    <p>{teacherData?.rating.punctuality}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`
						flex 
						justify-between 
						mt-10`}>
                            <p>Всего: {teacherData?.total["Всего оценок"]} голосов</p>
                            <Button className={`
							!rounded-full`}
                                    type="primary"
                                    size="large"
                                    htmlType={'submit'}
                            >
                                Сохранить
                            </Button>
                        </div>
                    </Form>
                </div>
            </Card>
        </>
    )
}
