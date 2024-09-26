import { List, Avatar, Button, Form, Row, Col, Typography, Divider } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './myPracticeStyle.scss'
import { FileOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons';
import avaStudent from '../../../../assets/images/avaStudent.png'
import avaTeacher from '../../../../assets/images/avaTeacher.png'


export const CommentNew = () => (
  <>
    <Row className='mb-20'>
        <Col span={12}>
            <Typography.Title level={2}>Комментарии по практике</Typography.Title>
            <span>Загружайте пакет документов на проверку и получайте обратную связь прямо в окне комментариев </span>
        </Col>
        <Col span={12} className='flex justify-end'>
            <Button className='mt-8 mb-8 ml-8' size='large' shape="circle"  icon={<ReloadOutlined />}/>
        </Col>
	</Row>
          
    <div className="space-y-4 h-[400px] overflow-y-auto">
    
      <div className="flex items-start justify-end">
        <div className="flex flex-col items-end">
          <div className="flex items-center mb-1">
            <span className="text-xs text-gray-500 flex gap-2"><span>12:46,</span> <span>26.09.2024</span></span>
            <span className="font-bold ml-2">Илья Новиков</span>
          </div>
          <div className="bg-blue-500 text-white rounded-lg rounded-tr-none p-3 max-w-xs">
            Файл сьела собака! емаеее
          </div>
          <div className='flex gap-3 mt-4'>
            <a className='text-blue-500' href='' download>Файл</a>
            <FileOutlined style={{ color: '' }} className='w-4 h-4 cursor-pointer mt-1 color-white' />
          </div>
        </div>
        <div className="flex-shrink-0 ml-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={avaStudent}
              alt="student"
            />
          </div>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={avaTeacher}
              alt="teacher"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <span className="font-bold mr-2">Тетя мотя</span>
            <span className="text-xs text-gray-500 flex gap-2 mt-[1px]"><span>12:46,</span> <span>26.09.2024</span></span>
          </div>
          <div className="bg-gray-200 rounded-lg rounded-tl-none p-3 max-w-xs">
            Жду файла!
          </div>
          <div className='flex gap-3 mt-4'>
            <FileOutlined style={{ color: '' }} className='w-4 h-4 cursor-pointer mt-1 color-white' />
            <a className='text-blue-500' href='' download>Файл</a>
          </div>
        </div>
      </div>
    </div>


  </>
);
