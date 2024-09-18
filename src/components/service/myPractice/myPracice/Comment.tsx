import { List, Avatar, Button, Form, Row, Col, Typography, Divider } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './myPracticeStyle.scss'
import { FileOutlined, UploadOutlined } from '@ant-design/icons';

const comments = [
  {
    author: 'Тетя Мотя',
    avatar: 'https://t3.ftcdn.net/jpg/06/57/85/22/360_F_657852299_5py03y6oH4mrUDyZnf9XxFSFfrjcqAzP.jpg',
    text: 'Нужно исправить',
   
  },
  {
    author: 'Тетя Мотя',
    avatar: 'https://t3.ftcdn.net/jpg/06/57/85/22/360_F_657852299_5py03y6oH4mrUDyZnf9XxFSFfrjcqAzP.jpg',
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
              <Col className='  p-4 flex flex-wrap justify-end rounded-lg w-25 bg-[#e3f2ff] cc'>
                <Typography className='text-sm  text-gray-400 text-end w-full'>Прикрепленные файлы</Typography>
                <a href={item.href} download>Файл</a>
              </Col>
            </Row>
            {/* <Divider className='border-solid border-y-4 border-[#f5f8fb]'/> */}
            <List.Item.Meta
              className='p-4  rounded-lg cc w-15 bg-[#65a1fa] flex-none text-white'
              avatar={<Avatar  src={item.avatar} />}
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
                        {/* <Typography className='text-sm text-white'>Прикрепленные файлы</Typography> */}
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
      {/* <Row>
        <Col>
          <Typography>Прикрепленные файлы</Typography>
           <a href='https://filesamples.com/samples/document/docx/sample2.docx' download>Файл</a>
        </Col>
      </Row> */}
    {/* <div>
        <Form className='flex mt-4'>
            <TextArea rows={1} />
            <Button>Отправить</Button>
        </Form>
    </div> */}
  </>
);
