<script>
    export let sumEinnahme;
    export let sumAusgabe;
    export let bilanz;
</script>
  
<aside id="gesamtbilanz">
    <h1>Gesamtbilanz</h1>
    <div class="gesamtbilanz-zeile einnahmen">
      <span>Einnahmen:</span>
      <span>{(sumEinnahme / 100).toFixed(2).replace(/\./, ',')} €</span>
    </div>
    <div class="gesamtbilanz-zeile ausgaben">
      <span>Ausgaben:</span>
      <span>{(sumAusgabe / 100).toFixed(2).replace(/\./, ',')} €</span>
    </div>
    <div class="gesamtbilanz-zeile bilanz">
      <span>Bilanz:</span>
      <span class={bilanz >= 0 ? 'positiv' : 'negativ'}>{(bilanz / 100).toFixed(2).replace(/\./, ',')} €</span>
    </div>
</aside>
  
<style>
</style>
  