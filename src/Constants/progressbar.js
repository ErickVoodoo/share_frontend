import { LOADER_TYPE, LOADER_STYLE } from '../Components/Loader.jsx';

export const PROGRESSBAR_LOCAL: string = LOADER_TYPE.local;
export const PROGRESSBAR_GLOBAL: string = LOADER_TYPE.global;

export const PROGRESSBARS = ({
  getInitial: { type: LOADER_TYPE.global, name: 'getInitial' },
  getProducts: { type: LOADER_TYPE.local, name: 'getProducts' },
  getAdresses: { type: LOADER_TYPE.global, name: 'getAdresses' },
});

export {
  LOADER_STYLE,
  LOADER_TYPE,
};
