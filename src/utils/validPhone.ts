//@ts-ignore
export const validator = (_, { valid }) => {
	if (valid()) return Promise.resolve()
	return Promise.reject('Invalid phone number')
}
