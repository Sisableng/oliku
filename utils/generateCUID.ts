import { init } from '@paralleldrive/cuid2';

export const generateCUID = () => {
  const createId = init({
    // A custom random function with the same API as Math.random.
    // You can use this to pass a cryptographically secure random function.
    random: Math.random,
    // the length of the id
    length: 19,
    // A custom fingerprint for the host environment. This is used to help
    // prevent collisions when generating ids in a distributed system.
    fingerprint: 'a-custom-host-fingerprint',
  });

  const randomPart = createId();
  return 'clt9wl' + randomPart;
};
