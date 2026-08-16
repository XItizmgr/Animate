
// import "./style.css"
const imageSources = [
    "/image1.jpg", "/image11.jpg", "/image2.jpg",
    "/image5.jpg", "/image8.jpg", "/image9.jpg",
    "/image15.jpg", "/image8.jpg", "/image9.jpg",
    "/image14.jpg", "/image15.jpg", "/image10.jpg",
    "/image7.jpg", "/image4.jpg", "/image3.jpg",
    "/image12.jpg", "/image4.jpg", "/image3.jpg",
    "/image17.jpg", "/image10.jpg", "/image3.jpg",
    "/image12.jpg", "/image16.jpg", "/image13.jpg",
    "/image8.jpg", "/image4.jpg", "/image2.jpg",
    "/image16.jpg", "/image14.jpg", "/image7.jpg",

]

const column_base = [12, 38, 64]
const column_gap = 600
const COL_STAGGER = [0, 220, 110];

const imagedata = imageSources.map((src, i) => {
    const colindex = i % 3
    const clusterIndex = Math.floor(i / 3)

    const jitterX = ((i * 17) % 12) - 6
    const jitterY = (i * 37) % 90
    const sizeVariation = (i * 53) % 110
    const depth = ((i * 29) % 100) / 100
    const speed = 0.75 + depth * 0.5
    const scale = 0.82 + depth * 0.28
    const opacity = 0.55 + depth * 0.45
    const rotation = ((i * 23) % 7) - 3
    return {
        src,
        leftplace: column_base[colindex] + jitterX,
        relativetop: 60 + (clusterIndex * column_gap) + COL_STAGGER[colindex] + jitterY,
        width: 180 + sizeVariation,
        speed,
        scale, opacity, rotation, depth,
    }
})

const gallery = document.getElementById("gallery")
const imgElements = []
if (gallery) {
    imagedata.forEach((data, i) => {
        const img = document.createElement('img')
        img.src = data.src
        img.alt = "image....."
        img.className = 'gallery-item'
        img.style.width = `${data.width}px`;
        img.style.opacity = data.opacity
        gallery.appendChild(img)
        imgElements.push({
            element: img,
            leftposition: data.leftplace,
            relativetop: data.relativetop,
            speed: data.speed,
            scale: data.scale,
            opacity: data.opacity,
            rotation: data.rotation,
            depth: data.depth,
            currentRotation: data.rotation
        })
    })
}

const scroll = document.getElementById('scrollSpacer')
if (scroll && imagedata.length > 0) {
    const maxRelativetop = Math.max(...imagedata.map(d => d.relativetop))
    scroll.style.height = `${maxRelativetop + window.innerHeight + 800}px`
}

let targetScroll = window.scrollY
let currentScroll = window.scrollY
let previousScroll = window.scrollY
let scrollVelocity = 0

const ease = 0.09
window.addEventListener('scroll', () => {
    targetScroll = window.scrollY
}, { passive: true })

function animate() {
    currentScroll += (targetScroll - currentScroll) * ease
    scrollVelocity = currentScroll - previousScroll
    previousScroll = currentScroll
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    imgElements.forEach((item) => {
        const leftPosition = (item.leftposition / 100) * screenWidth
        const yPosition = screenHeight + item.relativetop - currentScroll * item.speed
        const velocityRotation = scrollVelocity * 0.08
        const targetRotation = item.rotation + velocityRotation
        item.currentRotation += (targetRotation - item.currentRotation) * 0.12
        item.element.style.transform = ` translate3d(${leftPosition}px,${yPosition}px,0) rotate(${item.currentRotation}deg) scale(${item.scale})`
    })
    requestAnimationFrame(animate)
}
requestAnimationFrame(animate)



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