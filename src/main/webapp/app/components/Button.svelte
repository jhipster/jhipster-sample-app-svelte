<script>
	export let disabled = false
	export let role = 'primary'
	export let classes = ''
</script>

<button
	on:click|preventDefault
	class="my-4 focus:outline-none focus:ring m-auto btn {classes}"
	class:btn-primary="{role === 'primary'}"
	class:btn-secondary="{role === 'secondary'}"
	class:btn-danger="{role === 'danger'}"
	class:btn-action="{role === 'action'}"
	disabled="{disabled}"
	{...$$restProps}
>
	<slot />
</button>
