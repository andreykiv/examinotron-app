let userAnswers = []
let correctAnswers = []
for (form of document.forms) {
    form.addEventListener('click', (e) => {
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
         if(!userAnswers.includes(e.target.id) && e.target.value !== undefined){
            userAnswers.push(e.target.id, e.target.value )
        //if the id already exists in the array and the user selects a radio button, replace its value by a new one, which was selected by user. 
        } else if (userAnswers.includes(e.target.id) && e.target.value !== undefined) {
            userAnswers.splice(userAnswers.indexOf(e.target.id) + 1, 1, e.target.value)
        } else {
            alert("Please click on the radio button.")
        }
        console.log(userAnswers);
    })
}







