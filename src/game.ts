import utils from "../node_modules/decentraland-ecs-utils/index"


// ------- building
let cc = new Entity()
cc.addComponent(new Transform({position: new Vector3(16,0,16)}))
cc.addComponent(new GLTFShape("models/cc.glb"))
let animator = new Animator()
cc.addComponent(animator)
const clipText = new AnimationState("text") //spin
animator.addClip(clipText)
clipText.play()
engine.addEntity(cc)

let coins = new Entity
coins.addComponent(new Transform({position: new Vector3(16,0,16)}))
coins.addComponent(new GLTFShape("models/coins.glb"))
engine.addEntity(coins)


// ----- video stream and trigger area
const myVideoClip = new VideoClip("https://ipfs.io/ipfs/QmdGnJHS8JBAqvqyKESSPR4NsLGpoYe3Z8WBxd9BioH6jL/altcoins1.m3u8")
const myVideoTexture = new VideoTexture(myVideoClip)
const myMaterial = new Material()
myMaterial.specularIntensity = 0
myMaterial.metallic = 0
myMaterial.roughness = 1
myMaterial.albedoTexture = myVideoTexture


const screen = new Entity()
screen.addComponent(new PlaneShape())
screen.addComponent(
  new Transform({
    position: new Vector3(13.7, 4.5, 2.6),
    scale: new Vector3(11.2, 6, 1)
  })
)
screen.addComponent(myMaterial)
engine.addEntity(screen)

// play the video texture
myVideoTexture.playing = false
// create trigger area object, setting size and relative position
let triggerBox = new utils.TriggerBoxShape(
  new Vector3(32, 15, 30),
  new Vector3(2, 0, 14)
)
// Create trigger for entity
screen.addComponent(
  new utils.TriggerComponent(
    triggerBox, //shape
    0, //layer
    0, //triggeredByLayer
    null, //onTriggerEnter
    null, //onTriggerExit
    () => {
      //onCameraEnter
      log("Enter")
      myVideoTexture.playing = true
    },
    () => {
      //onCameraExit
      log("Exit")
      myVideoTexture.playing = false
    },
    false //debug
  )
)


// ------ social links
let twetch = new Entity()
twetch.addComponent(new Transform({position: new Vector3(16,0,16)}))
twetch.addComponent(new GLTFShape("models/twetch.glb"))
twetch.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://twet.ch/inv/chicocrypto")
  })
  )
  engine.addEntity(twetch)

let instagram = new Entity()
instagram.addComponent(new Transform({position: new Vector3(16,0,16)}))
instagram.addComponent(new GLTFShape("models/instagram.glb"))
instagram.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.instagram.com/chicocrypto/?hl=en")
  })
  )
  engine.addEntity(instagram)

let telegram = new Entity()
telegram.addComponent(new Transform({position: new Vector3(16,0,16)}))
telegram.addComponent(new GLTFShape("models/telegram.glb"))
telegram.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://t.me/joinchat/GfSdSEkwiQoQ1Q1...")
  })
  )
  engine.addEntity(telegram)

let uptrennd = new Entity()
uptrennd.addComponent(new Transform({position: new Vector3(16,0,16)}))
uptrennd.addComponent(new GLTFShape("models/uptrennd.glb"))
uptrennd.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.uptrennd.com/user/NzA3Mzk=")
  })
  )
  engine.addEntity(uptrennd)

let youtube = new Entity()
youtube.addComponent(new Transform({position: new Vector3(16,0,16)}))
youtube.addComponent(new GLTFShape("models/youtube.glb"))
youtube.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.youtube.com/channel/UCHop-jpf-huVT1IYw79ymPw")
  })
  )
  engine.addEntity(youtube)