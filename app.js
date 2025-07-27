let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

function afficherHistorique() {
  const histo = document.getElementById('historique');
  let total = 0;
  histo.innerHTML = '';

  transactions.forEach(t => {
    const div = document.createElement('div');
    div.className = t.type === 'revenu' ? 'income' : 'expense';
    div.textContent = `${t.categorie} : ${t.type === 'revenu' ? '+' : '-'}${t.montant} €`;
    histo.appendChild(div);

    total += t.type === 'revenu' ? t.montant : -t.montant;
  });

  document.getElementById('solde').textContent = `Solde : ${total.toFixed(2)} €`;
}

function ajouterTransaction() {
  const type = document.getElementById('type').value;
  const categorie = document.getElementById('categorie').value.trim();
  const montant = parseFloat(document.getElementById('montant').value);

  if (!categorie || isNaN(montant) || montant <= 0) {
    alert("Remplis correctement tous les champs !");
    return;
  }

  transactions.push({ type, categorie, montant });
  localStorage.setItem('transactions', JSON.stringify(transactions));
  document.getElementById('categorie').value = '';
  document.getElementById('montant').value = '';
  afficherHistorique();
}

function reinitialiser() {
  if (confirm("Tout supprimer ?")) {
    localStorage.removeItem('transactions');
    transactions = [];
    afficherHistorique();
  }
}

afficherHistorique();
