const formatDate = (date: string, format: string) => {
  const formatted = new Date(date)

  if (format === 'day') {
    return formatted.getDate()
  }

  if (format === 'month') {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    return monthNames[formatted.getMonth()]
  }

  if (format === 'year') {
    return formatted.getFullYear()
  }
}

export default formatDate;