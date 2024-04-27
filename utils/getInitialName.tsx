export const getInitialName = (fullName: string): string => {
  const words = fullName.split(' ');

  // If only one word, return its initial
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  // If more than one word
  let initials = words[0][0]; // Take the first letter of the first word
  initials += words[words.length - 1][0];

  // If there is a middle name, take the first letter of the middle name
  if (words.length > 2) {
    initials = words
      .slice(0, 1)
      .concat(words.slice(-1))
      .map((word) => word[0])
      .join(''); // Second word is the middle name
  }

  // Take the first letter of the last word

  return initials.toUpperCase();
};
