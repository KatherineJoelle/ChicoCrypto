import { getUserData, UserData } from '@decentraland/Identity'
import { getCurrentRealm } from '@decentraland/EnvironmentAPI'
import { getParcel } from '@decentraland/ParcelIdentity'
import utils from '../node_modules/decentraland-ecs-utils/index'

import { Delay } from '../node_modules/decentraland-ecs-utils/timer/component/delay'

const videosList = [
  { url: 'https://vod.dcl.guru/cryptochico/chicocrypto-eh4NnnasvBc-.m3u8', duration: 11 * 60 + 19}
  { url: 'https://vod.dcl.guru/cryptochico/Litecoin-DeadOrDevelopedGithubExposedCanYouRelyonGithubData/Litecoin-DeadOrDevelopedGithubExposedCanYouRelyonGithubData.m3u8', duration: 9 * 60 + 31 },
  { url: 'https://vod.dcl.guru/cryptochico/MajorALTCOINBreakcoutNEXTWEEK-2CoinsSibosSpeculation/MajorALTCOINBreakcoutNEXTWEEK-2CoinsSibosSpeculation.m3u8', duration: 10 * 60 + 31 },
  { url: 'https://vod.dcl.guru/cryptochico/RussianSpyConspiracyWillDestroyThese3CryptosDeepStateInvolved/RussianSpyConspiracyWillDestroyThese3CryptosDeepStateInvolved.m3u8', duration: 11 * 60 + 24 },
  { url: 'https://vod.dcl.guru/cryptochico/SatoshiNakamotoRevealedOrJustAnotherFaketoshi/SatoshiNakamotoRevealedOrJustAnotherFaketoshi.m3u8', duration: 9 * 60 + 12 },
  { url: 'https://vod.dcl.guru/cryptochico/TheNextAltcoinAltSeason-RealityorFairytaleMyth/TheNextAltcoinAltSeason-RealityorFairytaleMyth.m3u8', duration: 7 * 60 + 31 },
]
let videoRunning = -1
let runningVideoTexture: VideoTexture
let withinParcel: boolean

// Position hack
Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
  log(`pos: `, Camera.instance.position)
  log(`rot: `, Camera.instance.rotation.eulerAngles)
})

// ------- building and party audio
let cc = new Entity()
const transform = new Transform({ position: new Vector3(16, 0, 16), rotation: Quaternion.Euler(0, -90, 0) })
cc.addComponent(transform)
cc.addComponent(new GLTFShape('models/cc.glb'))
let animator = new Animator()
cc.addComponent(animator)
const clipText = new AnimationState('text') //spin
//const clipParty = new AnimationState('party') //lights
animator.addClip(clipText)
//animator.addClip(clipParty)
clipText.play()
//clipParty.play()
//clipParty.speed = 1
engine.addEntity(cc)

let coins = new Entity()
coins.addComponent(transform)
coins.addComponent(new GLTFShape('models/coins.glb'))
//coins.addComponent(new AudioStream('https://icecast.ravepartyradio.org/ravepartyradio-192.mp3'))
//AudioStream.call
engine.addEntity(coins)

// party trick

//const bong = new Entity()
//const bAnimator = new Animator()
//const clipPuff = new AnimationState('test')

//bAnimator.addClip(clipPuff)
//bong.addComponent(bAnimator)
//clipPuff.playing = false
//clipPuff.looping = false
//clipPuff.speed = 1
//bong.addComponent(new Transform({ position: new Vector3(26.5, 1.85, 23.5), rotation: Quaternion.Euler(0, -90, 0) }))
//bong.addComponent(new GLTFShape('models/bong.glb'))
//engine.addEntity(bong)
//const puff = new AudioClip('sounds/bong.mp3')
//const source = new AudioSource(puff)
//bong.addComponent(source)
//source.playing = false
//source.loop = false
//source.volume = 100
//bong.addComponent(
  //new OnPointerDown(
    //(e) => {
      //log('clicked bong')
      //clipPuff.playing = !clipPuff.playing
      //source.playOnce()
    //},
    //{ button: ActionButton.POINTER, hoverText: 'smoke' }
  //)
//)

const screen = new Entity()
screen.addComponent(new PlaneShape())
screen.addComponent(
  new Transform({
    position: new Vector3(29.3, 4.5, 13.75),
    scale: new Vector3(11.2, 6, 1),
    rotation: Quaternion.Euler(0, -90, 0)
  })
)
engine.addEntity(screen)

