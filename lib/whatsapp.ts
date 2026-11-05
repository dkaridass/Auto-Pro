export function openWhatsApp(vehicle: string) {
  const message = encodeURIComponent(
    `Bonjour Auto Pro DRC. Je souhaite obtenir des informations et la disponibilité pour : ${vehicle}. Pouvez-vous me recontacter ?`
  );
  window.open(`https://wa.me/243992099990?text=${message}`, '_blank');
}
