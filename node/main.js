const math = require('./math.js');
const angle = math.angle;

const Leap = require('leapjs');
const {
  Client,
  Message
} = require('node-osc');

let timestamp = Date.now()

function onConnect() {
  console.log('Device Connected')
}

function frameCheck(frame) {
  if (frame.id % 10 === 0) {
    curTime = Date.now();
    timeDelta = curTime - timestamp;
    timestamp = curTime;

    console.log(`frame id : \x1b[36m${frame.id}\x1b[0m, \x1b[36m${timeDelta / 1000}\x1b[0m seconds every 10 frames`)
  }
}

const CustomFingers = function (data) {
  this.fingers = data
  this.bends = [0, 0, 0, 0, 0]
}

CustomFingers.prototype.getBends = function () {
  const options = {
    clip: {
      0: [0.25, 0.28, 0.3],
      1: [0.7, 0.6, 0.5],
      2: [0.7, 0.6, 0.5],
      3: [0.7, 0.6, 0.5],
      4: [0.7, 0.6, 0.5]
    },
    mix: {
      0: [0.3, 0, 0.7],
      1: [0.6, 0.3, 0.1],
      2: [0.6, 0.3, 0.1],
      3: [0.6, 0.3, 0.1],
      4: [0.6, 0.3, 0.1]
    }
  }

  this.bends = this.bends.map((value, index) => {
    const metArr = this.fingers[index].metacarpal.direction()
    const proxArr = this.fingers[index].proximal.direction()
    const medArr = this.fingers[index].medial.direction()
    const disArr = this.fingers[index].distal.direction()

    const bendItem = {
      metacarpal: metArr,
      proximal: proxArr,
      medial: medArr,
      distal: disArr,
      angle: [1 - angle(metArr, proxArr), 1 - angle(proxArr, medArr), 1 - angle(medArr, disArr)]
    }

    return bendItem
  })

  return this.bends
}

// console log out env mode : production or dev?
const __DEV__ = process.env.NODE_ENV === 'development'

console.log(`Hello, \x1b[33m clubgoldenflower \x1b[0m
Program is running in ${!!process.env.NODE_ENV ? process.env.NODE_ENV:'production' } mode.
`)

const controller = new Leap.Controller();

controller.on('connect', onConnect);

controller.loop(function (frame) {
  __DEV__ && frameCheck(frame)

  if (frame.hands[0]) {
    const a = new CustomFingers(frame.hands[0].fingers)
    const bends = a.getBends()
    const msg = new Message('/fingers/raw')
    msg.append('thumb')
    msg.append(bends[0].angle)
    msg.append('index')
    msg.append(bends[1].angle)
    msg.append('middle')
    msg.append(bends[2].angle)
    msg.append('ring')
    msg.append(bends[3].angle)
    msg.append('pinky')
    msg.append(bends[4].angle)

    const client = new Client('localhost', 3030)
    client.send(msg, (err) => {
      if (err) {
        console.log(err)
      }
      client.close()
    })

    // process wrist and roll
    const roll = (-1 * frame.hands[0].roll() + Math.PI) / (2 * Math.PI)
    const palm = frame.hands[0].palmNormal
    const arm = frame.hands[0].arm.direction()
    const wrist = (angle(palm, arm) + 1) / 2

    const msg2 = new Message('/hand')
    msg2.append('s6_wrist')
    msg2.append(wrist)
    msg2.append('s7_roll')
    msg2.append(roll)

    const palmPos = frame.hands[0].palmPosition

    // added
    msg2.append('s8_')
    msg2.append(palmPos[1])
    msg2.append('s9_')
    msg2.append(palmPos[2])
    msg2.append('s10_')
    msg2.append(palmPos[0])

    const client2 = new Client('localhost', 3030)
    client2.send(msg2, (err) => {
      if (err) {
        console.log(err)
      }
      client2.close()
    })
  }

})