export const extractContentWithinBrackets = (str: string) => {
	const regex = /\(([^()]*|\((?:[^()]*|\([^()]*\))*\))*\)/g
	const matches = str.match(regex) 

	if (matches) {
		return matches.map(match => match.slice(1, -1))
	} else {
		return null
	}
}

export const ContentWithinBrackets = (str: string) => {
	const regex = /\([^()]*\)/g
	const result = str.replace(regex, '').trim()

	return result
}

export const hasBrackets = (str: string) => {
	const regex = /\(|\)/
	return regex.test(str)
}
