// Интерфейс для описания информации о студенте
export interface Student {
    studId: number; // Идентификатор студента
    studJournalId: number; // Идентификатор журнала студента
    studName: string; // ФИО студента
    firstMonth: number; // Оценка за первый месяц
    secondMonth: number; // Оценка за второй месяц
    thirdMonth: number; // Оценка за третий месяц
    fourthMonth: number; // Оценка за четвертый месяц
    sum: number; // Суммарная оценка
    key:number;
    index: number;
    N?: number;
}

// Интерфейс для описания всей структуры данных
export interface dataBrs {
    semester: number; // Номер семестра
    students: Student[]; // Массив студентов
    emptyPrintForm:string,
    filledPrintForm:string;
}
