import AppDispatcher from '../dispatcher/AppDispatcher';
import bankConstants from '../utils/constants';
import { ReduceStore } from 'flux/utils';

class BankBalanceStore extends ReduceStore {
  getInitialState() {
    return 0;
  }

  reduce(state, action) {
    switch(action.type) {
      case bankConstants.CREATED_ACCOUNT:
        return 0;
      case bankConstants.DEPOSITED_INTO_ACCOUNT:
        return state += Number(action.ammount);
      case bankConstants.WITHDREW_FROM_ACCOUNT:
        return state -= Number(action.ammount);
      default:
        return state;
    }
  }
}

export default new BankBalanceStore(AppDispatcher);
