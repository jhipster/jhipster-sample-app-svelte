export function validate(node, validations) {
	const validator = createValidator(validations)
	function validateField(event) {
		if (node && event.target) {
			node.dispatchEvent(
				new CustomEvent('validation', {
					detail: { ...validator(event.target.value), dirty: true },
				})
			)
		}
	}

	node.addEventListener('input', validateField)

	return {
		destroy() {
			node.removeEventListener('input', validateField)
		},
	}
}

export function createValidator(validations) {
	return function validate(value) {
		if (!validations || validations.length === 0) {
			return { valid: true }
		}

		const valiators = validations.map(validation => {
			const { type, ...validationArgs } = validation
			switch (type) {
				case 'required':
					return required(validationArgs)
				case 'minlength':
					return minlength(validationArgs)
				case 'maxlength':
					return maxlength(validationArgs)
				case 'pattern':
					return pattern(validationArgs)
				default:
					throw new Error(`Invalid validation type ${type}`)
			}
		})

		const failed = valiators.find(v => v(value) !== undefined)
		return {
			valid: !failed,
			message: failed && failed(value),
		}
	}
}

function required(validationArgs) {
	const { message } = validationArgs
	return function (value) {
		if (value === undefined || value === null || value.trim() === '') {
			return message || 'This field is required'
		}
	}
}

function minlength(validationArgs) {
	const { message, minlength } = validationArgs
	return function (value) {
		if (
			value !== undefined &&
			value !== null &&
			value.trim().length < minlength
		) {
			return (
				message ||
				`The field value should be greater than ${minlength} characters`
			)
		}
	}
}

function maxlength(validationArgs) {
	const { message, maxlength } = validationArgs
	return function (value) {
		if (
			value !== undefined &&
			value !== null &&
			value.trim().length > maxlength
		) {
			return (
				message ||
				`The field value should be less than ${maxlength} characters`
			)
		}
	}
}

function pattern(validationArgs) {
	const { message, pattern } = validationArgs
	return function (value) {
		if (
			value !== undefined &&
			value !== null &&
			!pattern.test(value.trim())
		) {
			return message || `The field value should match the pattern`
		}
	}
}
