import React from 'react';
import {Button, Form, Rate} from "antd";
import {blue307} from "../../../../../utils/color";
import { IRatingTeacher } from '../../../../../models/electronicBook';


export const RatingTeacher = (props: IRatingTeacher) => {
    return (
        <>
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
                        <p>{props.kindnessAndTact}</p>
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
                        <p>{props.generalErudition}</p>
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
                        <p>{props.appearanceAndDemeanor}</p>
                    </div>
                </div>
                <div className={`
							flex 
							justify-between`}>
                    <p>Пунктуальность</p>
                    <div className={`
								flex 
								gap-10`}>
                        <Form.Item name={'Punctuality'}>
                            <Rate className={`text-[${blue307}]`}/>
                        </Form.Item>
                        <p>{props.punctuality}</p>
                    </div>
                </div>
            </div>
            <div className={`
						flex 
						justify-between 
						mt-10`}>
                <p>Всего: {props.total} голосов</p>
                <Button className={`
							!rounded-full`}
                        type="primary"
                        size="large"
                        htmlType={'submit'}
                        disabled={props.disabledButton}
                >
                    Сохранить
                </Button>
            </div>
            {props.sendData && <span className={`text-[green]`}>Данные отправлены</span>}
        </>
    );
};

