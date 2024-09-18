export interface myPractice {
    id: string;
    specialty: string;
    group: string;
    academicYear: string;
    practicePeriod: string;
    course: number;
    practiceType: string;
    practiceKind: string;
    place: string;
    departmentDirectorName: string;
    grade: string;
    profilePlace : string;
  }

  export interface Task {
    id: string;
    description: string;
  }
  
  export interface myPracticeOne {
    id: string;
    grade: string;
    place: string;
    specialty: string;
    profile: string;
    educationLevel: string;
    course: number;
    group: string;
    practiceType: string;
    practiceKind: string;
    practicePeriod: string;
    academicYear: string;
    departmentDirector: string;
    contractDepartmentDirector: string;
    contractAddress: string;
    competences: string[];
    tasks: Task[];
    profilePlace : string;
  }