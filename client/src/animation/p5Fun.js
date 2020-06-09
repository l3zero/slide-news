import p5 from 'p5'

export function startSlideAnimation() {
   const slideAnimation = (p) => {
      //This controls how long animation runs
      let counter = 20

      p.setup = () => {
         p.createCanvas(650, 100, p.WEBGL)
         p.noFill()
         let intr = setInterval(() => {
            counter--
            if (counter === 0) {
               p.noLoop()
               clearInterval(intr)
            }
         }, 1000)
      }

      p.draw = () => {
         //   p.rotateY(p.frameCount * 0.02)
         p.stroke('#61a1c1')

         for (let j = 0; j < 5; j++) {
            //  p.push()
            p.translate(p.sin(p.frameCount * 0.002 + j) * 1000, p.sin(p.frameCount * 0.09 + j) * 10)
            p.circle(0, 0, 10)
            p.push()
            //p.rotateZ(p.frameCount * 0.002)
            //     p.pop()
            p.pop()
         }
      }
   }
   const myp5 = new p5(slideAnimation, 'header > div')
}
