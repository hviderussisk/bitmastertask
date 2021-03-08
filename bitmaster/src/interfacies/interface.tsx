import { FormikValues } from "formik";

export interface Taction {
    type: string,
    body: any
}

export interface TInitState {
    coords: Array<number>,
    inputSearch: string,
    noAdress: string | null,
    car: Array<any>,
    searchCarStatus: string,
    error: string | undefined
}

export interface TelCar {
    car_color: string,
    car_mark: string,
    car_model: string,
    car_number: string,
    coords_car?: Array<number>,
    distance?: string | number,
    crew_id: 1,
    driver_name: string,
    driver_phone: string
}

export interface TpropApp{
    coords?: Array<number>, 
    noAdress?: string | null, 
    car?: Array<TelCar>, 
    search?: string,
    setSearch?: () => any
    carStatus?: string,
    error?: string | undefined 
}

interface TstateMapDefault {
    center: Array<number>,
    zoom: number
}

export interface PMap {
    width: string | number
    height: string | number,
    defaultState: TstateMapDefault,
    onLoad: (ymp: any) => any,
    onClick: (e:React.MouseEvent) => any,
    instanceRef: (ref: any) => any
    modules: Array<string>
}

export interface Imarker {
    height: number,
    color: string,
    width: number,
    icon: string,
    name?: string,
    number?: string,
    phone?: string
}    

export interface ViewProps extends FormikValues { 
    search?: string,
    setSearch: (value: string) => any
}

