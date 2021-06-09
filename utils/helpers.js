module.exports = {
    format_date: (date) => {
        return `${new Date(date).getDate()}/${new Date(date).getUTCMonth() + 1}/${new Date(date).getFullYear()}`
      }
  };