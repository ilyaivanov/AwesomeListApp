export const getParts = (url: string) => {
  const parts = url.split('/');
  return parts.slice(parts.length - 2);
}

export const toMd = (url: string) => {
  const [username, reponame] = getParts(url);
  return `https://api.github.com/repos/${username}/${reponame}/readme`;
};

export const createFilePath = (base: string, url: string, extension: string) =>
  base + getParts(url).join('_') + '.' + extension;