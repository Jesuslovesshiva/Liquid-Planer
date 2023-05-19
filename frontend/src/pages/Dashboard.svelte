<script>
    import Gesamtbilanz from "../components/Gesamtbilanz.svelte";
    import Eingabeformular from "../components/Eingabeformular.svelte";

    import { onMount } from 'svelte';

	let expenses = [];
	let sumAusgabe = 0;
	let sumEinnahme = 0;
	let bilanz;

	async function fetchExpenses() {
		try {
			const response = await fetch('http://localhost:3000/expenses', {
			credentials: 'include', // Include credentials in the request
			});
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

<style>
    .dashboard {
        display: flex;
        justify-content: center;
    }
</style>

<div class="dashboard">
    <div class="dashboard-inner">
        <Eingabeformular {fetchExpenses} />
        <Gesamtbilanz
            sumAusgabe={sumAusgabe}
            sumEinnahme={sumEinnahme}
            bilanz={bilanz}
        />
    </div>
</div>