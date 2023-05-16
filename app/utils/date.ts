function formatDateTime(date: Date): string {
  date.setHours(date.getHours() + 8) // adjust to SGT
  return date.toISOString().substring(0, 19)
}

export function getDateTime(): string {
  return formatDateTime(new Date())
}

export function oneMinuteBefore(datetimeString: string): string {
  const datetime = new Date(datetimeString);
  datetime.setMinutes(datetime.getMinutes() - 1);
  return formatDateTime(datetime)
}
