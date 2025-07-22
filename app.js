let total = parseFloat(localStorage.getItem('total')) || 0;
document.getElementById('total').textContent = `Total: ${total} €`;

function ajouter() {
  const montant = parseFloat(document.getElementById('montant').value);
  if (!isNaN(montant)) {
    total += montant;
    localStorage.setItem('total', total);
    document.getElementById('total').textContent = `Total: ${total} €`;
    document.getElementById('montant').value = '';
  }
}

// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
