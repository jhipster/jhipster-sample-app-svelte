<script>
	import { Button, PasswordConfirm } from 'jhipster-svelte-library'
	import { Form } from 'jhipster-svelte-library/page'

	export let password = ''
	let validPassword = false
</script>

<Form testId="resetPwdForm">
	<PasswordConfirm
		label="New Password"
		value="{password}"
		on:input="{event => (password = event.detail.value)}"
		on:validate="{event => (validPassword = event.detail.valid)}"
	/>
	<Button type="submit" on:click disabled="{!validPassword}">Reset password</Button>
</Form>
