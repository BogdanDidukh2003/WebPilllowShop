import {appendPillow} from './main.js'
export const pillowApi = 'http://127.0.0.1:5000/pillow'

export function deletePillow(pillow){
  fetch(pillowApi + `/${pillow.id}`, {
      method: 'Delete',
      headers: {
          'Content-Type': 'application/json'
      },
      body:JSON.stringify(pillow)
  })
}

export function postPillow(pillow){
  fetch(pillowApi, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body:JSON.stringify(pillow)
  })
  .then(response=>response.json())
  .then(pillow=>appendPillow(pillow))
}
