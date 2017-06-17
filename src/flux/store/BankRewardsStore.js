import AppDispatcher from '../dispatcher/AppDispatcher';
import BankBalanceStore from './BankBalanceStore';
import { ReduceStore } from 'flux/utils';
import constants from '../utils/constants';

class BankRewardsStore extends ReduceStore {
  getInitialState() {
    return 'Basic';
  }

  reduce(state, action) {
    this.getDispatcher().waitFor([
      BankBalanceStore.getDispatchToken()
    ]);

    if(action.type === constants.DEPOSITED_INTO_ACCOUNT || action.type === constants.WITHDREW_FROM_ACCOUNT) {
      let balance = BankBalanceStore.getState();
      if(balance < 5000) {
        return 'Basic';
      } else if (balance < 10000) {
        return 'Silver';
      } else if (balance < 50000){
        return 'Gold';
      } else {
        return 'Platinum';
      }
    }

    return state;
  }
}

export default new BankRewardsStore(AppDispatcher);
