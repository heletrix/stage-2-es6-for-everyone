import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)
  if (!fighter) {
    return fighterElement;
  }
  
  const fighterWrapper = createElement({ tagName: 'div' });

  // image
  const imgElement = createFighterImage(fighter);
  fighterWrapper.append(imgElement);

  // info
  const fighterInfo = createElement({ tagName: 'div', className: 'arena___fighter-name'});
  const paragraphs = [
    createParagraph(`name: ${fighter.name}`),
    createParagraph(`health: ${fighter.health}`),
    createParagraph(`attack: ${fighter.attack}`),
    createParagraph(`defense: ${fighter.defense}`)
  ];
  paragraphs.forEach(paragraph => fighterInfo.append(paragraph)); 
  fighterWrapper.append(fighterInfo);

  fighterElement.append(fighterWrapper);

  return fighterElement;
}

function createParagraph(text) {
  const paragraphElement = createElement({ tagName: 'p' });
  paragraphElement.innerText = text;
  return paragraphElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
