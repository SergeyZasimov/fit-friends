export const capitalizeWord = (word: string): string => {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
};
