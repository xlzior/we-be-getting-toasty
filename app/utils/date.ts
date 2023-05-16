function formatDateTime(date: Date): string {
  const YYYY = date.getFullYear()
  const MM = String(date.getMonth() + 1).padStart(2, '0')
  const DD = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${YYYY}-${MM}-${DD}T${hh}:${mm}:00`
}

export function getDateTime(): string {
  return formatDateTime(new Date())
}

export function oneMinuteBefore(datetimeString: string): string {
  const datetime = new Date(datetimeString);
  datetime.setMinutes(datetime.getMinutes() - 1);
  return formatDateTime(datetime)
}
