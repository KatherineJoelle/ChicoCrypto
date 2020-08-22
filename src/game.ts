import { getUserData, UserData } from '@decentraland/Identity'
import { getCurrentRealm } from '@decentraland/EnvironmentAPI'
import { getParcel } from '@decentraland/ParcelIdentity'
import utils from '../node_modules/decentraland-ecs-utils/index'

import { Delay } from '../node_modules/decentraland-ecs-utils/timer/component/delay'

const videosList = [
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

function hslToHex(h, s, l) {
  h /= 360
  s /= 100
  l /= 100
  let r, g, b
  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return [r, g, b]
}

class CrossRealm implements ISystem {
  userData: UserData
  realm: string
  ws: WebSocket | null = null

  parcels: string[] = []

  allowList: string[] | undefined = undefined

  avatars: {
    [userId: string]: {
      lastUpdate: number
      lastMove: number
      lastWearableCheck: number
      pos: [number, number, number]
      rot: [number, number, number]
      ent: Entity
      hsl: [number, number, number]
    }
  } = {}

  timeSincePos = 0
  timeSinceRealmCheck = 0
  timeSinceColor = 0
  lastPos: Vector3 = new Vector3()
  lastRot: Vector3 = new Vector3()
  camera: Camera

  constructor() {
    this.camera = new Camera()

    executeTask(async () => {
      try {
        await this.getUserId()
        await getParcel().then((parcel) => (this.parcels = parcel.land.sceneJsonData.scene.parcels))
        this.realm = await getCurrentRealm().then((e) => e.displayName)
        this.connectToWS()
      } catch (e) {
        log(e)
      }
    })
  }

  connectToWS() {
    this.ws = new WebSocket('wss://users.dcl.guru')
    const thatWs = this.ws

    thatWs.onmessage = async (ev) => {
      const parsed = JSON.parse(ev.data)
      for (const add in parsed) {
        if (this.allowList && this.allowList.length > 0) {
          if (this.allowList.indexOf(add) == -1) continue
        }
        if (parsed.hasOwnProperty(add)) {
          const e = parsed[add]
          if (!this.avatars[add] && this.realm != undefined && e.user.realm != this.realm && e.lastUpdate > +new Date() - 1 * 60 * 1000) {
            this.avatars[add] = {
              lastUpdate: e.lastUpdate,
              lastMove: e.lastUpdate,
              lastWearableCheck: +new Date(),
              pos: e.pos,
              rot: e.rot,
              ent: new Entity(),
              hsl: [Math.round(Math.random() * 360), 80, 60],
            }

            this.grabData(this.avatars[add].ent, add)
            const avatarShape = new AvatarShape()

            avatarShape.name = `${e.user.name} (${e.user.realm})`

            avatarShape.bodyShape = 'dcl://base-avatars/BaseFemale'
            avatarShape.wearables = [
              'dcl://base-avatars/f_sweater',
              'dcl://base-avatars/f_jeans',
              'dcl://base-avatars/bun_shoes',
              'dcl://base-avatars/standard_hair',
              'dcl://base-avatars/f_eyes_00',
              'dcl://base-avatars/f_eyebrows_00',
              'dcl://base-avatars/f_mouth_00',
            ]

            this.avatars[add].ent.addComponent(avatarShape)
            this.avatars[add].ent.getComponentOrCreate(Transform).position = new Vector3(e.pos[0], e.pos[1], e.pos[2])
            this.avatars[add].ent.getComponentOrCreate(Transform).rotation = new Quaternion(e.rot[0], e.rot[1], e.rot[2], e.rot[3])

            engine.addEntity(this.avatars[add].ent)
            log(`Created shape for ${e.user.name} in ${e.user.realm} at ${+e.pos[0] / 16},${+e.pos[2] / 16}`)
          } else if (this.realm != undefined && e.user.realm != this.realm && e.lastUpdate > +new Date() - 1 * 60 * 1000) {
            this.avatars[add].lastUpdate = e.lastUpdate
            if (!new Vector3(...this.avatars[add].pos).equals(new Vector3(...e.pos))) {
              this.avatars[add].lastMove = e.lastUpdate
              log('last move', this.avatars[add].lastMove)
              this.avatars[add].pos = e.pos
              this.avatars[add].ent.getComponentOrCreate(Transform).position = new Vector3(e.pos[0], e.pos[1], e.pos[2])
            } else if (this.avatars[add].lastMove < +new Date() - 10000) {
              if (
                !this.avatars[add].ent.getComponent(AvatarShape).expressionTriggerTimestamp ||
                this.avatars[add].ent.getComponent(AvatarShape).expressionTriggerTimestamp < Math.round(+new Date() / 1000 - 9)
              ) {
                log(this.avatars[add].ent.getComponent(AvatarShape).name, 'dance')
                this.avatars[add].ent.getComponent(AvatarShape).expressionTriggerId = 'robot'
                this.avatars[add].ent.getComponent(AvatarShape).expressionTriggerTimestamp = Math.round(+new Date() / 1000)
              }
            }
            this.avatars[add].rot = e.rot

            this.avatars[add].ent.getComponentOrCreate(Transform).rotation = new Quaternion(e.rot[0], e.rot[1], e.rot[2], e.rot[3])
            if (this.avatars[add].lastWearableCheck < +new Date() - 15000) {
              this.avatars[add].lastWearableCheck = +new Date()
              this.grabData(this.avatars[add].ent, add)
            }
            const avatarShape = this.avatars[add].ent.getComponent(AvatarShape)
            if (avatarShape.name != `${e.user.name} (${e.user.realm})`) avatarShape.name = `${e.user.name} (${e.user.realm})`
          } else if (e.user.realm == this.realm && this.avatars[add]) {
            engine.removeEntity(this.avatars[add].ent)
            delete this.avatars[add]
          }
        }
      }
    }

    thatWs.onerror = function (err) {
      log('Socket encountered error: ', err.type, 'Closing socket')
      thatWs.close()
    }

    thatWs.onclose = async (ev) => {
      await this.delay(2000)
      this.ws = undefined
      this.connectToWS()
    }
  }

  isWithinParcel(parcels: string[]) {
    if (parcels.length < 1) return false
    if (this.camera.worldPosition.asArray() == [0, 0, 0]) return false
    for (const land of parcels) {
      const [x, z] = land.split(',')
      if (this.camera.worldPosition.x > +x * 16 && this.camera.worldPosition.x < (+x + 1) * 16 && this.camera.worldPosition.z > +z * 16 && this.camera.worldPosition.z < (+z + 1) * 16) return true
    }
    return false
  }

  async update(dt: number) {
    if (this.userData == undefined) return
    this.timeSincePos += dt
    this.timeSinceRealmCheck += dt
    this.timeSinceColor += dt
    const currentPos = this.camera.worldPosition.subtract(new Vector3(0, 1.6, 0))
    const currentRot = this.camera.rotation.eulerAngles
    if (this.userData.userId != undefined) {
      if (this.timeSinceColor > 0.1 && this.isWithinParcel(this.parcels)) {
        this.timeSinceColor = 0
        for (const user in this.avatars) {
          if (Object.prototype.hasOwnProperty.call(this.avatars, user)) {
            const avatar = this.avatars[user]
            avatar.hsl = [avatar.hsl[0] + 8, avatar.hsl[1], avatar.hsl[2]]
            if (avatar.hsl[0] >= 360) avatar.hsl = [0, avatar.hsl[1], avatar.hsl[2]]
            avatar.ent.getComponent(AvatarShape).skinColor = new Color4(...hslToHex(avatar.hsl[0], avatar.hsl[1], avatar.hsl[2]), 1)
            avatar.ent.getComponent(AvatarShape).hairColor = new Color4(...hslToHex(Math.random() * 360, avatar.hsl[1], avatar.hsl[2]), 1)
          }
        }
      }

      if (this.timeSincePos > 0.2 && (this.lastPos.y != currentPos.y || this.lastRot.toString() != currentRot.toString()) && this.isWithinParcel(this.parcels)) {
        this.timeSincePos = 0
        this.lastPos = currentPos.clone()
        this.lastRot = currentRot.clone()
        this.sendUpdate()
        this.checkUsers()
      } else if (this.timeSincePos > 0.5 && (this.lastPos.toString() != currentPos.toString() || this.lastRot.toString() != currentRot.toString()) && this.isWithinParcel(this.parcels)) {
        this.timeSincePos = 0
        this.lastPos = currentPos.clone()
        this.lastRot = currentRot.clone()
        this.sendUpdate()
        this.checkUsers()
      } else if (this.timeSincePos > 2.5 && this.isWithinParcel(this.parcels)) {
        this.timeSincePos = 0
        this.lastPos = currentPos.clone()
        this.lastRot = currentRot.clone()
        this.sendUpdate()
        this.checkUsers()
      }
      if (this.timeSinceRealmCheck > 5) {
        this.timeSinceRealmCheck = 0
        this.realm = await getCurrentRealm().then((e) => e.displayName)
      }
    }
  }

  checkUsers() {
    for (const user in this.avatars) {
      if (Object.prototype.hasOwnProperty.call(this.avatars, user)) {
        const element = this.avatars[user]
        if (element.lastUpdate < +new Date() - 1 * 60 * 1000) {
          engine.removeEntity(this.avatars[user].ent)
          delete this.avatars[user]
        }
      }
    }
  }

  async sendUpdate() {
    if (this.userData == undefined) return
    if (this.allowList && this.allowList.length > 0) {
      if (this.allowList.indexOf(this.userData.userId.toLowerCase()) == -1) return
    }
    const arrPos = []
    this.lastPos.subtract(new Vector3(0, 0.08, 0)).toArray(arrPos)
    if (this.ws && this.ws.OPEN && this.ws.CONNECTING == 0) {
      this.ws.send(
        JSON.stringify({
          userId: this.userData.userId,
          username: this.userData.displayName,
          realm: this.realm,
          position: arrPos,
          rotation: this.camera.rotation.asArray(),
        })
      )
    }
  }

  async getUserId() {
    this.userData = await getUserData()
  }

  async grabData(ent: Entity, userAddress: string) {
    let response = await fetch(`https://peer.decentraland.org/content/entities/profiles?pointer=${userAddress}`)
    let json = await response.json()
    if (!json[0]) return
    const profileData = json[0].metadata.avatars[0]
    const avatarData = profileData.avatar
    const dRealm = await getCurrentRealm()
    if (dRealm.serverName != 'localhost') {
      if (avatarData.wearables != ent.getComponent(AvatarShape).wearables) ent.getComponent(AvatarShape).wearables = avatarData.wearables
      if (avatarData.bodyShape != ent.getComponent(AvatarShape).bodyShape) ent.getComponent(AvatarShape).bodyShape = avatarData.bodyShape
    }

    if (avatarData.eyes.color.color != ent.getComponent(AvatarShape).eyeColor)
      ent.getComponent(AvatarShape).eyeColor = {
        a: 0,
        ...avatarData.eyes.color.color,
      }
    if (avatarData.hair.color.color != ent.getComponent(AvatarShape).hairColor)
      ent.getComponent(AvatarShape).hairColor = {
        a: 0,
        ...avatarData.hair.color.color,
      }
    /*     if (avatarData.skin.color.color != ent.getComponent(AvatarShape).skinColor)
      ent.getComponent(AvatarShape).skinColor = {
        a: 0,
        ...avatarData.skin.color.color,
      } */
  }

  delay(ms: number): Promise<undefined> {
    return new Promise((resolve, reject) => {
      const ent = new Entity()
      engine.addEntity(ent)
      ent.addComponent(
        new utils.Delay(ms, () => {
          resolve()
          engine.removeEntity(ent)
        })
      )
    })
  }
}

engine.addSystem(new CrossRealm())
