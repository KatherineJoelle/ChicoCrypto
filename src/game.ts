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
// 1
const myVideoClip = new VideoClip("https://vod.dcl.guru/cryptochico/Litecoin-DeadOrDevelopedGithubExposedCanYouRelyonGithubData/Litecoin-DeadOrDevelopedGithubExposedCanYouRelyonGithubData.m3u8")
const myVideoTexture = new VideoTexture(myVideoClip)
const myMaterial = new Material()
myMaterial.specularIntensity = 0
myMaterial.metallic = 0
myMaterial.roughness = 1
myMaterial.albedoTexture = myVideoTexture

// 2 
const myVideoClip2 = new VideoClip("https://vod.dcl.guru/cryptochico/MajorALTCOINBreakcoutNEXTWEEK-2CoinsSibosSpeculation/MajorALTCOINBreakcoutNEXTWEEK-2CoinsSibosSpeculation.m3u8")
const myVideoTexture2 = new VideoTexture(myVideoClip2)
const myMaterial2 = new Material()
myMaterial2.specularIntensity = 0
myMaterial2.metallic = 0
myMaterial2.roughness = 1
myMaterial2.albedoTexture = myVideoTexture2

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
myVideoTexture2.playing = false
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
      screen.addComponent(new utils.Delay(1000, () => {
        myVideoTexture.playing = false
        screen.addComponentOrReplace(myMaterial2)
        myVideoTexture2.playing = true
       }))

    },
    () => {
      //onCameraExit
      log("Exit")
      myVideoTexture.playing = false
      myVideoTexture2.playing = false 
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