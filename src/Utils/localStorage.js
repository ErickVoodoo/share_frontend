// @flow

type ISet = {
  key: string,
  value: string,
};

export const setItem = ({ key, value = ''}: ISet): void => {
  if (window.localStorage) {
    localStorage.setItem(key,
      typeof value === 'object' && value ? JSON.stringify(value) : value,
    );
  }
};

export const clearStorage = (): void => {
  localStorage.clear();
};
