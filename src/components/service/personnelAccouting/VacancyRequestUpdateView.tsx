import { Button } from 'antd'
import { diff_match_patch } from 'diff-match-patch'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	useAcceptUpdateVacancyRequestMutation,
	useDenyVacancyRequestMutation,
	useGetVacancyRequestViewQuery,
	useGetVacancyRequestsQuery
} from '../../../store/api/serviceApi'
import ArrowIcon from '../jobSeeker/ArrowIcon'

export const VacancyRequestUpdateView = () => {
	const { requestId } = useAppSelector(state => state.currentRequest)
	const { data: requestView } = useGetVacancyRequestViewQuery(requestId)
	const navigate = useNavigate()
	const [acceptRequest] = useAcceptUpdateVacancyRequestMutation()
	const [denyRequest] = useDenyVacancyRequestMutation()

	const { refetch } = useGetVacancyRequestsQuery('все')

	const dmp = new diff_match_patch()

	dmp.diff_cleanupSemantic(dmp.diff_main('', ''))

	return (
		<>
			<div id="wrapper" className="pl-[54px] pr-[54px] pt-[60px] w-full">
				<div className="flex">
					<button
						onClick={() => {
							navigate('/services/personnelaccounting/vacancyrequests')
						}}
						className="bg-inherit h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
					>
						<ArrowIcon />
					</button>
					<p className="ml-[40px] font-content-font font-normal text-black text-[28px]/[33.6px]">
						{requestView !== undefined && requestView.oldData !== null
							? (() => {
									var test = dmp.diff_main(
										requestView.oldData.post,
										requestView.newData.post
									)
									dmp.diff_cleanupSemantic(test)
									return test
							  })().map(diff =>
									diff[0] < 0 ? (
										<span className="bg-red-400 bg-opacity-60">{diff[1]}</span>
									) : diff[0] > 0 ? (
										<span className="bg-green-400 bg-opacity-60">
											{diff[1]}
										</span>
									) : (
										<span>{diff[1]}</span>
									)
							  )
							: ''}
					</p>
				</div>
				<div className="w-[50%] mt-[80px] flex flex-col gap-[40px]">
					<div className="flex gap-[60px]">
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Требуемый опыт работы:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">
								{requestView !== undefined && requestView.oldData !== null
									? (() => {
											var test = dmp.diff_main(
												requestView.oldData.experience,
												requestView.newData.experience
											)
											dmp.diff_cleanupSemantic(test)
											return test
									  })().map(diff =>
											diff[0] < 0 ? (
												<span className="bg-red-400 bg-opacity-60">
													{diff[1]}
												</span>
											) : diff[0] > 0 ? (
												<span className="bg-green-400 bg-opacity-60">
													{diff[1]}
												</span>
											) : (
												<span>{diff[1]}</span>
											)
									  )
									: ''}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Тип занятости:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">
								{requestView !== undefined && requestView.oldData !== null
									? (() => {
											var test = dmp.diff_main(
												requestView.oldData.employment,
												requestView.newData.employment
											)
											dmp.diff_cleanupSemantic(test)
											return test
									  })().map(diff =>
											diff[0] < 0 ? (
												<span className="bg-red-400 bg-opacity-60">
													{diff[1]}
												</span>
											) : diff[0] > 0 ? (
												<span className="bg-green-400 bg-opacity-60">
													{diff[1]}
												</span>
											) : (
												<span>{diff[1]}</span>
											)
									  )
									: ''}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Заработная плата:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">
								{requestView !== undefined && requestView.oldData !== null
									? (() => {
											var test = dmp.diff_main(
												requestView.oldData.salary,
												requestView.newData.salary
											)
											dmp.diff_cleanupSemantic(test)
											return test
									  })().map(diff =>
											diff[0] < 0 ? (
												<span className="bg-red-400 bg-opacity-60">
													{diff[1]}
												</span>
											) : diff[0] > 0 ? (
												<span className="bg-green-400 bg-opacity-60">
													{diff[1]}
												</span>
											) : (
												<span>{diff[1]}</span>
											)
									  )
									: ''}
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-[16px]">
						<p className="font-content-font font-bold text-black text-[18px]/[21px]">
							Задачи:
						</p>
						<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
							{requestView !== undefined && requestView.oldData !== null
								? (() => {
										var test = dmp.diff_main(
											requestView.oldData.responsibilities,
											requestView.newData.responsibilities
										)
										dmp.diff_cleanupSemantic(test)
										return test
								  })().map(diff =>
										diff[0] < 0 ? (
											<span className="bg-red-400 bg-opacity-60">
												{diff[1]}
											</span>
										) : diff[0] > 0 ? (
											<span className="bg-green-400 bg-opacity-60">
												{diff[1]}
											</span>
										) : (
											<span>{diff[1]}</span>
										)
								  )
								: ''}
						</p>
					</div>
					<div className="flex flex-col gap-[16px]">
						<p className="font-content-font font-bold text-black text-[18px]/[21px]">
							Требования:
						</p>
						<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
							{requestView !== undefined && requestView.oldData !== null
								? (() => {
										var test = dmp.diff_main(
											requestView.oldData.skills,
											requestView.newData.skills
										)
										dmp.diff_cleanupSemantic(test)
										return test
								  })().map(diff =>
										diff[0] < 0 ? (
											<span className="bg-red-400 bg-opacity-60">
												{diff[1]}
											</span>
										) : diff[0] > 0 ? (
											<span className="bg-green-400 bg-opacity-60">
												{diff[1]}
											</span>
										) : (
											<span>{diff[1]}</span>
										)
								  )
								: ''}
						</p>
					</div>
					<div className="flex flex-col gap-[16px]">
						<p className="font-content-font font-bold text-black text-[18px]/[21px]">
							Условия:
						</p>
						<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
							{requestView !== undefined && requestView.oldData !== null
								? (() => {
										var test = dmp.diff_main(
											requestView.oldData.conditions,
											requestView.newData.conditions
										)
										dmp.diff_cleanupSemantic(test)
										return test
								  })().map(diff =>
										diff[0] < 0 ? (
											<span className="bg-red-400 bg-opacity-60">
												{diff[1]}
											</span>
										) : diff[0] > 0 ? (
											<span className="bg-green-400 bg-opacity-60">
												{diff[1]}
											</span>
										) : (
											<span>{diff[1]}</span>
										)
								  )
								: ''}
						</p>
					</div>
					{/* <div className="flex gap-[40px]">
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Категория сотрудников
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">
								{requestView !== undefined && requestView.oldData !== null
									? (() => {
											var test = dmp.diff_main(
												requestView.oldData.category,
												requestView.newData.category
											)
											dmp.diff_cleanupSemantic(test)
											return test
									  })().map(diff =>
											diff[0] < 0 ? (
												<span className="bg-red-400 bg-opacity-60">
													{diff[1]}
												</span>
											) : diff[0] > 0 ? (
												<span className="bg-green-400 bg-opacity-60">
													{diff[1]}
												</span>
											) : (
												<span>{diff[1]}</span>
											)
									  )
									: ''}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Профобласть
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">
								{requestView !== undefined && requestView.oldData !== null
									? (() => {
											var test = dmp.diff_main(
												requestView.oldData.direction,
												requestView.newData.direction
											)
											dmp.diff_cleanupSemantic(test)
											return test
									  })().map(diff =>
											diff[0] < 0 ? (
												<span className="bg-red-400 bg-opacity-60">
													{diff[1]}
												</span>
											) : diff[0] > 0 ? (
												<span className="bg-green-400 bg-opacity-60">
													{diff[1]}
												</span>
											) : (
												<span>{diff[1]}</span>
											)
									  )
									: ''}
							</p>
						</div>
					</div> */}
					<div className="flex gap-[20px]">
						<Button
							onClick={() => {
								denyRequest(requestId)
									.unwrap()
									.then(() => {
										navigate('/services/personnelaccounting/vacancyrequests')
									})
							}}
							className="w-[151px] font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black bg-inherit"
						>
							Отклонить
						</Button>
						<Button
							onClick={() => {
								acceptRequest(requestId)
									.unwrap()
									.then(() => {
										refetch()
									})
									.then(() => {
										navigate('/services/personnelaccounting/vacancyrequests')
									})
							}}
							type="primary"
							className="rounded-[54.5px] w-[121px]"
						>
							Принять
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
