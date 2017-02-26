import _ from 'lodash';

export default class Getter {

  constructor(options) {
    this.store = options.store;
  }

  getProjects() {
    return this.store.storeData.projects;
  }

  getTasks() {
    return this.store.storeData.tasks;
  }

  getUsers() {
    return this.store.storeData.users;
  }

  getUser() {
    return this.store.storeData.user;
  }

  getUserById(id) {
    return _.find(this.store.storeData.users, { id });
  }

  getProjectById(id) {
    return _.find(this.store.storeData.projects, { id });
  }

  getActiveTab() {
    return this.store.activeTab;
  }
}

