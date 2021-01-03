import * as PIXI from 'pixi.js'

export const app = new PIXI.Application()
// document.body.appendChild(app.view)

// holder to store the icons
const icons = []

const numIcons = 6

for (let i = 0; i < numIcons; i++) {
   // create a new Sprite that uses the image name that we just generated as its source
   const icon = PIXI.Sprite.from(require('../img/devto.png'))

   // set the anchor point so the texture is centerd on the sprite
   icon.anchor.set(0.5)
   icon.width = 50
   icon.height = 50

   // set a random scale for the icon - no point them all being the same size!
   icon.scale.set(0.8 + Math.random() * 0.3)

   // finally lets set the icon to be at a random position..
   icon.x = Math.random() * app.screen.width
   icon.y = Math.random() * app.screen.height

   //    icon.tint = Math.random() * 0xffffff

   // create some extra properties that will control movement :
   // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
   icon.direction = Math.random() * Math.PI * 2

   // this number will be used to modify the direction of the icon over time
   icon.turningSpeed = Math.random() - 0.8

   // create a random speed for the icon between 2 - 4
   icon.speed = 2 + Math.random() * 2

   // finally we push the icon into the icons array so it it can be easily accessed later
   icons.push(icon)

   app.stage.addChild(icon)
}

// create a bounding box for the little icons
const iconBoundsPadding = 50
const iconBounds = new PIXI.Rectangle(
   -iconBoundsPadding,
   -iconBoundsPadding,
   app.screen.width + iconBoundsPadding * 2,
   app.screen.height + iconBoundsPadding * 2
)

app.ticker.add(() => {
   // iterate through the icons and update their position
   for (let i = 0; i < icons.length; i++) {
      const icon = icons[i]
      icon.direction += icon.turningSpeed * 0.01
      icon.x += Math.sin(icon.direction) * icon.speed
      icon.y += Math.cos(icon.direction) * icon.speed
      icon.rotation = -icon.direction - Math.PI / 2

      // wrap the icons by testing their bounds...
      if (icon.x < iconBounds.x) {
         icon.x += iconBounds.width
      } else if (icon.x > iconBounds.x + iconBounds.width) {
         icon.x -= iconBounds.width
      }

      if (icon.y < iconBounds.y) {
         icon.y += iconBounds.height
      } else if (icon.y > iconBounds.y + iconBounds.height) {
         icon.y -= iconBounds.height
      }
   }
})
