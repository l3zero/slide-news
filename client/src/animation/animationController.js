import {gsap} from 'gsap'
import {startSlideAnimation} from './p5Fun.js'

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
      autoRemoveChildren: true,
      onComplete: () => {
         this.kill()
      }
      // other callbacks:
      // onStart, onUpdate, onRepeat, onReverseComplete
      // Each callback has a params property as well
      // i.e. onUpdateParams (Array)
   })
}

/* @params tl and elements - Take timeline object and array of element selectors in the order you want to animate them. 
Please note: this is basically boilerplate to reuse in future applications and keep it modular inside React. You have to tailor it to your specific use case and add any necessary gsap code here.*/
export function editIntro(tl, elements) {
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
         ease: 'elastic.inOut',
         opacity: 0,
         x: '50%',
         delay: 0.3,
         duration: 1
      })
      .from(elements[3], {opacity: 0, duration: 0.3, x: '-1000%', color: 'black'})
      .from(elements[4], {opacity: 0, duration: 0.3, x: '1000%', color: 'black'})
      .from(elements[5], {opacity: 0, duration: 0.3, x: '-1000%', color: 'black'})
      .from(elements[6], {opacity: 0, delay: 0.5, onComplete: startSlideAnimation})
      .from(elements[1], {filter: 'hue-rotate(300deg)', duration: 2.5, repeat: -1, yoyo: true})
}

export function editCustomizePage(element) {
   gsap.from(element, {ease: 'elastic.out', opacity: 0, x: '-50%', duration: 1.2})
}
export function editSubmitArrow(element) {
   gsap.from(element, {
      ease: 'elastic.out',
      x: '-50%',
      // rotateX: '720deg',
      rotateY: '520deg',
      // rotateZ: '720deg',
      duration: 1
   })
}
export function editGoButton(element) {
   gsap.from(element, {
      ease: 'power2.out',
      y: '-100%',
      rotateX: '520deg',
      // rotateY: '520deg',
      // rotateZ: '720deg',
      duration: 1.5
   })
}
export function editMiniViewOpen(element) {
   gsap.from(element, {
      ease: 'power2.out',
      duration: 1,
      scaleY: 1.5,
      skewX: 50
   })
}
