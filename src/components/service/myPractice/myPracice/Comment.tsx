import { List, Avatar, Button, Form, Row, Col, Typography, Divider } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './myPracticeStyle.scss'

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
            <Typography.Title level={2}>Комментарии проверяющего</Typography.Title>
        </Col>
	</Row>
          
    <List
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={item => (
        <List.Item className='rounded-lg  mb-6 flex-wrap ant-list-itemTwo'>
            <Row className='mt-6 w-full  justify-end mb-3    w-25'>
              <Col className='  p-4 flex flex-wrap justify-end rounded-lg w-25 bg-white cc'>
                <Typography className='text-sm  text-gray-400 text-end w-full'>Прикрепленные файлы</Typography>
                <a href={item.href} download>Файл</a>
              </Col>
            </Row>
            {/* <Divider className='border-solid border-y-4 border-[#f5f8fb]'/> */}
            <List.Item.Meta
              className='p-4   cc w-15 bg-white flex-none'
              avatar={<Avatar  src={item.avatar} />}
              title={item.author}
              description={
                <>
                  <Row>
                    <Col>
                      <span className='text-slate-950'>{item.text}</span>
                    </Col>
                  </Row>
                  <Row className='mt-6'>
                    <Col>
                      <Typography className='text-sm text-gray-400'>Прикрепленные файлы</Typography>
                      <a href={item.href} download>Файл</a>
                    </Col>
                  </Row>
                </>
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
