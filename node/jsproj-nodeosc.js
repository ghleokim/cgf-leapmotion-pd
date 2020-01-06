// make print functions
const readline = require('readline')
const blank = '\n'.repeat(process.stdout.rows)

function logger(msg) {
  process.stdout.write(blank)
  readline.cursorTo(process.stdout, 0, 0)
  process.stdout.write(msg)
}

function multiply(a, b) {
  let res = 0

  res += a[0] * b[0];
  res += a[1] * b[1];
  res += a[2] * b[2];

  return res
}

function angle(a, b) {
  this.normalizedA = 0
  this.normalizedB = 0

  a.forEach(function (el) {
    this.normalizedA += el * el
  })
  b.forEach(function (el) {
    this.normalizedB += el * el
  })

  normalizedA = Math.sqrt(normalizedA)
  normalizedB = Math.sqrt(normalizedB)

  // console.log(normalizedA, normalizedB)

  return Math.acos(multiply(a, b) / (normalizedA * normalizedB))
}


// start
const {
  Client,
  Message
} = require('node-osc');

let client = new Client('localhost', 3000);

client.send('/test', 10, () => {
  client.close()
})

const Leap = require('leapjs');
const controller = new Leap.Controller();

//finger

function fingerElement (finger) {
  const metArr = finger.metacarpal.direction()
  const proxArr = finger.proximal.direction()
  const medArr = finger.medial.direction()

  return [ metArr, proxArr, medArr ]
}

controller.loop(function (frame) {
  // console.log(state)
  // console.log(frame.hands[0])
  if (frame.hands[0]) {
    const fingers = []

    frame.hands[0].fingers.forEach(function (el) {
      const [ metArr, proxArr, medArr ] = fingerElement(el)
      // console.log(metArr, proxArr)
      fingers.push([angle(metArr, proxArr), angle(proxArr, medArr)])
    })

    const msg = `${fingers[0]}\n${fingers[1]}\n${fingers[2]}\n${fingers[3]}\n${fingers[4]}`

    // console.log(fingers)
    logger(msg)

    const testFinger = frame.hands[0].fingers[0]

    const metArr = testFinger.metacarpal.direction()
    const proxArr = testFinger.proximal.direction()
    const medArr = testFinger.medial.direction()

    // const msg = testFinger.stabilizedTipPosition.forEach((e) => {
    //     parseInt(e)
    //   }) +
    //   `\nmatrix: ${testFinger.metacarpal.matrix()}` +
    //   `\nmetacarpal : ${metArr}` +
    //   `\nproximal : ${proxArr}` +
    //   `\nmedial : ${medArr}` +
    //   `\ncos met-prox : ${angle(metArr, proxArr)}` +
    //   `\ncos prox-med : ${angle(proxArr, medArr)}`
    // // + `\nangle : `

    // logger(msg)


    // basic frame
    const msg_frame = new Message('/frame')
    // msg_frame.append('valid')
    // msg_frame.append(frame.hands[0]['valid'])
    msg_frame.append('id')
    msg_frame.append(frame.hands[0].id)

    msg_frame.append('palmNormal')
    msg_frame.append(frame.hands[0].palmNormal)

    let client = new Client('localhost', 3000);
    client.send(msg_frame, (err) => {
      if (err) {
        console.log(err)
      }
      client.close()
    })

    msg_finger0 = new Message('/finger')
    msg_finger0.append('metacarpal')
    msg_finger0.append(metArr)
    msg_finger0.append('proximal')
    msg_finger0.append(proxArr)
    msg_finger0.append('medial')
    msg_finger0.append(medArr)

    client.send(msg_finger0, (err) => {
      if (err) {
        console.log(err)
      }
      client.close()
    })
  }
})