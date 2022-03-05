const container = document.getElementById("container")
const gridSlide = document.getElementById("grid-slide")
const sizeValue = document.getElementById("size-value")
const color = document.querySelector(".color-picker")
const resetBtn = document.getElementById("clear")
const rainbow = document.getElementById("rainbow")
const colorMode = document.getElementById("color-mode")
let draw = false
let defaultSize = 16
let currentMode = "color"


gridSlide.onmousemove = (e) => textUpdate(e.target.value)
gridSlide.onchange = (e) => gridUpdate(e.target.value)


function newSizeGrid(newSize){
    defaultSize = newSize
}

function createGrid(size){    
    container.style.setProperty("--size", size)
    for (let i = 0; i < size * size; i++){
        const div = document.createElement("div")        
        div.classList.add("grid")        
        container.appendChild(div);
        if(currentMode === "color"){
            div.addEventListener("mouseover", function(){
                if(!draw) return
                div.style.backgroundColor = color.value
            })
            div.addEventListener("mousedown", function(){
                div.style.backgroundColor = color.value
            })
        } else if (currentMode === "rainbow"){
            let r = Math.floor(Math.random()*256)
            let g = Math.floor(Math.random()*256)
            let b = Math.floor(Math.random()*256)
            div.addEventListener("mouseover", function(){
                if(!draw) return
                div.style.backgroundColor = `rgb(${r},${g},${b})`
            })
            div.addEventListener("mousedown", function(){
                div.style.backgroundColor = `rgb(${r},${g},${b})`
            })
        }
        
              
    }    
}

resetBtn.addEventListener("click", () => reloadGrid())
rainbow.addEventListener("click", rainbowUpdate)
colorMode.addEventListener("click", function(){
    currentMode = "color"
    reloadGrid()
})

function rainbowUpdate(){    
        currentMode = "rainbow"    
        reloadGrid()
    }



function gridUpdate(value){
    newSizeGrid(value)
    textUpdate(value)
    color.value = "#212121"
    reloadGrid()
}

function reloadGrid(){
    resetGrid()
    color.value = "#212121"
    createGrid(defaultSize)
}

function textUpdate(value) {
    sizeValue.innerHTML = `${value} x ${value}`      
  }

  function resetGrid(){
      container.innerHTML = ""
  }

 window.addEventListener("mousedown", function(){
     draw = true
 })
 window.addEventListener("mouseup", function(){
    draw = false
})

createGrid(defaultSize)