import { initServer } from './initServer';

const init = async () => {
  await initServer('0.0.0.0', 3101);
};
init();