// create trigger area object, setting size and relative position
const triggerEntity = new Entity()
triggerEntity.addComponent(
  new Transform({
    position: new Vector3(16, 0, 16),
  })
)
engine.addEntity(triggerEntity)
let triggerBox = new utils.TriggerBoxShape(new Vector3(32, 15, 32), new Vector3(0, 7.5, 0))
// Create trigger for entity
triggerEntity.addComponent(
  new utils.TriggerComponent(
    triggerBox, //shape
    0, //layer
    0, //triggeredByLayer
    null, //onTriggerEnter
    null, //onTriggerExit
    () => {
      if (runningVideoTexture == undefined) rollVideos(screen)
      //onCameraEnter
      log('Enter')
      withinParcel = true
      runningVideoTexture.playing = true
      /*       screen.addComponent(
        new utils.Interval(5000, () => {
          rollVideos(screen);
        })
      );
 */
    },
    () => {
      //onCameraExit
      log('Exit')
      screen.removeComponent(Delay)
      withinParcel = false
      runningVideoTexture.playing = false
    },
    false //debug
  )
)

// ------ social links
let twetch = new Entity()
twetch.addComponent(new Transform({ position: new Vector3(16, 0, 16), rotation: Quaternion.Euler(0, -90, 0) }))
twetch.addComponent(new GLTFShape('models/twetch.glb'))
twetch.addComponent(
  new OnPointerDown(() => {
    openExternalURL('https://twet.ch/inv/chicocrypto')
  })
)
engine.addEntity(twetch)

let instagram = new Entity()
instagram.addComponent(new Transform({ position: new Vector3(16, 0, 16), rotation: Quaternion.Euler(0, -90, 0) }))
instagram.addComponent(new GLTFShape('models/instagram.glb'))
instagram.addComponent(
  new OnPointerDown(() => {
    openExternalURL('https://www.instagram.com/chicocrypto/?hl=en')
  })
)
engine.addEntity(instagram)

let telegram = new Entity()
telegram.addComponent(new Transform({ position: new Vector3(16, 0, 16), rotation: Quaternion.Euler(0, -90, 0) }))
telegram.addComponent(new GLTFShape('models/telegram.glb'))
telegram.addComponent(
  new OnPointerDown(() => {
    openExternalURL('https://t.me/joinchat/GfSdSEkwiQoQ1Q1...')
  })
)
engine.addEntity(telegram)

let uptrennd = new Entity()
uptrennd.addComponent(new Transform({ position: new Vector3(16, 0, 16), rotation: Quaternion.Euler(0, -90, 0) }))
uptrennd.addComponent(new GLTFShape('models/uptrennd.glb'))
uptrennd.addComponent(
  new OnPointerDown(() => {
    openExternalURL('https://www.uptrennd.com/user/NzA3Mzk=')
  })
)
engine.addEntity(uptrennd)

let youtube = new Entity()
youtube.addComponent(new Transform({ position: new Vector3(16, 0, 16), rotation: Quaternion.Euler(0, -90, 0) }))
youtube.addComponent(new GLTFShape('models/youtube.glb'))
youtube.addComponent(
  new OnPointerDown(() => {
    openExternalURL('https://www.youtube.com/channel/UCHop-jpf-huVT1IYw79ymPw')
  })
)
engine.addEntity(youtube)

async function rollVideos(screen: Entity) {
  videoRunning++
  if (videoRunning >= videosList.length) videoRunning = 0
  screen.removeComponent(Material)

  const ourVideoClip = new VideoClip(videosList[videoRunning].url)
  const ourVideoTexture = new VideoTexture(ourVideoClip)
  const ourMaterial = new Material()
  ourMaterial.specularIntensity = 0
  ourMaterial.metallic = 0
  ourMaterial.roughness = 1
  ourMaterial.albedoTexture = ourVideoTexture
  runningVideoTexture = ourVideoTexture

  screen.addComponent(ourMaterial)
  ourVideoTexture.playing = true
  ourVideoTexture.loop = false
}

class VideoSystem {
  timeSinceStart: number = 0
  update(dt: number) {
    let r = screen.getComponent(Material).albedoTexture as VideoTexture
    if (r && withinParcel) {
      this.timeSinceStart += dt
      if (this.timeSinceStart >= videosList[videoRunning].duration) {
        this.timeSinceStart = 0
        rollVideos(screen)
      }
    }
  }
}

engine.addSystem(new VideoSystem())


