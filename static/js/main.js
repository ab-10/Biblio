var searchBar = document.querySelector("#search")
var spinner = document.querySelector(".spinner-border")
const host = window.location.origin

document.addEventListener("keyup", (event) => {
    const query = searchBar.value.trim()
    if (event.key === "Enter" && searchBar === document.activeElement && query.length !== 0) {
        //do a fetch request
        console.log(spinner)
        spinner.classList.remove("hide")
        fetch("/", {
            body: JSON.stringify({ query: query }),
            method: "POST"
        }).then(res => res.json())
            .then(data => {
                console.log(1)
                spinner.classList.add("hide")
            })
    }
})

// var mydata = {
//     datasets: [{
//         label: 'My First Dataset',
//         data: [learnt, queued, learning],
//         backgroundColor: [
//             'green',
//             'rgb(255, 205, 86)',
//             'black'
//         ],
//     }],

//     // These labels appear in the legend and in the tooltips when hovering different arcs
//     labels: [
//         'Learnt',
//         'Saved for later',
//         'Unlearnt'
//     ]
// };

// var ctx = document.getElementById('myChart').getContext('2d');

// var myPieChart = new Chart(ctx, {
//     type: 'pie',
//     data: mydata,
//     // options: options
// });

// var learnt;
// var queued;
// var learning;
var tick = document.querySelectorAll(".fa-check")
var cross = document.querySelectorAll(".fa-times")
var pause = document.querySelectorAll(".fa-pause-circle")

for (let i = 0; i < tick.length; i++) {
    tick[i].addEventListener("click", (event) => {
        id = event.currentTarget.id
        console.log(host)
        fetch("/progress/", {
            body: JSON.stringify({ "id": id, "type": "tick" }),
            method: "POST"
        }).then(res => res.json()).then(data => {
            let dummy = document.getElementById(id).querySelector(".card__inner")
            // if (dummy.classList.contains("learning")) {
            //     learning--;
            //     learnt++;
            // } else if (dummy.classList.contains("queued")) {
            //     queued--;
            //     learnt++;
            // }
            // mydata["datasets"][0].data[2] = learning
            // mydata["datasets"][0].data[1] = queued
            // mydata["datasets"][0].data[0] = learnt
            // myPieChart.update()
            dummy.classList.remove("learning")
            dummy.classList.remove("queued")
            dummy.classList.add("learnt")
        })
    })
}

for (let i = 0; i < cross.length; i++) {
    cross[i].addEventListener("click", (event) => {
        id = event.currentTarget.id
        console.log(host)
        fetch("/progress/", {
            body: JSON.stringify({ "id": id, "type": "cross" }),
            method: "POST"
        }).then(res => res.json()).then(data => {
            let dummy = document.getElementById(id).querySelector(".card__inner")
            // if (dummy.classList.contains("learnt")) {
            //     learning++;
            //     learnt--;
            // } else if (dummy.classList.contains("queued")) {
            //     queued--;
            //     learning++;
            // }
            // mydata["datasets"][0].data[2] = learning
            // mydata["datasets"][0].data[1] = queued
            // mydata["datasets"][0].data[0] = learnt
            // myPieChart.update()
            dummy.classList.remove("learnt")
            dummy.classList.remove("queued")
            dummy.classList.add("learning")
        })
    })
}


for (let i = 0; i < pause.length; i++) {
    pause[i].addEventListener("click", (event) => {
        id = event.currentTarget.id
        console.log(host)
        fetch("/progress/", {
            body: JSON.stringify({ "id": id, "type": "pause" }),
            method: "POST"
        }).then(res => res.json()).then(data => {
            console.log(123456524)
            let dummy = document.getElementById(id).querySelector(".card__inner")
            // if (dummy.classList.contains("learning")) {
            //     learning--;
            //     queued++;
            // } else if (dummy.classList.contains("learnt")) {
            //     queued++;
            //     learnt--;
            // }
            // console.log(queued)
            // mydata["datasets"][0].data[2] = learning
            // mydata["datasets"][0].data[1] = queued
            // mydata["datasets"][0].data[0] = learnt
            // myPieChart.update()
            dummy.classList.remove("learning")
            dummy.classList.add("queued")
            dummy.classList.remove("learnt")
        })
    })
}





// fetch("/progress/").then(res => res.json()).then(data => {
//     learning = data.learning
//     queued = data.queued
//     learnt = data.learnt
//     console.log(mydata["datasets"][0].data)
//     mydata["datasets"][0].data[2] = learning
//     mydata["datasets"][0].data[1] = queued
//     mydata["datasets"][0].data[0] = learnt
//     myPieChart.update()
//     console.log(data.learning)
// })