import { createStore } from 'redux'
import toggleCardSet from './Reducers/cardSearchFilterReducer'
import toggleCard from './Reducers/cardListReducer'
import collection from './Reducers/cardCollectionReducer'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
  storage: storage
}

export default createStore(persistCombineReducers(rootPersistConfig, {collection, toggleCard}))