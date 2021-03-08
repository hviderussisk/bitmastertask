import { takeEvery, call, put, select } from 'redux-saga/effects'
import { rendCar } from '../assets/renderCar'
import { noAdress, setCar, setCoords, setSearchWithClick, setStatusSearchCar } from './main-reducer'
import { messageIfNoAdress } from '../assets/variables'
import { TelCar } from '../interfacies/interface'

let timeoutId : any

function delay(ms: number) {
    return new Promise( resolve => {
        timeoutId =  setTimeout(resolve, ms)
    })
}

async function fGeocode(o: any){
    clearTimeout(timeoutId)
    await delay(o.del)
    return await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=505379b1-6f2a-446f-af46-102586018d6a&geocode=${o.search}`).then( res=> res.json() )
}

function* workGeocode(): any{
    const   search = yield select( state => state.mainPage.inputSearch ),
            obj = { search, del: 1000 }
    try {
        const   res = yield call(fGeocode, obj ),
                coords = res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos,
                arrCoords = coords.split(/ /g).map((el:string) => Number(el))
        yield put( setCoords(arrCoords.reverse()) )
    } catch (error) {
        yield put( noAdress('Адрес не существует') )
    }
    
}
function* workGeocodeWithClick(a: any): any{
    yield put( setCoords(a.data))
    const   coords = yield select( state => state.mainPage.coords ),
            search = `${coords[1]},${coords[0]}`,
            obj = { search, del: 0 }
    try {
        const   res = yield call(fGeocode, obj ),
                search = res.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text
        yield put( setSearchWithClick(search) )
    } catch (error) {
        yield put( noAdress(messageIfNoAdress) )
    }
    
}

async function fCar(){
    await delay(1500)
    let url: string = `/taxi/crews_info`
    return await fetch(url).then( res => res.json() )
}

function* workCar(): any{
    yield put( setStatusSearchCar(true) )
    const   res: Array<TelCar> = yield call(fCar),
            coords : Array<number> = yield select( state => state.mainPage.coords ),
            changeCoordsCar: Array<TelCar> = yield res.map( (el:any) => { 
                el.coords_car = rendCar(coords)
                return el
            })
    yield put( setStatusSearchCar(false) )
    yield put( setCar(changeCoordsCar) ) 
}


async function fPostOrder(o: any){
    let date: string = new Date().toLocaleString()
        date = date.replace(/^(\d{2}).(\d{2}).(\d{4})/, '$3$2$1').replace(/,/g, '').replace(/\s/g, '').replace( /:/g, '')
    const obj = {
            "source_time": date,
            "addresses":
                    [
                        {
                        "address":o.search,
                        "lat": o.lat,
                        "lon": o.lon
                        }
                    ]
            }   
    alert(JSON.stringify(obj, null, 2))
    // let url = `здесь был бы ендпоинт на отправку заказа`
    // return await fetch(url).then( res => res.json() )
}

function* workPostOrder(a: any): any{
    const   search: string = yield select( state => state.mainPage.inputSearch ),
            coords: Array<number> = yield select( state => state.mainPage.coords ),
            obj = { search, lat: coords[0], lon: coords[1]  }
    yield call(fPostOrder, obj )
}

export function* wGeocode(){
    yield takeEvery( 'SEARCH_CAR', workCar )
    yield takeEvery( 'GEO_CODE', workGeocode )
    yield takeEvery( 'CLICK_SEARCH_ADRESS', workGeocodeWithClick )
    yield takeEvery( 'form/POST_ORDER', workPostOrder )
}