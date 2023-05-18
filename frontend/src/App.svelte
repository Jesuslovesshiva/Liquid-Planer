<script>
	import Nav from './Nav.svelte';
	import Eingabeformular from './Eingabeformular.svelte';
	import Gesamtbilanz from './Gesamtbilanz.svelte';
	import './global.css';

	import { onMount } from 'svelte';

	let expenses = [];
	let sumAusgabe = 0;
	let sumEinnahme = 0;
	let bilanz;

	async function fetchExpenses() {
		try {
			const response = await fetch('http://localhost:3000/expenses');
			expenses = await response.json();
			console.log(expenses)
			calculateSums();
		} catch (error) {
			console.error('Error fetching expenses:', error);
		}
	}

	function calculateSums() {
		sumAusgabe = expenses
			.filter(expense => expense.typ === 'ausgabe')
			.reduce((total, expense) => total + expense.betrag, 0);

		sumEinnahme = expenses
			.filter(expense => expense.typ === 'einnahme')
			.reduce((total, expense) => total + expense.betrag, 0);

		bilanz = sumEinnahme - sumAusgabe;
	}

	onMount(fetchExpenses);
</script>

<main>
	<Nav markenname="Liqui-Planner" />
	<Eingabeformular {fetchExpenses} />
	<Gesamtbilanz
		sumAusgabe={sumAusgabe}
		sumEinnahme={sumEinnahme}
		bilanz={bilanz}
	/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>