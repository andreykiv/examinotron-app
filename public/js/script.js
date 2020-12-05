const proxyServer = 'https://cors-anywhere.herokuapp.com/'
const submitTestBtn = document.getElementById('submitTestBtn')
const testResult = document.getElementById('testResult')

//take a record of id and value as a key:value pairs in sessionStorage
for(const form of document.forms){
    form.addEventListener('click', (e) => {
        if(e.target.tagName.toLowerCase() === 'input') {
            sessionStorage.setItem(e.target.id, e.target.value)
        }
    })
}

submitTestBtn.onclick = async () => {
    //retrieve all correct answers and id of the question 
    let answers = await axios.get('/api/quizs/answers')
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let totalQuestions = 0;
    
    answers.data.forEach(question => {
        let userAnswer = sessionStorage.getItem(question._id)
        
        if(question.correctAnswer == userAnswer){
            correctAnswers +=1;
            totalQuestions +=1;
            //add a class if this option strikes
            document.getElementById(`ans${userAnswer}_${question._id}_label`).classList.add('correct', 'solution')
        } else if (userAnswer == null) {
            totalQuestions +=1;
            //add a class if this option strikes
            document.getElementById(`ans${question.correctAnswer}_${question._id}_label`).classList.add('solution')
        } else {
            wrongAnswers +=1;
            totalQuestions +=1;
            //add clesses if this option strikes
            document.getElementById(`ans${userAnswer}_${question._id}_label`).classList.add('wrong')
            document.getElementById(`ans${question.correctAnswer}_${question._id}_label`).classList.add('solution')
        }
        
    })

    let finalScore = ((correctAnswers - (wrongAnswers / 3).toFixed(2)) / totalQuestions * 10).toFixed(2)
    
    document.getElementById("rightAnswers").innerHTML = correctAnswers
    document.getElementById("wrongAnswers").innerHTML = wrongAnswers
    document.getElementById('totalQuestions').innerHTML = totalQuestions
    document.getElementById("totalScore").innerHTML = finalScore
    


    testResult.style.display = 'block';
    // console.log(correctAnswers)
    // console.log(noAnswers);
    // console.log(wrongAnswers);
    // console.log(totalQuestions);
    
}

window.onbeforeunload = (e) => {
    sessionStorage.clear();
}



//passos a seguir:
//hacer consulta de todos los quizs arriba del archivo.
// const tests = [{id:'asdasd', question: 'asdasd?'...}]
/* 
const answers = tests.map((test) => {
    return {id: test.id, solution: test.solution}
}) */
/* 
const getAllQuizs = async() => {
    let quizs = await axios.get(proxyServer + "https://examinotron-app.herokuapp.com/api/quizs")
    console.log(quizs.data);
}

getAllQuizs()

const readGuesses = () => {
    const guesses = localStorage.getItem('guesses')
    try{
        return guesses ? JSON.parse(guesses) : []
    } catch (e) {
        return []
    }
}

const writeGuesses = (guesses) => {
    localStorage.setItem('guesses', JSON.stringify(guesses))
}
 */
//solution xavi
// for (form of document.forms) {
//     form.addEventListener('click', (e) => {
//         const id = e.target.parentNode.id
//         const value = parseInt(e.target.value)
//         if(id && value) {
//             const guesses = readGuesses()
//             console.log('guesses before push ', guesses)
//             guesses.push({id, value})
//             writeGuesses(guesses)
//         }
//     })
// }




        //if there is no id within the array and the user selected the radio button, make a push.
        // let key = "answers"
        // let userAnswer = {id: e.target.id, value: e.target.value}
        // sessionStorage.setItem(key, JSON.stringify(userAnswer))
        // let item = JSON.parse(sessionStorage.getItem(key))
        
        // if(!userAnswers.includes(item.id)){
        //     userAnswers.push(item);
        // } else if(userAnswers.includes(item.id)) {
        //     console.log("Item already selected");
        // } else {
        //     console.log("something went wrong.")
        // }
/*          if(!userAnswers.includes(e.target.id) && e.target.value !== undefined){
            userAnswers.push(e.target.id, e.target.value )
        //if the id already exists in the array and the user selects a radio button, replace its value by a new one, which was selected by user. 
        } else if (userAnswers.includes(e.target.id) && e.target.value !== undefined) {
            userAnswers.splice(userAnswers.indexOf(e.target.id) + 1, 1, e.target.value)
        } else {
            alert("Please click on the radio button.")
        }
        console.log(userAnswers);
    })
} */







