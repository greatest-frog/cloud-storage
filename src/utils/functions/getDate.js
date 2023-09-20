function getDate(metaDate) {
  if (metaDate) {
    const date = new Date(metaDate);
    let day = date.getDate();
    let month = date.getMonth();

    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    return `${day}/${month}/${date.getFullYear()}`;
  }
  return "";
}
export default getDate;
