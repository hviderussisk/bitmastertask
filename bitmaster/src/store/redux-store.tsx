import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { wGeocode } from './sagas'
import logger from 'redux-logger'
import mainReducer from './main-reducer'

const reducers = combineReducers({ 
    mainPage: mainReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore( reducers , applyMiddleware(sagaMiddleware, logger) )
sagaMiddleware.run(wGeocode)
export default store