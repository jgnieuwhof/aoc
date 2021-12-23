export const isUppercase = (str: string): boolean => {
  return str !== str.toLowerCase() && str === str.toUpperCase();
};

export const notEmpty = (str: string | null | undefined): str is string => {
  return str !== null && str !== undefined && !!str.trim().length;
};

export const lines = (str: string): string[] => {
  return str.split("\n")
    .map((s) => s.trim())
    .filter(notEmpty);
};
