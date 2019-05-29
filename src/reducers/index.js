import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import InventoryReducer from './InventoryReducer'

export default combineReducers({
  auth: AuthReducer,
  inventory: InventoryReducer,
});