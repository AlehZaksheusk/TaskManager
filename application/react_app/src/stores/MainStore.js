import Fluxxor from 'fluxxor';
import initialStore from '../utils/initialUtils';
import * as reducers from '../actions/Reducers';


export default Fluxxor.createStore({

  initialize(payload) {
    initialStore.bind(this, payload)();
  },

  changeActiveTab(activeTab) {
    reducers.changeActiveTab.bind(this, activeTab)();
  },

  deleteItem(payload) {
    reducers.deleteItem.bind(this, payload)();
  },

  createNewItem(payload) {
    reducers.createNewItem.bind(this, payload)();
  },

  updateItemSettings(payload) {
    reducers.updateItemSettings.bind(this, payload)();
  },

  changeStoreFlag(payload) {
    reducers.changeStoreFlag.bind(this, payload)();
  },

  getAppState() {
    return reducers.getAppState.bind(this)();
  },

});
