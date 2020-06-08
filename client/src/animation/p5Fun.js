import p5 from 'p5'

const p5bg = (p) => {
   p.setup = () => {
      p.createCanvas(650, 300, p.WEBGL)
      p.noFill()
   }
   p.draw = () => {
      // p.background(250);
      //   p.rotateY(p.frameCount * 0.02)
      p.stroke('#61a1c1')

      for (let j = 0; j < 1; j++) {
         //  p.push()
         p.translate(p.sin(p.frameCount * 0.002 + j) * 1000, p.sin(p.frameCount * 0.09 + j) * 10)
         p.circle(0, 0, 10)
         p.push()
         //  for (let i = 0; i < 1; i++) {
         //     p.translate(p.sin(p.frameCount * 0.02 + j) * 100, p.sin(p.frameCount * 0.08 + j) * 100, i * 0.1)
         //     // p.rotateZ(p.frameCount * 0.002)
         //     p.push()
         //     p.circle(0, 0, 20)
         //     p.pop()
         //     // p.stroke(255)
         //  }
         p.pop()
      }
   }
}

export let myp5 = new p5(p5bg, 'header > div')
