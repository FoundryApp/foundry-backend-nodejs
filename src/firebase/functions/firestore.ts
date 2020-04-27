import * as runtime from '../runtime';



function add(name: string) {
  return runtime.registerFirestore(name);
}

function firestore(name: string) {
  // return new AuthFunction(name);
}

firestore.add = add;
export default firestore;