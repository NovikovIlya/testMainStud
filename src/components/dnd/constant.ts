// w - ширина элемента. Если w больше 1-го, то объект займёт больше 1-го места.
// y - высота элемента. Если w больше 1-го, то объект займёт больше 1-го места.
// x - расположение элемента по горизонтали
// y - расположение элемента по вертикали
// static - если false, можно перемещать элемент. Если true, то нельзя
// moved - устанавливает события перетаскивания
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
export const block = {
	lg: [
		{
			w: 3,
			h: 1,
			minW: 3,
			maxW: 3,
			x: 0,
			y: 0,
			i: 'jobSeeker'
		},
		{
			w: 1,
			h: 1,
			x: 0,
			y: 0,
			i: 'myResponds'
		},
		{
			w: 1,
			h: 1,
			x: 1,
			y: 0,
			i: 'DirectResume'
		},
		{
			w: 1,
			h: 1,
			x: 2,
			y: 0,
			i: 'personnelAccounting'
		},
		{
			w: 3,
			h: 1,
			minW: 2,
			x: 0,
			y: 0,
			i: 'Schedule',
			moved: true,
			static: true
		},

		//1-ая тройка
		{
			w: 1,
			h: 1,

			x: 1,
			y: 0,
			i: 'ElectronicBook',
			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,

			x: 0,
			y: 0,
			i: 'Session',
			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: 2,
			y: 1,
			i: 'Testing',

			moved: true,
			static: false
		},

		///2-ая тройка
		{
			w: 1,
			h: 1,
			x: 0,
			y: 2,
			i: 'Dormitory',

			moved: true,
			static: false
		},
		// {
		//     w: 1,
		//     h: 1,
		//     x: 1,
		//     y: 2,
		//     i: 'PaySheet',
		//     maxH: 4,
		//     maxW: 4,
		//     moved: true,
		//     static: false
		// },
		{
			w: 1,
			h: 1,
			x: 1,
			y: 2,
			i: 'Practices',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: 2,
			y: 2,
			i: 'myPractices',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: 0,
			y: 3,
			i: 'practiceTeacher',

			moved: true,
			static: false
		},

		//3-ья тройка
		{
			w: 1,
			h: 1,
			x: 1,
			y: 3,
			i: 'EducationalCourses',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,

			x: 0,
			y: 1,
			i: 'PsychologicalHelp',

			moved: true,
			static: false
		},

		//4-ая тройка
		{
			w: 1,
			h: 1,
			x: 0,
			y: 4,
			i: 'Applications',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: 2,
			y: 5,
			i: 'Staff',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: 2,
			y: 4,
			i: 'Vacancies',

			moved: true,
			static: false
		},

		//5-ая тройка
		{
			w: 1,
			h: 1,
			x: 0,
			y: 4,
			i: 'News',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: isMobile ? 0 : 1,
			y: 5,
			i: 'DocumentFlow',

			moved: true,
			static: false
		},
		// {
		//     w: 1,
		//     h: 1,
		//     x: 2,
		//     y: 5,
		//     i: 'SitAnKFU',
		//     maxH: 4,
		//     maxW: 4,
		//     moved: true,
		//     static: false
		// },

		//6-ая тройка
		{
			w: 1,
			h: 1,
			x: 2,
			y: 2,
			i: 'VirtualAudience',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: isMobile  ? 0 : 1,
			y: 5,
			i: 'DigitalDepartments',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: 2,
			y: 2,
			i: 'ManagementScientificProjects',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: 1,
			y: 4,
			i: 'petitionForDocument',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: 0,
			y: 4,
			i: 'contractEducation',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: 0,
			y: 5,
			i: 'educationPrograms',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: 1,
			y: 5,
			i: 'forTeachers',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: 2,
			y: 5,
			i: 'otpusk',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: 0,
			y: 6,
			i: 'rasList',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: 1,
			y: 6,
			i: 'eventList',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: 2,
			y: 6,
			i: 'trip',

			moved: true,
			static: false
		},
		{
			w: 1,
			h: 1,
			x: 2,
			y: 5,
			i: 'shortLink',

			moved: true,
			static: false
		}
	]
}
