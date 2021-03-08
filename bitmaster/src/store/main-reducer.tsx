import { Taction, TelCar, TInitState } from "../interfacies/interface"

const   SET_COORDS: string  = 'main/SET_COORDS',
        SET_SEARCH: string = 'form/SET_SEARCH',
        SET_SEARCH_WITH_CLICK: string = 'main/SET_SEARCH_WITH_CLICK',
        NO_ADRESS: string = 'form/NO_ADRESS',
        SET_CAR: string = 'main/SET_CAR',
        SEARCH_CAR_STATUS: string = 'main/SEARCH_CAR_STATUS',
        SET_ERROR: string = 'form/SET_ERROR',
        POST_ORDER: string = 'form/POST_ORDER'





const initS: TInitState = {
    coords: [],
    inputSearch: '',
    noAdress: null,
    car: [],
    searchCarStatus: '',
    error: ''
}

export default function mainReducer ( s = initS , a: any ): any {
    switch(a.type){
        case SET_COORDS: 
            return { ...s, coords: a.body, car: [], noAdress: null }
        case SET_SEARCH: 
            return { ...s, inputSearch: a.body }
        case SET_SEARCH_WITH_CLICK: 
            return { ...s, inputSearch: a.body }
        case NO_ADRESS: 
            return { ...s, noAdress: a.body, car: [] }
        case SEARCH_CAR_STATUS: 
            return { ...s, searchCarStatus: a.body }
        case SET_CAR: 
            return { ...s, car: a.body }
        case SET_ERROR: 
            return { ...s, error: a.body }
        default:
            return s
    }
}

export const setCoords = ( body: Array<number> ): Taction =>  { return  { type: SET_COORDS , body } }
export const setSearchWithClick = ( body: string ): Taction =>  { return  { type: SET_SEARCH_WITH_CLICK , body } }
export const setSearch = ( body: string ): Taction =>  { return  { type: SET_SEARCH , body } }
export const noAdress = ( body: string ): Taction =>  { return  { type: NO_ADRESS , body } }
export const setCar = ( body: Array<TelCar> ): Taction =>  { return  { type: SET_CAR , body } }
export const setStatusSearchCar = (body: boolean ): Taction =>  { return  { type: SEARCH_CAR_STATUS , body } }
export const setError = ( body: string | undefined ): Taction =>  { return  { type: SET_ERROR , body } }


export const postOrder = ( body: any ): any =>  { return  { type: POST_ORDER , body } }