<script>
	import { Button, Password, PasswordConfirm } from 'jhipster-svelte-library'
	import { Form } from 'jhipster-svelte-library/page'

	export let currentPassword = ''
	export let newPassword = ''
	let validCurrentPassword = false
	let validNewPassword = false

	$: validForm = validCurrentPassword && validNewPassword
</script>

<Form testId="password">
	<Password
		name="currentPassword"
		label="Current Password"
		value="{currentPassword}"
		on:input="{event => (currentPassword = event.target.value)}"
		on:validate="{event => (validCurrentPassword = event.detail.valid)}"
	/>

	<PasswordConfirm
		name="newPassword"
		label="New Password"
		value="{newPassword}"
		on:input="{event => (newPassword = event.detail.value)}"
		on:validate="{event => (validNewPassword = event.detail.valid)}"
	/>
	<Button type="submit" on:click disabled="{!validForm}">Update password</Button>
</Form>
