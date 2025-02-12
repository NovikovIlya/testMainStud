export 	function getCurrentAcademicYear() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // Месяцы начинаются с 0 (январь)
    // Учебный год обычно начинается в сентябре
    if (month >= 8) {
      return { value: year, label: `${year}/${year + 1}` };
    } else {
      return { value: year - 1, label: `${year - 1}/${year}` };
    }
  }