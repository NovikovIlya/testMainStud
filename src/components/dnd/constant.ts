// w - ширина элемента. Если w больше 1-го, то объект займёт больше 1-го места.
// y - высота элемента. Если w больше 1-го, то объект займёт больше 1-го места.
// x - расположение элемента по горизонтали
// y - расположение элемента по вертикали
// static - если false, можно перемещать элемент. Если true, то нельзя
// moved - устанавливает события перетаскивания


export const block = {
    lg: [
        {
            w: 3,
            h: 1,
            minW: 2,
            x: 0,
            y: 0,
            i: 'Schedule',
			moved: true,
			static: false
        },

        //1-ая тройка
        {
            w: 1,
            h: 1,
            maxH: 4,
            maxW: 4,
            x: 0,
            y: 1,
            i: 'ElectronicBook',
            moved: true,
            static: false
        },
        {
            w: 1,
            h: 1,
            maxH: 4,
            maxW: 4,
            x: 1,
            y: 1,
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
			maxH: 4,
			maxW: 4,
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
            maxH: 4,
            maxW: 4,
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
            x: 2,
            y: 2,
            i: 'Practices',
            maxH: 4,
            maxW: 4,
            moved: true,
            static: false
        },
        {
            w: 1,
            h: 1,
            x: 2,
            y: 2,
            i: 'myPractices',
            maxH: 4,
            maxW: 4,
            moved: true,
            static: false
        },
        {
            w: 1,
            h: 1,
            x: 2,
            y: 2,
            i: 'practiceTeacher',
            maxH: 4,
            maxW: 4,
            moved: true,
            static: false
        },

        //3-ья тройка
        {
            w: 2,
            h: 1,
            x: 0,
            y: 3,
            i: 'EducationalCourses',
            maxH: 4,
            maxW: 4,
            moved: true,
            static: false
        },
        {
            w: 1,
            h: 1,
            x: 2,
            y: 3,
            i: 'PsychologicalHelp',
            maxH: 4,
            maxW: 4,
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
            maxH: 4,
            maxW: 4,
            moved: true,
            static: false
        },
        {
            w: 1,
            h: 1,
            x: 1,
            y: 4,
            i: 'Staff',
            maxH: 4,
            maxW: 4,
            moved: true,
            static: false
        },
        {
            w: 1,
            h: 1,
            x: 2,
            y: 4,
            i: 'Vacancies',
            maxH: 4,
            maxW: 4,
            moved: true,
            static: false
        },

        //5-ая тройка
        {
            w: 1,
            h: 1,
            x: 0,
            y: 5,
            i: 'News',
            maxH: 4,
            maxW: 4,
            moved: true,
            static: false
        },
        {
            w: 1,
            h: 1,
            x: 1,
            y: 5,
            i: 'DocumentFlow',
            maxH: 4,
            maxW: 4,
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
            maxH: 4,
            maxW: 4,
            moved: true,
            static: false
        },
        {
            w: 1,
            h: 1,
            x: 1,
            y: 5,
            i: 'DigitalDepartments',
            maxH: 4,
            maxW: 4,
            moved: true,
            static: false,
        },
        {
            w: 1,
            h: 1,
            x: 2,
            y: 2,
            i: 'ManagementScientificProjects',
            maxH: 4,
            maxW: 4,
            moved: true,
            static: false,
        }


    ]
}
