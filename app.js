function getTransactions(compte) {
  return JSON.parse(localStorage.getItem(`transactions_${compte}`) || '[]');
}

function setTransactions(compte, data) {
  localStorage.setItem(`transactions_${compte}`, JSON.stringify(data));
}

function afficherHistorique() {
  const compte = document.getElementById('compte').value;
  const histo = document.getElementById('historique');
  let transactions = getTransactions(compte);
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
  const compte = document.getElementById('compte').value;
  const type = document.getElementById('type').value;
  const categorie = document.getElementById('categorie').value.trim();
  const montant = parseFloat(document.getElementById('montant').value);

  if (!categorie || isNaN(montant) || montant <= 0) {
    alert("Remplis correctement tous les champs !");
    return;
  }

  let transactions = getTransactions(compte);
  transactions.push({ type, categorie, montant });
  setTransactions(compte, transactions);

  document.getElementById('categorie').value = '';
  document.getElementById('montant').value = '';
  afficherHistorique();
}

function reinitialiser() {
  const compte = document.getElementById('compte').value;
  if (confirm(`Tout supprimer pour le compte "${compte}" ?`)) {
    localStorage.removeItem(`transactions_${compte}`);
    afficherHistorique();
  }
}

document.getElementById('compte').addEventListener('change', afficherHistorique);

afficherHistorique();
