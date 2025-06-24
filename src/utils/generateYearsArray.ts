export 	const generateYearsArray = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2008;
    const years = [];
    
    for (let year = startYear; year <= currentYear; year++) {
      years.push({
        value: year,
        label: year.toString()
      });
    }
    
    return years;
  };