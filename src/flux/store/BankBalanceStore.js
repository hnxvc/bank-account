import { EventEmitter } from 'fbemitter';
import AppDispatcher from '../dispatcher/AppDispatcher';
import bankConstants from '../utils/constants';

const CHANGE_EVENT = 'change';

let emitter = new EventEmitter();
let balance = 0;
let BankBalanceStore = {
  getState() {
    return balance;
  },

  addListener(callback) {
    return emitter.addListener(CHANGE_EVENT, callback);
  }
};


BankBalanceStore.dispatchToken = AppDispatcher.register((action) => {
  switch(action.type) {
    case bankConstants.CREATED_ACCOUNT:
      balance = 0;
      emitter.emit(CHANGE_EVENT);
      break;
    case bankConstants.DEPOSITED_INTO_ACCOUNT:
      balance += Number(action.ammount);
      emitter.emit(CHANGE_EVENT);
      break;
    case bankConstants.WITHDREW_FROM_ACCOUNT:
      balance -= Number(action.ammount);
      emitter.emit(CHANGE_EVENT);
      break;
  }
});

export default BankBalanceStore;
