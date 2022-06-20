const container = document.querySelector(".data-container");
const gnrtBtn = document.querySelector(".generate-btn");
const sortBtns = document.querySelectorAll(".sort-btn");
const delayTime = 300;
//<--------------------------Event listeners------------------------------->
gnrtBtn.addEventListener('click', generate);
sortBtns.forEach(function (sortBtn) {
    if (sortBtn.classList.contains("selection")) {
        sortBtn.addEventListener('click', selectionSort);
    }
    else if (sortBtn.classList.contains("bubble")) {
        sortBtn.addEventListener('click', bubbleSort);
    }
    else if (sortBtn.classList.contains("quick")) {
        sortBtn.addEventListener('click', quickSort);
    }
});
//......................Functions.............................
generateBars();
function generate() {

    //whenever new one required page is reloaded
    window.location.reload();

}
function generateBars() {
    //to get number of bars from the user
    let num = prompt("Enter number of elements:", "20");

    for (let i = 0; i < num; i++) {
        //It generates a random value from 5 to 100
        const value = Math.floor(Math.random() * 100) + 5;

        //To create a div to fit the bar
        const bar = document.createElement("div");

        //adding bar class to the div
        bar.classList.add("bar");

        //To define the height of the bar
        bar.style.height = `${value * 3}px`;

        //to define the width of the bar
        bar.style.width = `${(600 / num) - 2}px`;

        //Translate towards x axis over 30px
        bar.style.transform = `translate(${i * (600 / num)}px)`;

        //label that is the number
        const barLabel = document.createElement("label");

        barLabel.classList.add('bar_id');

        //assigning the value to the label
        barLabel.innerHTML = value;

        //append "label " to "div"
        bar.appendChild(barLabel);

        //append bar to the container
        container.appendChild(bar);
    }// In this way each time a bar is added to the container
};

//<-------------------------------Selection Sort--------------------------------------->

async function selectionSort() {

    //select all the bars
    let bars = document.querySelectorAll(".bar");
    var min_id = 0;

    for (var i = 0; i < bars.length; i++) {
        min_id = i;

        //providing yellow color to the selected element
        bars[i].style.backgroundColor = "yellow";
        for (var j = i + 1; j < bars.length; j++) {
            bars[j].style.backgroundColor = 'darkblue';

            //pause the execution for 300 ms
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delayTime));

            // to access the bar value we used child nodes and stored it in the val1(jth bar)
            var val1 = parseInt(bars[j].childNodes[0].innerHTML);

            //to store the min_id th bar 
            var val2 = parseInt(bars[min_id].childNodes[0].innerHTML);

            //compare val1 and val2
            if (val1 < val2) {
                //this is to change the color only
                if (min_id !== i) {
                    //skyblue color is given to the min_id th bar
                    bars[min_id].style.backgroundColor = "rgb(24,190,255)";
                }
                min_id = j;
            }
            else {
                //this is just to give the color to the bar
                bars[j].style.backgroundColor = "rgb(24,190,255)";
            }
        }
        // //swapping the elements (min_id,i)
        // var temp1=bars[min_id].style.height;//(temp=min_id)-height
        // var temp2=bars[min_id].childNodes[0].innerText;//change in html (that is bar child node--->barlabel->text)
        // bars[min_id].style.height=bars[i].style.height;//min_id=i
        // bars[min_id].childNodes[0].innerText=bars[i].childNodes[0].innerText;//change in html
        // bars[i].style.height=temp1;//i=temp
        // bars[i].childNodes[0].innerText=temp2;//same change in html
        //new ES-6 Feature: [a,b]=[b,a](swapping)
        [bars[min_id].style.height, bars[i].style.height] = [bars[i].style.height, bars[min_id].style.height];//
        [bars[min_id].childNodes[0].innerText, bars[i].childNodes[0].innerText] = [bars[i].childNodes[0].innerText, bars[min_id].childNodes[0].innerText];
        //pause the execution for 300 ms
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delayTime));
        // Provide skyblue color to the (min-idx)th bar
        bars[min_id].style.backgroundColor = " rgb(24, 190, 255)";

        // Provide lightgreen color to the ith bar
        bars[i].style.backgroundColor = "rgb(49, 226, 13)";

    }
}

//<---------------------------Bubble Sort------------------------------------>
async function bubbleSort() {
    let bars = document.querySelectorAll('.bar');
    for (var i = 0; i < bars.length - 1; i++) {
        for (var j = 0; j < bars.length - i - 1; j++) {
            bars[j + 1].style.backgroundColor = "black";
            bars[j].style.backgroundColor = "darkblue";
            //pause the execution for 300 ms
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delayTime));
            let val1 = parseInt(bars[j].childNodes[0].innerHTML);
            let val2 = parseInt(bars[j + 1].childNodes[0].innerHTML);

            if (val1 > val2) {
                //swapping
                [bars[j].style.height, bars[j + 1].style.height] = [bars[j + 1].style.height, bars[j].style.height];
                [bars[j].childNodes[0].innerText, bars[j + 1].childNodes[0].innerText] = [bars[j + 1].childNodes[0].innerText, bars[j].childNodes[0].innerText];
                //pause the execution for 300 ms
                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                    }, delayTime));
            }

        }
        //changing the sorted element to green
        bars[j].style.backgroundColor = "rgb(49, 226, 13)";
    }
    bars[0].style.backgroundColor = "rgb(49, 226, 13)";
}

//<-----------------------------Quick Sort------------------------------------->
async function quickSort() {
    //select all the bars
    let bars = document.querySelectorAll(".bar");
    let low = 0;
    let high = bars.length - 1;
    sort(bars, low, high);
}
async function sort(bars, low, high) {
    if (low < high) {
        let partitionIndex = await (partition(bars, low, high));
        //pivot element is sorted,so it is changed to green color
        bars[partitionIndex].style.backgroundColor = "rgb(49, 226, 13)";
        sort(bars, low, partitionIndex - 1);
        sort(bars, partitionIndex + 1, high);
        bars[low].style.backgroundColor = "rgb(49, 226, 13)";
        bars[high].style.backgroundColor = "rgb(49, 226, 13)";
    }
}
async function partition(bars, low, high) {
    let pivotValue = parseInt(bars[high].childNodes[0].innerText);
    //here we are assuming the last element of the array as pivotElement
    bars[high].style.backgroundColor = "yellow";
    //here pivot element is colored yellow
    let i = low - 1;
    //index of the smaller element
    for (var j = low; j <= high - 1; j++) {
        let val = parseInt(bars[j].childNodes[0].innerText);
        //taken value to compare with pivot element
        if (val < pivotValue) {
            // if it is greater than pivot value it changes the color to dark blue
            bars[j].style.backgroundColor = "darkblue";
            i++;
            //swapping
            [bars[i].style.height, bars[j].style.height] = [bars[j].style.height, bars[i].style.height];//exchanging heights first
            [bars[i].childNodes[0].innerText, bars[j].childNodes[0].innerText] = [bars[j].childNodes[0].innerText, bars[i].childNodes[0].innerText];//then exchanging their values
            //pause the execution for delay
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delayTime));
        }

    }
    //swapping to get the pivot element to correct position
    [bars[i + 1].style.height, bars[high].style.height] = [bars[high].style.height, bars[i + 1].style.height];//exchanging heights first
    [bars[i + 1].childNodes[0].innerText, bars[high].childNodes[0].innerText] = [bars[high].childNodes[0].innerText, bars[i + 1].childNodes[0].innerText];//then exchanging their values
    //pause the execution for delay
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, delayTime));
    return (i + 1);
}