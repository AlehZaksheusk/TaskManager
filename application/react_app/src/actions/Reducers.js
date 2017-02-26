import _ from 'lodash';
import { getAuthToken } from '../utils/authUtils';

const $ = require('jquery');

export function getAppState() {
  return {
    projects: this.projects,
    users: this.users,
    tasks: this.tasks,
  };
}

export function changeActiveTab(activeTab) {
  this.activeTab = activeTab;
  this.emit('change');
}

export function deleteItem(payload) {
  const { type, id } = { ...payload };
  const callback = () => {
    _.remove(this.storeData[type], { id });
    this.emit('change');
  };
  $.ajax({
    url: `${process.env.NODE_ENV}/api/${type}/${id}/`,
    type: 'DELETE',
    async: false,
    headers: {
      Authorization: getAuthToken(),
    },
    success() {
      callback();
    },
  });
}

export function updateItemSettings(payload) {
  const { type, data, id } = { ...payload };
  const callback = (responce) => {
    const index = _.indexOf(
      this.storeData[type],
      _.find(this.storeData[type], { id: responce.id }),
    );
    this.storeData[type].splice(index, 1, responce);
    this.emit('change');
  };
  $.ajax({
    url: `${process.env.NODE_ENV}/api/${type}/${payload.id}/`,
    type: 'PATCH',
    async: false,
    data,
    headers: {
      Authorization: getAuthToken(),
    },
    success(responce) {
      callback(responce);
    },
  });
}

export function createNewItem(payload) {
  const { type, data } = { ...payload };
  const callback = (responce) => {
    this.storeData[type].push(responce);
    this.emit('change');
  };
  $.ajax({
    url: `${process.env.NODE_ENV}/api/${type}/`,
    type: 'POST',
    async: false,
    data,
    headers: {
      Authorization: getAuthToken(),
    },
    success(responce) {
      callback(responce);
    },
  });
}

export function changeStoreFlag(payload) {
  const { flag, data } = { ...payload };
  this.storeData[flag].push(data);
  this.emit('change');
}

