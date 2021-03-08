import { kDistance } from './variables'

export function rendCar(coords: Array<number>){
      const porm: any = [
            {
                c: () => [ coords[0] - kDistance * Math.random(), coords[1] - kDistance * Math.random() ]
            },
            {
                c: () => [ coords[0] + kDistance * Math.random(), coords[1] + kDistance * Math.random() ]
            }
          ]
      let rObj = Math.floor( Math.random() * porm.length )
      return porm[rObj].c()
}