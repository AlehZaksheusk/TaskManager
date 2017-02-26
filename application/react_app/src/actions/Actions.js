import {
  CHANGE_ACTIVE_TAB,
  DELETE_ITEM,
  UPDATE_ITEM_SETTINGS,
  CREATE_NEW_ITEM,
  CHANGE_STORE_FLAG,
} from '../constants/actionsConstants';

export default {

  basic: {

    changeActiveTab(activeTab) {
      this.dispatch(CHANGE_ACTIVE_TAB, activeTab);
    },

    deleteItem(payload) {
      this.dispatch(DELETE_ITEM, payload);
    },

    createNewItem(payload) {
      this.dispatch(CREATE_NEW_ITEM, payload);
    },

    updateItemSettings(payload) {
      this.dispatch(UPDATE_ITEM_SETTINGS, payload);
    },

    changeStoreFlag(payload) {
      this.dispatch(CHANGE_STORE_FLAG, payload);
    },

  },
};
