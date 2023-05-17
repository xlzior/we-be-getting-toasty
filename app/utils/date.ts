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

const rtf = new Intl.RelativeTimeFormat('en', { style: 'long' })

export const toRelativeMinutes = (date: string) => {
  let delta = Math.floor((Date.parse(date) - Date.now()) / (1000 * 60))
  return rtf.format(delta, 'minute')
}
