<script>
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import auth from '$lib/auth/auth-store'

	const allowedUnAuthenticatedRoutes = [
		'/login',
		'/account/register',
		'/account/activate',
		'/account/reset/init',
		'/account/reset/finish',
	]

	$: routeAccessAllowed =
		($auth && $auth.login) ||
		($page &&
			$page.url &&
			[...allowedUnAuthenticatedRoutes, '/'].includes($page.url.pathname))

	function checkIfCurrentRouteAccessNotAllowed() {
		if (
			$auth &&
			$auth.login &&
			$page &&
			$page.url &&
			allowedUnAuthenticatedRoutes.includes($page.url.pathname)
		) {
			goto('/')
		} else if (!routeAccessAllowed) {
			auth.saveRoute($page.url.pathname)
			goto('/login')
		} else {
			if (
				$auth &&
				$auth.login &&
				$page &&
				$page.url &&
				$page.url.pathname === '/'
			) {
				const savedRoute = auth.getSavedRoute()
				if (savedRoute) {
					goto(savedRoute)
				}
			}
		}
	}
	onMount(() => checkIfCurrentRouteAccessNotAllowed())
</script>

{#if routeAccessAllowed}
	<slot />
{/if}
