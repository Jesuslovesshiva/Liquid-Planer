<script>
	import { Router, Link, Route } from 'svelte-routing';
	import Signup from './pages/Signup.svelte';
	import Login from './pages/Login.svelte';
	import Nav from './components/Nav.svelte';
	import Dashboard from './pages/Dashboard.svelte';
	import './global.css';
	import Notifications from 'svelte-notifications';

</script>

<main>
	<Notifications>
	<Router>
		<Nav markenname="Liqui-Planner" /> 
		<Route path="/signup" let:params component={Signup} />
		<Route path="/login" let:params component={Login} />
		<Route path="/" let:params component={Dashboard} />
	</Router>
</Notifications>
</main>

<style>
	@import 'svelte-notifications/dist/styles.css';

	main {
		text-align: center;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>