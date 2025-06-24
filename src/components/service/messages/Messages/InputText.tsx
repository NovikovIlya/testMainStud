import { SendOutlined } from '@ant-design/icons'
import { Button, Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'

const InputText = ({disabled=false,files,text='',clickTextArea,isModal=false,form }: any) => {

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter' && !e.shiftKey) {
		  e.preventDefault()
		  
		  // Получаем значение из поля
		  const textAreaValue = form.getFieldValue('textArea')
		  
		  // Проверяем, не пустое ли поле
		  if (!textAreaValue?.trim()) {
			// Устанавливаем ошибку валидации
			form.setFields([
			  {
				name: 'textArea',
				errors: ['']
			  }
			])
			return
		  }
		  
		  form.submit()
		}
	  }

	return (
		<>
			<Form.Item className=" w-full" name={'textArea'}>
				<TextArea
				
					disabled={disabled ? true : false}
                     style={{resize: 'none',
						backgroundColor: disabled ? '#FFFFF0' : 'white', // Задайте цвет в зависимости от состояния
						color: disabled ? 'rgba(0, 0, 0, 0.25)' : 'black' // Цвет текста
					  }}
					maxLength={1000}
					
					className={`${isModal ? `rounded-[10px_0px_0px_10px]` : `rounded-[10px_0px_0px_10px]` }   !h-[54px]`}
					onClick={clickTextArea}
                    value={text}
					required
					onKeyPress={handleKeyPress}
				/>
			</Form.Item>
			<Button
			style={{
				backgroundColor: disabled ? '#FFFFF0' : 'white', // Задайте цвет в зависимости от состояния
				
			  }}
				disabled={disabled ? true : false}
				htmlType="submit"
				icon={<SendOutlined />}
				className="rounded-[0px_10px_10px_0px] h-[54px] "
				size="large"
               
			/>
            
		</>
    
	)
}

export default InputText
