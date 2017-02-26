/* eslint-disable */
import React from 'react';
import actions from '../actions/Actions'
import Fluxxor from 'fluxxor';
import Login from '../containers/Login';
import Main from '../containers/Main';
import ReactDOM from 'react-dom';
import { getAuthToken } from './authUtils';
import MainStore from '../stores/MainStore';
import Getter from '../utils/Getter';
import {
  CHANGE_ACTIVE_TAB,
  DELETE_ITEM,
  UPDATE_ITEM_SETTINGS,
  CREATE_NEW_ITEM,
  CHANGE_STORE_FLAG,
} from '../constants/actionsConstants';

export function initApplication() {

    const successGetInitial = (responce) => {
      const stores = {
        main: new MainStore({
          projects: responce.projects || [],
          users: responce.users || [],
          tasks: responce.tasks || [],
          responce: responce.user,
          activeTab: 'user',
        }),
      };
      const flux = new Fluxxor.Flux(stores, actions);
      const getter = new Getter({ store: flux.store('main') });

      ReactDOM.render(
        <Main
          flux={flux}
          getter={getter}
          isManager={responce.user.is_manager}
          user={responce.user}
        />,
        document.getElementById('root'),
      );
    };

    $.ajax({
      url: `${process.env.NODE_ENV}/api/get-app-data/`,
      type: 'GET',
      async: true,
      headers: {
        Authorization: getAuthToken(),
      },
      success(data) {
        successGetInitial(data);
      },
    });
}

export function initLogin() {
  ReactDOM.render(
    <Login />,
    document.getElementById('root'),
  );
}

export default function initialStore(payload) {
  this.storeData = payload;
  this.bindActions(CHANGE_ACTIVE_TAB, this.changeActiveTab);
  this.bindActions(DELETE_ITEM, this.deleteItem);
  this.bindActions(UPDATE_ITEM_SETTINGS, this.updateItemSettings);
  this.bindActions(CREATE_NEW_ITEM, this.createNewItem);
  this.bindActions(CHANGE_STORE_FLAG, this.changeStoreFlag);
}