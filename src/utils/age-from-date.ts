export const ageFromDate = (dateString: string) => {
  let today = new Date()
  let birthday = new Date(dateString)
  let age = today.getFullYear() - birthday.getFullYear()
  let months = today.getMonth() - birthday.getMonth()
  if (months < 0 || (months === 0 && today.getDate() < birthday.getDate())) {
    age--
  }
  return age
}
