const { createElement } = require("react")

// import "./style.css"
const imageSources = [
    "/image1.jpg", "/image11.jpg", "/image2.jpg",
    "/image7.jpg", "/image4.jpg", "/image3.jpg",
    "/image5.jpg", "/image8.jpg", "/image9.jpg",
    "/image4.jpg", "/image11.jpg", "/image10.jpg",
    "/image9.jpg", "/image1.jpg", "/image3.jpg",
    "/image7.jpg", "/image2.jpg", "/image6.jpg",
]

const column_base = [7, 44, 74]
const column_gap = 540
const COL_STAGGER = [20, 160, 80]


const imagedata = imageSources.map((src, i) => {
    const colindex = i % 3
    const clusterIndex = Math.floor(i / 3)

    const jitterX = ((i * 17) % 12) - 6
    const jitterY = (i * 37) % 90
    const sizeVariation = (i * 53) % 110
    const speedVariation = ((i * 13) % 21) / 100
    return {
        src,
        leftplace: column_base[colindex] + jitterX,
        relativetop: 60 + clusterIndex + column_gap + COL_STAGGER[colindex] + jitterY,
        width: 180 + sizeVariation,
        speed: 0.9 + speedVariation
    }
})

const gallery = document.getElementById("gallery")
const imgElements = []
if (gallery) {
    imagedata.forEach((data, i) => {
        const img = createElement('img')
        img.src = data.src
        img.alt = "image....."
        img.className = 'gallery-item'
        gallery.appendChild(img)
        imgElements.push({
            element: img,
            leftpotion: data.leftplace,
            relativetop: data.relativetop,
            speed: data.speed
        })
    })
}

const scroll = document.getElementById('scrollSpacer')
if (scroll && ImageData.length > 0) {
    const maxRelativetop = Math.max(...imagedata.map(d => d.relativetop))
    scroll.style.height = `${maxRelativetop + window.innerHeight + 800}px`
}

let targetscroll = window.scrollY
let currentscroll = window.scrollY
const ease = 0.09
window.addEventListener('scroll',()=>{
    targetscroll = window.scrollY
},{passive:true} )

function animate(){
    currentscroll += (targetscroll -  currentscroll) + ease 
}



const eyeContainer = document.getElementById("eye")
const pupil = document.getElementById("pupil")
console.log("helloooooooo")

if (eyeContainer && pupil) {
    window.addEventListener("mousemove", (e) => {
        const containerDetail = eyeContainer.getBoundingClientRect();

        const eyeX = containerDetail.left + containerDetail.width / 2
        const eyeY = containerDetail.top + containerDetail.height / 2
        const deltaX = e.clientX - eyeX;
        const deltaY = e.clientY - eyeY;

        const distance = Math.hypot(deltaX, deltaY)

        const maxmove = 3;
        const moveX = distance > 0 ? (deltaX / distance) * Math.min(distance * 0.05, 15) : 0
        const moveY = distance > 0 ? (deltaY / distance) * Math.min(distance * 0.05, maxmove) : 0

        pupil.style.transform = `translate(${moveX}px,${moveY}px)`
    })
}