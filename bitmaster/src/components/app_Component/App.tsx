import React, { useEffect, useRef, useState } from 'react'
import './App.sass'
import { YMaps, Map } from 'react-yandex-maps'
import { FormTaxi } from '../formTaxi_COmponent/form'
import { useDispatch } from 'react-redux'
import { point } from '../../assets/Placemark/marker'
import { Loader } from '../../assets/loader/loader'
import CarLi from '../elemCar_Component/carLi'
import { TelCar, PMap } from '../../interfacies/interface'
import { apikey } from '../../assets/variables'

const App : React.FC = (props: any) => {

    let { coords, noAdress, car, search, setSearch, carStatus, error } = props,
        [ ymaps, setYmp ] = useState<any>(),
        [ m, setMap ] = useState<any>(),
        dispatch = useDispatch(),
        button = useRef<any>(null)


    // этого лушче тут не делать конечно, но не хотелось ссылаться на ymaps из редюссера
    let   elCar = car.map( (el: TelCar) => {
              const d = ymaps.coordSystem.geo.getDistance(coords, el.coords_car).toFixed()
              el.distance = d
              return el
          })    
          elCar = elCar.sort( (a: any , b: any) =>  a.distance > b.distance ? 1 : -1 ) 
          elCar = carStatus ? <Loader/> : elCar.map( (el: any) => {
          return <CarLi {...el} /> 
        })

    const setPoint = (event: any) => dispatch({type: 'CLICK_SEARCH_ADRESS', data: event.get('coords')}),
          submit = (subForm: any) => button.current && button.current.addEventListener('click', subForm)

    
    const propForm  = { search, submit, setSearch, noAdress } 

    useEffect(() => ymaps && m.geoObjects.removeAll() && dispatch({ type:'SEARCH_CAR'}) && point(m, ymaps, 'i', coords), [ coords ])
    useEffect(() => button && button.current ? () => button.current.removeEventListener( 'click', submit ) : undefined)
    useEffect(() => car.forEach( (el: any) => point(m, ymaps, 'car', el.coords_car)) , [car])
    
    const propMap : PMap = {
      width: '100%',
      height: 300,
      defaultState: { 
        center: [ 55.75, 37.57 ], 
        zoom: 9 
      },
      onLoad: ymp  => setYmp(ymp),
      onClick: e => setPoint(e), 
      instanceRef: ref => setMap(ref),
      modules: [
        'geocode', 
        'GeoObject',
        'Placemark',
        'GeoObjectCollection',
        'templateLayoutFactory', 
        'layout.ImageWithContent',
        'formatter',
        'coordSystem.geo'
      ]
    }

    return  <div className='App'>
              <div className='form'>
                  <FormTaxi {...propForm}/>
              </div>
              <div className='bodyApp'>
                  <YMaps query={{apikey}} >
                    <div className='map'>
                      <Map {...propMap}></Map>
                    </div>
                  </YMaps>
                  <div className='listCar'>{elCar}</div>
              </div>
              <div className='submit'>
                  <button ref={button} disabled={noAdress || error} >Заказать</button>
              </div> 
            </div>
}

export default App