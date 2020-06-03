import {gsap} from 'gsap'

export function createTimeline() {
   return gsap.timeline({
      // delay: 0.2,
      paused: false, // default is false
      repeat: 1, // number of repeats (-1 for infinite)
      // repeatDelay: 1, // seconds between repeats
      // repeatRefresh: true, // invalidates on each repeat
      yoyo: false, // if true > A-B-B-A, if false > A-B-A-B
      defaults: {
         // children inherit these defaults
         //  duration: 0.6
      },
      smoothChildTiming: true,
      autoRemoveChildren: true
      // onComplete: myFunc,
      // other callbacks:
      // onStart, onUpdate, onRepeat, onReverseComplete
      // Each callback has a params property as well
      // i.e. onUpdateParams (Array)
   })
}

/* @params tl and elements - Take timeline object and array of element selectors in the order you want to animate them. 
Please note: this is basically boilerplate to reuse in future applications and keep it modular inside React. You have to tailor it to your specific use case and add any necessary gsap code here.*/
export function editTimeline(tl, elements) {
   tl.from(elements[0], {ease: 'bounce.out', opacity: 0, x: '-100%', delay: 0.3, duration: 1.5})
      .from(elements[1], {
         ease: 'bounce.out',
         rotate: '420deg',
         y: '-300%',
         opacity: 0,
         delay: 0.4,
         duration: 0.8
      })
      .from(elements[2], {
         ease: 'power2',
         opacity: 0,
         x: '50%',
         delay: 0.3,
         duration: 0.4
      })
      .from(elements[3], {x: '-100%', rotateY: '450deg', opacity: 0, duration: 0.3})
      .from(elements[4], {x: '-=20%', rotateY: '450deg', opacity: 0, duration: 0.3})
      .from(elements[5], {x: '-=10%', rotateX: '280deg', opacity: 0, duration: 0.3})
      .from(elements[1], {filter: 'hue-rotate(300deg)', duration: 2.5, repeat: -1, yoyo: true})
}
