<script>
	import { onMount } from 'svelte'
	import { Alert } from 'jhipster-svelte-library'
	import { Page } from 'jhipster-svelte-library/page'

	import auth from '$lib/auth/auth-store'
	import accountService from '$lib/account/account-service'
	import UserSettingsForm from '$lib/account/user-settings-form.svelte'

	let error
	let user = {}
	let settingsUpdated = false

	onMount(() => initAccount())

	function initAccount() {
		user = {
			...user,
			login: $auth.login,
			firstName: $auth.firstName,
			lastName: $auth.lastName,
			email: $auth.email,
		}
	}

	function updateAccount(event) {
		error = undefined
		settingsUpdated = false
		const updatedAccount = { ...$auth, ...event.detail }
		accountService
			.updateAccount(updatedAccount)
			.then(() => auth.loadUser())
			.then(() => (settingsUpdated = true))
			.catch(err => (error = err))
	}
</script>

<svelte:head>
	<title>Update user settings</title>
	<meta name="Description" content="Update user settings" />
</svelte:head>

<Page testId="settings">
	<span slot="header">User settings for [{user ? user.login : ''}]</span>
	<svelte:fragment slot="alerts">
		<Alert data-testid="successMsg" show="{settingsUpdated}" closeable="{false}"
			>Settings changed!</Alert
		>
		<Alert data-testid="errorMsg" contextualColor="danger" show="{error}" closeable="{false}"
			>An error has occurred! The user settings could not be saved.</Alert
		>
	</svelte:fragment>
	<UserSettingsForm user="{user}" on:updatesettings="{updateAccount}" />
</Page>
