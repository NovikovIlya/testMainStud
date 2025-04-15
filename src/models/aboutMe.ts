export interface StudentAddedDto {
    GRADE: string;
    FACULTY: string;
    SPECIALITY: string;
    STUDY_TYPE: string;
    CATEGORY: string;
    GROUP: string;
    LIBCARD: string;
    IDENT: string;
    STUDYEND: string;
  }
  
  export interface EmployeeAddedDto {
    WORKPHONE: string | null;
    WORKADDRESS_ROOM: string;
    WORKADDRESS_BUILDING: string;
    EMAIL: string;
    POSITION: string;
    PARTTIMEWORK: string | null;
    COMMENT: string | null;
  }
  
  export interface UserDto {
    studentAddedDto: StudentAddedDto;
    employeeAddedDto: EmployeeAddedDto;
    aspirAddedDto:any;
    ID: number;
    LASTNAME: string;
    FIRSTNAME: string;
    SECONDNAME: string;
    BIRTH_DATE: string;
    SEX: string;
    CITIZENSHIP_TYPE: string;
    CITIZENSHIP_COUNTRY: string;
    BIRTH_CITY: string;
    BIRTH_PLACE: string | null;
  }

export interface CheckedFlags {
  IS_CHECKED_ETIQ: number;
  IS_CHECKED_LIB: number;
  IS_CHECKED_REL: number;
  IS_CHECKED_HANDLING: number;
  IS_CHECKED_PERS_DATA: number;
}

export interface CertificateTs {
	id: string
	certificateName: string
	certificateLink: string
}

// Language data interface
export interface LanguageData {
	studLangId: string
	key: string
	language: string
	code: string
	languageLevel: string
	languageLevelCode: string
	certificates: CertificateTs[]
	isPublished: boolean
}

// Props interface for TableLanguages component
export interface TableLanguagesProps {
	isSuccess: boolean
	dataCertificate: {
		id: string
		certificateName: string
	}[]
	dataLevels: {
		languageLevelCode: string
		languageLevel: string
	}[]
	dataAll: {
		code: string
		language: string
	}[]
	dataForeign: LanguageData[]
	setSelectId: (id: string) => void
	selectId: string | null
}

export // Form values interface
interface FormValues {
  languageCode: string
  languageLevelCode: string
  certificateId: string | null
  isPublished: boolean
  file: any[]
}