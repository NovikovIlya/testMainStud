import { List, Avatar, Button, Form, Row, Col, Typography, Divider } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './myPracticeStyle.scss'
import { FileOutlined, UploadOutlined } from '@ant-design/icons';

const comments = [
  {
    author: 'Тетя Мотя',
    // avatar: 'https://t3.ftcdn.net/jpg/06/57/85/22/360_F_657852299_5py03y6oH4mrUDyZnf9XxFSFfrjcqAzP.jpg',
    href:'https://filesamples.com/samples/document/docx/sample2.docx',
    text: 'Нужно исправить',
   
  },
  {
    author: 'Тетя Мотя',
    href:'https://filesamples.com/samples/document/docx/sample2.docx',
    text: 'Хорошо получилось, молодец, но есть правки',
   
  }
];

export const Comment = () => (
  <>
    <Row>
        <Col>
            <Typography.Title level={2}>Комментарии по практике</Typography.Title>
            <span>Загружайте пакет документов на проверку и получайте обратную связь прямо в окне комментариев </span>
        </Col>
	</Row>
          
    <List
        className='ant-list-itemThree h-[400px] mt-6 p-4  overflow-y-auto border-solid border-y-4 border-[#7ab0e6]'
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={item => (
        <List.Item className='rounded-lg  mb-0 flex-wrap ant-list-itemThree'>
            <Row className='mt-6 w-full  justify-end mb-3    w-25'>
              <Col className='  p-4 flex flex-wrap justify-end rounded-lg w-25 bg-[#1F5CB8] cc'>
                <Typography className='text-sm  text-white text-end w-full'>Отправляю вам документы!</Typography>
               <div className='flex gap-3'>
                <a className='text-yellow-500' href={item.href} download>Файл</a>
                <FileOutlined style={{ color: 'white' }} className='w-4 h-4 cursor-pointer mt-1 color-white' />
               </div>
              </Col>
            </Row>

            <List.Item.Meta
              className='p-4  rounded-xl cc w-15 bg-[#545457] flex-none text-white'
             
              title={<div className='text-white'>{item.author}</div>}
              description={
                <div className=''>
                  <Row>
                    <Col>
                      <span className='text-gray-100  '>{item.text}</span>
                    </Col>
                  </Row>
                  <Row className='mt-6'>
                    <Col className='flex items-center gap-2 '>
                      <div>
                          <FileOutlined style={{ color: 'white' }} className='w-4 h-4 cursor-pointer mt-1 color-white' />
                      </div>
                      <div>
                        <a className='text-yellow-500' href={item.href} download>Файл</a>
                      </div>
                    </Col>
                  </Row>
                </div>
              }
            />
            
        </List.Item>
      
        )}
    />

  </>
);
