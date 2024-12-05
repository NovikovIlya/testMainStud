import { AutoComplete, Button, Form, Modal, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useTranslation } from 'react-i18next';
import { useAddNewChatMutation, useGetEmployeesMessageQuery, useGetStudentsMessaageQuery } from '../../../../store/api/messages/messageApi';
import { useState } from 'react';
import { useDebounce } from 'ahooks';
import { useAppSelector } from '../../../../store';



export const NewDialogModal = ({ isModalOpen, onCancel}: any) => {
const user = useAppSelector((state) => state.auth.user);
  const [form] = Form.useForm();
  const teacher = Form.useWatch('teacher',form);
  const student = Form.useWatch('student',form);
  const graduate = Form.useWatch('graduate',form);
  const [id,setId] = useState(null)
  const debouncedNameEmployee = useDebounce(teacher, { wait: 1000 });
  const debouncedNameStudent = useDebounce(student, { wait: 1000 });
  const debouncedNameAspir = useDebounce(graduate, { wait: 1000 });
  
  const { data: dataGetEmployees } = useGetEmployeesMessageQuery(debouncedNameEmployee, { skip: !debouncedNameEmployee });
  const { data: dataGetStudents } = useGetStudentsMessaageQuery(debouncedNameStudent, { skip: !debouncedNameStudent });
  const [newChat,{isLoading:isLoadingNew}] = useAddNewChatMutation()
  
  console.log('id',id)

  const onFinish =()=>{
    const obj = {
        message:form.getFieldValue('text'),
        senderName: `${user.lastname} ${user.firstname} ${user.middlename}`,
        recipientType: getFilledField()=== 'graduate'? 'graduate' : getFilledField()==='teacher'? 'EMPL' : 'STUD',
        recipientName: getFilledField()=== 'graduate'? form.getFieldValue('graduate') : getFilledField()==='teacher'? form.getFieldValue('teacher') : form.getFieldValue('student'),
        recipientId: id
         
    }
    // sendMessage(obj)
    console.log('obj',obj)
    newChat(obj).unwrap()
        .then(()=>{
            form.resetFields()
            onCancel()
        })
        .catch((err)=>{
            console.log(err)
        })
    
    }

const getFilledField = () => {
    const graduate = form.getFieldValue('graduate');
    const teacher = form.getFieldValue('teacher');
    const student = form.getFieldValue('student');
    
    if (graduate) return 'graduate';
    if (teacher) return 'teacher';
    if (student) return 'student';
    
    return null; // Если ни одно поле не заполнено
};


  const isButtonDisabled = () => {
    const filledCount = [
      form.getFieldValue('graduate'), 
      form.getFieldValue('teacher'), 
      form.getFieldValue('student')
    ].filter(Boolean);

    return filledCount.length !== 1;
  };

  return (
    
        <Modal 
        className="p-12"
        title="Выберите роль" 
        open={isModalOpen}
        onCancel={onCancel}
        footer={null}
        >
        <Spin fullscreen  spinning={isLoadingNew} />
        <Form   
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }} 
            form={form}
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
        >
            <Form.Item className="mt-6" label="Студент" name="student">
            <AutoComplete
                allowClear
                disabled={form.getFieldValue('graduate') || form.getFieldValue('teacher')}
                placeholder="Введите ФИО"     
                options={dataGetStudents?.map((student: any) => ({ 
                value: student.name,
                id: student.id 
                }))}
                onSelect={(value,option) => {
                    console.log('Selected student ID:', value,option); // Здесь вы получите student.id
                    setId(option.id); 
                }}
            />
            </Form.Item>
            
            <Form.Item label="Сотрудник" name="teacher">
            <AutoComplete
                allowClear
                disabled={form.getFieldValue('graduate') || form.getFieldValue('student')}
                placeholder="Введите ФИО"
                options={dataGetEmployees?.map((employee: any) => ({ 
                value: employee.name,
                id: employee.id 
                }))}
                onSelect={(value,option) => {
                    console.log('Selected  ID:', value,option); 
                    setId(option.id); 
                }}
            />
            </Form.Item>
            
            <Form.Item label="Аспирант" name="graduate">
            <AutoComplete
                allowClear
                disabled={form.getFieldValue('student') || form.getFieldValue('teacher')}
                placeholder="Введите ФИО"
                options={dataGetEmployees?.map((employee: any) => ({ 
                    value: employee.name,
                    id: employee.id 
                }))}
                onSelect={(value,option) => {
                    console.log('Selected  ID:', value,option); 
                    setId(option.id); 
                }}
            />
            </Form.Item>
            
            <Form.Item label="Сообщение" name="text">
            <TextArea placeholder="Введите текст сообщения" />
            </Form.Item>
            
            <div className="w-full flex justify-center">
            <Button 
                loading={isLoadingNew}
                disabled={isButtonDisabled()} 
                htmlType="submit" 
                type="primary"
            >
                Создать диалог
            </Button>
            </div>
            
            {isButtonDisabled() && (
            <div className="w-full text-center mt-2">
                Необходимо выбрать только одну роль
            </div>
            )}
        </Form>
        </Modal>
   
  );
};