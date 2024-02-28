import { PlusOutlined } from '@ant-design/icons'
import { Input, InputRef, Space, Tag, Typography, theme } from 'antd'
import { TweenOneGroup } from 'rc-tween-one'
import { useEffect, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Skills } from './Skills'

interface IFormInput {
	skills: Array<string>
	story: string
}

export const ProfessionalSkills = () => {
	const { t } = useTranslation()
	const { control, handleSubmit } = useForm({
		defaultValues: {
			skills: [''],
			story: ''
		}
	})

	return (
		<div className="m-14 radio w-full max-w-2xl">
			<Space.Compact block direction="vertical" className="gap-5">
				<Typography.Title level={3}>{t('ProfessionalSkills')}</Typography.Title>
				<Space direction="vertical" size={'small'} className="w-full mb-5">
					<Typography.Text>
						Какими ключевыми навыками вы обладаете?
					</Typography.Text>
					<Skills />
				</Space>
				<Space direction="vertical" size={'small'} className="w-full">
					<Typography.Text>О себе (не обязательно)</Typography.Text>
					<Controller
						name="story"
						control={control}
						render={({ field }) => (
							<Input.TextArea
								{...field}
								rows={4}
								size="large"
								placeholder=""
								className="w-full"
							/>
						)}
					/>
				</Space>
			</Space.Compact>
		</div>
	)
}
