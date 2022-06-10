import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  const pressedKeys = [];
  const firstFighterProgress = {
    ...firstFighter,
    healthLeft: firstFighter.health,
    criticalHitAvailable: true
  }
  const secondFighterProgress = {
    ...secondFighter,
    healthLeft: secondFighter.health,
    criticalHitAvailable: true
  }

  const handleKeyDown = (event) => {
    pressedKeys[event.code] = true;
  };
 
  const handleKeyUp = (event, resolve) => {
    updateHealthLeft({
      keys: pressedKeys,
      key: event.code,
      firstFighter: firstFighterProgress,
      secondFighter: secondFighterProgress
    });
    
    pressedKeys[event.code] = false;
    setHealthBar(firstFighterProgress, 'left');
    setHealthBar(secondFighterProgress, 'right');

    const winner = getWinner(firstFighterProgress, secondFighterProgress);
    if (winner) {
      resolve(winner);
    }
  }

  window.addEventListener('keydown', handleKeyDown, false);
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    window.addEventListener('keyup', (event) => handleKeyUp(event, resolve), false);
  });
}

export function getDamage(attacker, defender) {
  // return damage
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
  // return hit power
  const criticalHitChance = 1 + Math.random();
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  // return block power
  const dodgeChance = 1 + Math.random();
  return fighter.defense * dodgeChance;
}

function setHealthBar(secondFighter, position) {
  const width = secondFighter.healthLeft * 100 / secondFighter.health;
  document.getElementById(`${position}-fighter-indicator`).style.width = `${width > 0 ? width : 0}%`;
}

function updateHealthLeft({ keys, key, firstFighter, secondFighter }) {
  // don't allow to attak & defense
  if (key === controls.PlayerOneAttack && keys[controls.PlayerOneBlock]) { return; }
  if (key === controls.PlayerTwoAttack && keys[controls.PlayerTwoBlock]) { return; }

  // first attacks  
  if (key === controls.PlayerOneAttack) {
    const damage = keys[controls.PlayerTwoBlock] ? getDamage(secondFighter, firstFighter) : getHitPower(secondFighter);
    secondFighter.healthLeft -= damage;
    return;
  }

  // second attacks
  if (key == controls.PlayerTwoAttack) {
    const damage = keys[controls.PlayerOneBlock] ? getDamage(firstFighter, secondFighter) : getHitPower(firstFighter);
    firstFighter.healthLeft -= damage;
    return;
  }

  return;
}

function getWinner(firstFighter, secondFighter) {
  if (firstFighter.healthLeft < 0 && secondFighter.healthLeft < 0) {
    return 'No Winner';
  }

  if (firstFighter.healthLeft < 0 ) {
    return secondFighter
  }

  if (secondFighter.healthLeft < 0) {
    return secondFighter;
  }

  return;
}