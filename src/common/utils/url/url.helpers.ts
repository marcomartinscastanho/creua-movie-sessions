export const buildUrl = (url: string, obj: { [key: string]: any } = {}, objName: string = ''): string => {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      url = buildUrl(url, obj[key], key);
    }
    else {
      if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
        let key2 = key;

        if (objName !== '') {
          key2 = objName + '.' + key;
        }

        const param = `${key2}=${obj[key]}`;

        url += (url.includes('?') ? '&' : '?') + param;
      }
    }
  }

  return url;
};
