let scenarioNumber = 0
let choiceNumber = 0
const studentRatio = {}
const scenarios = []
const students = []

document.addEventListener('DOMContentLoaded', () => {
  fetch("http://localhost:3000/api/v1/scenarios", {
    "headers": {
      "Access-Control-Allow-Origin": "*",
    }
  })
  .then(response => response.json())
  .then(response => response.forEach((scenario) => {
    scenarios.push(scenario)
  }))
  .then (
    fetch("http://localhost:3000/api/v1/people", {
      "headers": {
        "Access-Control-Allow-Origin": "*",
      }
    })
    .then(response => response.json())
    .then(response => response.forEach((student) => {
      students.push(student)
    }))
  )
  .then(response => renderScenario())
})

const main = document.getElementById('main')
const choiceList = document.getElementById('choices-list')
const background = document.getElementById('background')

function renderScenario() {

  if (scenarios[scenarioNumber].title === "???") {
    const header = document.createElement('h1')
    header.innerText = scenarios[scenarioNumber].title
    const div = document.createElement('div')
    div.innerText = scenarios[scenarioNumber].content
    const choices = scenarios[scenarioNumber].choices

    choices.forEach(choice => {
      const li = document.createElement('li')
      li.innerText = choice.content
      li.id = `${++choiceNumber}`
      choiceList.appendChild(li)
    })

    main.appendChild(header)
    main.appendChild(div)
    main.appendChild(choiceList)
    scenarioNumber++
  } else if (scenarios[scenarioNumber].title === "Ending") {
    const header = document.createElement('h1')
    header.innerText = scenarios[scenarioNumber].title
    const div = document.createElement('div')
    div.className = "ending"
    const correctStudent = students.find(function(student) {
      return student.name === mostCommon()
    })
    div.innerText = `Phew. What a day! You’ve made it, and as you step out the doors it hits you - your memory returns! Like a tidal wave crashing over your consciousness, your identity comes back to you. \n You are .................................`
    const div2 = document.createElement('div')
    div2.innerText = correctStudent.bio
    div2.className = "ending"
    // const img = document.createElement('img')
    // img.className = "img-class"
    // img.src = correctStudent.picture
    main.appendChild(div)
    // main.appendChild(img)
    main.appendChild(div2)

  } else {

    const header = document.createElement('h1')
    header.innerText = scenarios[scenarioNumber].title
    const div = document.createElement('div')
    div.innerText = scenarios[scenarioNumber].content
    const choices = scenarios[scenarioNumber].choices
    const imageBackground = document.createElement('img')
    imageBackground.id = "image-background"
    imageBackground.src = scenarios[scenarioNumber].picture
    background.appendChild(imageBackground)
    // backgroundstyle.backgroundImage = `url(${scenarios[scenarioNumber].picture})`


    choices.forEach(choice => {
      const li = document.createElement('li')
      li.innerText = choice.content
      li.id = `${++choiceNumber}`
      choiceList.appendChild(li)
    })

    main.appendChild(header)
    main.appendChild(div)
    main.appendChild(choiceList)
    scenarioNumber++
  }
}

choiceList.addEventListener('click', function(event) {
  if (event.target && event.target.tagName === 'LI') {
    console.log(event.target.id)
    fetch(`http://localhost:3000/api/v1/choices/${event.target.id}`)
    .then(response => response.json())
    .then(choice => choice.people.forEach(person => {
      // debugger
      if (studentRatio[person.name]) {
        studentRatio[person.name]++
      } else {
        studentRatio[person.name] = 1
      }
    }))
      console.log(studentRatio)
      main.children[2].innerHTML = ''
      main.removeChild(main.children[3])
      main.removeChild(main.children[2])
      main.removeChild(main.children[1])
      background.innerHTML = ''
      choiceList.innerHTML = ''
      renderScenario()
  }
})

function mostCommon() {
//   if (Object.keys(studentRatio).include(function(key) {
//     return key === "expelled"
//   })) {
//   return 'expelled'
// } else {
    let highestAmount = 0
    let highestName = ''
    for (var name in studentRatio) {
      if (highestAmount === 0) {
        highestAmount = studentRatio[name]
        highestName = name
      } else if (highestAmount < studentRatio[name]) {
        highestAmount = studentRatio[name]
        highestName = name
      }
    }
    return highestName
  // }
}

choiceList.addEventListener('mouseover', function(event) {
  if (event.target && event.target.tagName === 'LI') {
    event.target.style.background = "black";
    event.target.style.color = "red";
    event.target.style.fontSize = "40px";
}})

choiceList.addEventListener('mouseout', function(event) {
  if (event.target && event.target.tagName === 'LI') {
    event.target.style.background = "skyblue";
    event.target.style.color = "white";
    event.target.style.fontSize = "30px";
}})
