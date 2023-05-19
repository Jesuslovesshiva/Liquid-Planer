<script>
	import { Router, Route } from 'svelte-routing';
	import Signup from './pages/Signup.svelte';
	import Login from './pages/Login.svelte';
	import Nav from './components/Nav.svelte';
	import Dashboard from './pages/Dashboard.svelte';
	import './global.css';
	import Notifications from 'svelte-notifications';
	import { onMount } from 'svelte';
	import { navigate } from 'svelte-routing';
	import axios from 'axios';

	onMount(() => {
        // Request user info from the server
        axios.get('http://localhost:3000/auth/user', {
            withCredentials: true
        })
        .then(response => {
            // User is authenticated, redirect to "/"
            navigate('/');
			console.log(response.data)
        })
        .catch(error => {
            // User is not authenticated, redirect to login
            navigate('/login');
        });
    });
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
