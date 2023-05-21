const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const points = new Array()
const height = canvas.clientHeight
const width  = canvas.clientWidth
const scale  = 12 * height / 848
const steps = 5

canvas.height = height
canvas.width = width

const sigma = 10
const beta = 8/3
const dt = 0.01
const ro = 28

let x = 1
let y = 1
let z = 1

context.translate(width / 2, height / 2)

function update() {

    for (let step = 0; step < steps; step++) {

        const dy = (x * (ro - z) - y) * dt
        const dz = (x * y - beta * z) * dt
        const dx = (sigma * (y - x)) * dt
    
        x += dx
        y += dy
        z += dz
    
        points.push({x, y, z})

    }

    draw()

    requestAnimationFrame(update)

}

function draw() {

    context.clearRect(-width / 2, -height / 2, width, height)

    for (let index = 1; index < points.length - 2; index++) {

        const previous = points[index - 1]
        const current = points[index]

        context.beginPath()
        context.strokeStyle = 'rgb(150, 150, 150)'
        context.moveTo(previous.x * scale, previous.y * scale)
        context.lineTo(current.x * scale, current.y * scale)
        context.stroke()

    }

}

update()