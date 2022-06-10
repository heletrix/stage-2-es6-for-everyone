import { showModal } from './modal';

export function showWinnerModal(fighter) {
  // call showModal function 
  showModal({
    title: "The fight is over",
    bodyElement: fighter === 'No Winner' ? "friendship won the fight!" : `${fighter.name} won the fight`,
    onClose: () => location.reload()
  })
}
