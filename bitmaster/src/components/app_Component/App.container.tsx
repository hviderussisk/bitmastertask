import { connect } from 'react-redux'
import { setCoords, setSearch, setSearchWithClick } from '../../store/main-reducer'
import App from './App'
import { TInitState } from '../../interfacies/interface'

const mapStateToProps = (state: any) => {
  const s: TInitState = state.mainPage
  return {
    search: s.inputSearch,
    coords: s.coords,
    noAdress: s.noAdress,
    error: s.error,
    car: s.car,
    carStatus: s.searchCarStatus
  }
}

const appContainer = connect(mapStateToProps, { setCoords, setSearch, setSearchWithClick })(App)
export default appContainer