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
  certificateTypeId:any
  langId:any
	id: string
	certificateName: string
	certificateLink: string
  certificateTypeName:any
  certId:any
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
  langId:any
}

// Props interface for TableLanguages component
export interface TableLanguagesProps {
  triger:any
  handleIdCert?:any
	isSuccess: boolean
	dataCertificate: {
		id: string | number
		certificateName: string
	}[] | undefined;
	dataLevels: {
		languageLevelCode: string
		languageLevel: string
	}[] | undefined;
	dataAll: {
		code: string
		language: string
	}[] | undefined;
	dataForeign:any;
	setSelectId: (id: string) => void
	selectId: string | number | null | undefined;
}

export interface TableScintificProps {
 
  handleIdCert?:any
	isSuccess: boolean
	dataCertificate: {
		id: string | number
		certificateName: string
	}[] | undefined;
	dataLevels: {
		languageLevelCode: string
		languageLevel: string
	}[] | undefined;
	dataAll: {
		code: string
		language: string
	}[] | undefined;
	dataForeign:any;
	setSelectId: (id: string) => void
	selectId: string | number | null | undefined;
}

export interface FormValues {
  languageCode: string
  languageLevelCode: string
  certificateId: string | null
  isPublished: boolean
  file: any[]
}


export interface Language {
  code: string
  language: string
}

export interface NativeLanguagesApiResponse {
  languages: Language[]
}

export interface LanguageLevel {
  languageLevelCode: string
  languageLevel: string
}

export interface Certificate {
  id: string | number
  certificateName: string
}

export interface ForeignLanguage {
  languageCode: string
  languageLevelCode: string
  certificateId: Certificate['id']
  isPublished?: boolean
  file?: File[]
}

export interface foreignLanguageAll {
  langId: number;
  code: number;
  language: string;
  languageLevelCode: number;
  languageLevel: string;
  isPublished: boolean;
  certificates: Certificate[];
}

export interface socActivity {

    socialWork: string
    creativeEvents: string
    sportEvents: string
    sectionsAndClubs: string

}

export interface ScientificActivityPayload {
  isRussian: boolean;
  year: number;
  theme: string;
  direction: string;
  scientificDirectorId: number | null;
  isPublished: boolean;
}
export interface EditScientificActivityPayload {
  id: number,
  isRussian: boolean;
  year: number;
  theme: string;
  direction: string;
  scientificDirectorId: number | null;
  isPublished: boolean;

};

export type Directors = {
   id: number;
  name: string;
}[];