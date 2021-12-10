/* eslint-disable no-unused-vars */
//Declare constants and variables
const list = document.querySelector('.scores')

//data
var appData = JSON.parse(window.localStorage.getItem('data')) || []
var studentData = undefined

//Add eventListener to the increase & decrease using Event Delegation
list.addEventListener('click', e => {

	const parent = e.target.parentElement
	var studentName = parent.getElementsByTagName('h3')[0]
	var target = parent.getElementsByTagName('span')[0]
	var type = ''

	//TODO -- come back and remove this line
	//appData.push(studentData)

	//Check that a list was clicked as the event bubbles through
	if(e.target.classList.contains('increase')) {

		//Increase the score of the clicked student
		alterScore(type = 'increase', parent, target)
		updateData()

	}else if(e.target.classList.contains('decrease')) {

		//decrease the score of the clicked student
		alterScore(type = 'decrease', parent, target)
		updateData()
	}
})


const updateData = () => {

	if(appData.length == 0) {
		appData.push(studentData)
		return
	}
    
	appData.map(() => {
        
		const index = appData.findIndex(obj => obj.name === studentData.name)
		if( index >= 0) {
			appData[index].name = studentData.name
			appData[index].score = studentData.score

		}else {
			appData.push(studentData)	
		}  

	})
            

	//Saving value into the localStorage
	window.localStorage.setItem('appData', JSON.stringify(appData))

	console.log(appData)
}

const alterScore = (type, parent, target) => {

	const name = parent.getElementsByTagName('h3')[0].innerHTML
	
	switch(type) {
   
	case 'increase':

		//Increase score count & Set the new value for the target element
		target.innerHTML = parseInt(target.innerHTML) + 1
		studentData = {name: name, score: target.innerHTML}
		break

	default:

		if(parseInt(target.innerHTML) === 0) {
			return
		}
            
		//Decrease score count & set the new value for the target element
		target.innerHTML = parseInt(target.innerHTML) - 1
		studentData = {name: name, score: target.innerHTML}

	}

}


//Generate the li tag and insert into the ul tag 
const generateTemplate = student => {
	const html = `

        <li class="list-group-item d-flex justify-content-between align-items-center">
            <h3 class="student-name">${student.name}</h3>
            <span id="score" class="student-score">${student.score}</span>
            <i class="fas fa-trash-alt increase">increase score</i>
            <i class="fas fa-trash-alt decrease">decrease score</i>
        </li>
    `
	list.innerHTML += html
}

(() => {

	console.log('update view')
	//Update the application view
	const applicationData = window.localStorage.getItem('appData')
	if(applicationData) {
		console.log('data is present')
		const dataArray = JSON.parse(applicationData)
		dataArray.forEach(data => {
			generateTemplate(data)
		})

	}else {
		const html = `
            <p>No data stored in the database. Please add a student first<p>
            <span><a href="index.html">Add student records first</a></span>
        `
		list.innerHTML += html
	}
	
})()
