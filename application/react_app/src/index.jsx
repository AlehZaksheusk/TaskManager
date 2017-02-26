import { getAuthToken } from '../src/utils/authUtils';
import { initApplication, initLogin } from '../src/utils/initialUtils';

if (getAuthToken()) {
  initApplication();
} else {
  initLogin();
}
