import { t } from 'i18next'

import { AddEducationModal } from './AddEducationModal'
import { EducationsTable } from './EducationsTable'
import { OldEducationsTable } from './OldEducationsTable'

const EducationNew = () => {
	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<h1 className="font-bold text-[28px]/[28px]">{t('education')}</h1>
			<h2 className="pt-[52px] font-bold text-[14px]/[100%]">{t('finishedEducationalInstitutions')}</h2>
			<EducationsTable />
			<AddEducationModal />
			<h2 className="pt-[41.72px] font-bold text-[14px]/[100%]">{t('previousEducation')}</h2>
			<OldEducationsTable />
		</div>
	)
}

export default EducationNew
