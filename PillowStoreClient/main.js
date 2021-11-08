import {postPillow,deletePillow,pillowApi} from './dbconnect.js'

class Pillow {
    constructor(title) {

        if (typeof title === 'object') {
            Object.assign(this, title)
        }
        else {
            this.title = title;
            this.description = description;
            this.price = price
            this.id = id
            this.width = width
            this.height = height
        }
    }

}

var pillows = []



fetch(`${pillowApi}`)
  .then(response => response.json())
  .then(pillows => pillows.forEach(appendPillow))

let pillowsElement = document.getElementById('pillows')
let buttonSummaryElement = document.getElementById('summaryButton')
let buttonSortElement = document.getElementById('sortBySquare')
let summaryPriceElement = document.getElementById('summary')
let formPillowElement = document.forms['pillow']
let searchInputElement = document.getElementById('searchInput')
let current_pillows = []


searchInputElement.addEventListener('input',(event)=>{
  event.preventDefault()
  let title = event.target.value
  updateDOM(pillows.filter((pillow) => new RegExp(title).test(pillow.title)))
})
function compareSquare(a,b){return a.width * a.height - b.widht * b.height}

buttonSortElement.addEventListener('click',()=>{
  updateDOM(current_pillows.sort((a,b) => a.height*a.width - b.height*b.width))
})

buttonSummaryElement.addEventListener('click',(event)=>{
  let mount_price = current_pillows.reduce((sum, pillow) => sum + pillow.price,0);
  summaryPriceElement.innerText = mount_price;
})


formPillowElement.addEventListener('submit',(event)=>{
  event.preventDefault()
  let pillow = new Pillow(Object.fromEntries(new FormData(formPillowElement).entries()))
  postPillow(pillow)

})

export function appendPillow(pillow){
  pillows.push(pillow)
  updateDOM(pillows)
  current_pillows = pillows
}


pillowsElement.addEventListener('click',(event)=>{
  let target = event.target
  if (target.className === 'delete'){
    let pillow_id = parseInt(target.closest('.pillow-card').id.split('-')[1])
    let pillow = pillows.find((pillow) => pillow.id === pillow_id)
    deletePillow(pillow)
    pillows = pillows.filter((pillow) => pillow.id !== pillow_id)
    updateDOM(pillows)

  }
})


function updateDOM(pillows){
  current_pillows = pillows
  pillowsElement.innerHTML = ''
  pillows.forEach((pillow) => {
    pillowsElement.innerHTML += `<div class="pillow-card" id=pillow-${pillow.id}>
                      <button class="edit" onclick="location.href='./edit.html?get=${pillow.id}'">Edit</button>
                      <h3>${pillow.title}</h3>
                      <p class="price">Price = ${pillow.price}</p>
                      <p>${pillow.description}</p>
                      <ul>
                        <p>width ${pillow.width}</p>
                        <p>height ${pillow.height}</p>
                      </ul>
                      <button class="delete">Delete</button>
    </div>`
  });
}
pillows.forEach((item) => {
  console.log(item)
});
