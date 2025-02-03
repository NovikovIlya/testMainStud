import { Avatar, Card, Form, Select, Skeleton, Space, Typography } from 'antd';
import {
    useGetTeacherInfoQuery,
    useGetTeachersRatingQuery,
    usePostTeacherRatingMutation
} from "../../../../store/api/assessmentTeacher";
import { IAssessmentNumber, IValuesAssessment, TestQuery } from "../../../../models/Teacher";
import { useState } from "react";
import { RatingTeacher } from "./RatingTeacher/RatingTeacher";
import { t } from 'i18next';


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
    const {data: teacherData, isFetching: isFetchingTeacherData} = useGetTeacherInfoQuery(idTeacher)
    const [postAssessmentTeachers] = usePostTeacherRatingMutation()
    const [disabledButton, setDisabledButton] = useState(true)
    const [sendData, setSendData] = useState(false)


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
        setSendData(true)

    }


    return (
        <>
            {/* <div className={`mb-14 
            text-[28px]`}>
                Оценка работы преподавателей
            </div> */}
            <Space className='mt-2' direction="vertical" size={'small'}>
                <Typography.Text className={`text-[18px]/[18px]
                `}>
                    {t('selectTeacher')}
                </Typography.Text>
                <Select
                    showSearch
                     optionFilterProp="label"
                    onChange={(value) => {
                        setIdTeacher(value)
                        setSendData(false)
                    }}
                   
                    size="large"
                    className={`w-[624px] rounded-lg
                    `}
                    options={optionsTeachers}
                    loading={isFetching}
                />
            </Space>


            {
                idTeacher === 0
                    ?
                    <></>
                    :
                    <Card className={`
                    w-full  
                    mt-16 p-6`}>

                        {
                            isFetchingTeacherData
                                ?
                                <Skeleton active={true}/>
                                :
                                <div className={`flex
                         gap-14
                        `}>
                                    <Avatar
                                        className={`w-full 
                                min-w-[100px]
                                `}
                                        size={100}
                                        src={teacherData?.teacherData.photoLink}
                                    />
                                    <div className={`flex 
                            flex-col 
                            gap-[20px]`}>
                                        <p className={`text-black 
                                text-lg 
                                font-bold
                                `}>
                                            {teacherData?.teacherData.lastName} {teacherData?.teacherData.firstName} {teacherData?.teacherData.middleName}
                                        </p>
                                        <div className={`flex 
                                flex-col 
                                gap-[10px]`}>
                                            <p className={`text-black 
                                    text-base 
                                    font-bold`}>
                                                Должность:
                                            </p>
                                            <p className={`max-w-sm 
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
                                          onFinish={(values) => {
                                              onFinish(values)
                                          }}
                                          onFieldsChange={() => {
                                              setDisabledButton(false)
                                          }}
                                    >
                                        <RatingTeacher
                                            sendData={sendData}
                                            disabledButton={disabledButton}
                                            kindnessAndTact={teacherData?.rating.kindnessAndTact}
                                            generalErudition={teacherData?.rating.generalErudition}
                                            appearanceAndDemeanor={teacherData?.rating.appearanceAndDemeanor}
                                            punctuality={teacherData?.rating.punctuality}
                                            total={teacherData?.total}/>
                                    </Form>
                                </div>
                        }
                    </Card>
            }

        </>
    )
}
