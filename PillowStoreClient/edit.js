console.log(document.URL);
let id = document.URL.split('=')[1]
let pillow
let editFormElement = document.forms['editForm']


function fetchPillow(object){
  pillow = object
  createDom(pillow)
}

fetch(`http://127.0.0.1:5000/pillow/${id}`)
  .then((response) => response.json())
  .then(object => fetchPillow(object))

function createDom(pillow){
 editFormElement.innerHTML = `
  <form name="editForm" action="" method="PUT">
  <div class="form-group">
  <label> Title </label>
    <input type="text" name="title" value="${pillow.title}">
  </div>
  <div class="form-group">
  <label> Price </label>
    <input type="number" name="price" value="${pillow.price}">
    </div>

    <div class="form-group">
    <label> Description </label>

    <input type="text" name="description" value="${pillow.description}">
    </div>

    <div class="form-group">
    <label> Width </label>
    <input type="number" name="width" value="${pillow.width}">
    </div>

    <div class="form-group">
    <label> Height </label>
    <input type="number" name="height" value="${pillow.height}">
    </div>

    <button type ="submit"> Update </button>
  </form>
  `
}
editFormElement.addEventListener('submit',(event) =>{
  event.preventDefault()
  pillow = Object.fromEntries(new FormData(editForm).entries())
  pillow.id = id
  updatePillow(pillow)
  .then(_=>alert('updated'))

})

function updatePillow(pillow){
   return fetch(`http://127.0.0.1:5000/pillow/${pillow.id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body:JSON.stringify(pillow)
  })
}
