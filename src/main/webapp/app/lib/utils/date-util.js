import {
	format,
	formatDistanceToNow,
	formatDuration,
	intervalToDuration,
	parseISO,
} from 'date-fns'

export function formatDate(dateToFormat) {
	return dateToFormat
		? format(new Date(Date.parse(dateToFormat)), 'MM/dd/yyyy HH:mm')
		: '-'
}

export function formatToDatetimeLocalInput(dateToFormat) {
	return dateToFormat
		? format(new Date(Date.parse(dateToFormat)), "yyyy-MM-dd'T'HH:mm")
		: ''
}

export function parseFromDatetimeLocalInput(dateToFormat) {
	return dateToFormat ? parseISO(dateToFormat) : ''
}

export function formatDistance(dateToFormat) {
	return dateToFormat
		? formatDistanceToNow(new Date(Date.parse(dateToFormat)), {
				addSuffix: true,
		  })
		: '-'
}

export function formatDurationType(durationToFormat) {
	if (durationToFormat) {
		let valueInSeconds = durationToFormat.substring(
			durationToFormat.indexOf('.') + 1,
			durationToFormat.length - 1
		)
		return valueInSeconds
			? formatDuration(
					intervalToDuration({ start: 0, end: valueInSeconds * 1000 })
			  )
			: '-'
	} else {
		return '-'
	}
}
