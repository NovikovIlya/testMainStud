import { PrinterOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Select } from 'antd'
import React, { useState } from 'react'
import TableBrs from './table/TableBrs';
import InfoCard from './InfoCard';

const Brs = () => {
	const [form] = Form.useForm()
  const discilineForm = Form.useWatch('disciline', form);
  const groupeForm = Form.useWatch('group', form);

  const [dataSource, setDataSource] = useState<any[]>([
    {
      N: '1',
      key: '0',
      name: 'Edward King 0',
      age: '32',
      address: 'London, Park Lane no. 0',
    },
    {
      N: '2',
      key: '1',
      name: 'Edward King 1',
      age: '32',
      address: 'London, Park Lane no. 1',
    },
  ]);

	return (
		<div className="p-[80px]">
      <InfoCard text={'Функционал "БРС" позволяет вводить результаты текущего контроля успеваемости студентов в течение семестра помесячно (колонку учетного месяца можно заполнять только в течение данного месяца и пяти дней последующего месяца'}/>

			<Form className='mt-8' form={form}>
				<Row >
					<Col span={24}>
						<Form.Item
							name="disciline"
							label="Дисциплина"
              labelAlign="left"
							labelCol={{ span: 4 }} // Фиксированная ширина лейбла
							wrapperCol={{ span: 18 }} // Оставшаяся ширина для инпута
						>
							<Select placeholder="Выберите дисциплину" allowClear options={[{ value: '1', label: 'Дисциплина 1' },{ value: '2', label: 'Дисциплина 2' }]} />
						</Form.Item>
					</Col>

					<Col span={24}>
						<Form.Item
              
							name="group"
							label="Группа"
              labelAlign="left"
							labelCol={{ span: 4 }} // Такая же ширина лейбла
							wrapperCol={{ span: 10 }} // Такая же ширина инпута
						>
							<Select disabled={!discilineForm} placeholder="Выберите группу" allowClear />
						</Form.Item>
					</Col>
				</Row>
			</Form>

      <Row className='flex gap-2'>
        <Button className='rounded-xl' icon={<PrinterOutlined  />}>Печать журнала (пустой)</Button>
        <Button className='rounded-xl' icon={<PrinterOutlined  />}>Печать журнала (заполненный)</Button>
      </Row>

      <TableBrs setDataSource={setDataSource} dataSource={dataSource}/>

      <InfoCard text={'Перед работой со вкладкой «БРС» необходимо зайти во вкладку «Расписание» и проверить правильность занесения Вашим деканатом расписания Ваших занятий.'}/>
		</div>
	)
}

export default Brs
