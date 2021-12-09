import { firebaseDatabase } from './firebase';

class aptService {
  syncApt(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`${userId}/apt`);
    ref.on('value', snapshot => {
      const value = snapshot.val();
      value && onUpdate(value);
    })
    return () => ref.off();
  }

  saveApt(userId, apt){
    firebaseDatabase.ref(`${userId}/apt/`).set(apt);
  }

  removeCard(userId, apt){
    firebaseDatabase.ref(`${userId}/apt/`).remove();
  }
}


export default aptService;