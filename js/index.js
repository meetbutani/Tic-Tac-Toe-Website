let boxlist = ["box-1", "box-2", "box-3", "box-4", "box-5", "box-6", "box-7", "box-8", "box-9"];
let possible_solutions = [[1, 2, 3, 1], [4, 5, 6, 2], [7, 8, 9, 3], [1, 4, 7, 4], [2, 5, 8, 5], [3, 6, 9, 6], [1, 5, 9, 7], [3, 5, 7, 8]];

let turn = 1;
let count = 0;

document.getElementById("playerNo").innerHTML = "&nbsp;" + turn;

for (const box of boxlist) {
    let boxObj = document.getElementById(box);
    boxObj.onclick = () => {
        count++;
        if (turn == 1) {
            turn = 2;
            boxObj.innerHTML = "X";
            if (checkSolution("X")) {
                document.getElementById("winner").innerHTML = "Player 1 Won the game";
            }
        }
        else {
            turn = 1;
            boxObj.innerHTML = "O";
            if (checkSolution("O")) {
                document.getElementById("winner").innerHTML = "Player 2 Won the game";
            }
        }
        
        disableBoxClick(boxObj);
        document.getElementById("playerNo").innerHTML = "&nbsp;" + turn;
    }
}

document.getElementById("reset-btn").onclick = () => {
    window.location.reload();
};

function checkSolution(player) {
    for (const arr of possible_solutions) {
        let box_1 = document.getElementById("box-" + arr[0]);
        let box_2 = document.getElementById("box-" + arr[1]);
        let box_3 = document.getElementById("box-" + arr[2]);

        if (box_1.innerHTML == player && box_2.innerHTML == player && box_3.innerHTML == player) {
            box_1.style.color = "red";
            box_2.style.color = "red";
            box_3.style.color = "red";

            document.getElementById("turn").style.display = "none";
            document.getElementById("winner").style.display = "block";
            document.getElementById("line-"+arr[3]).style.display = "block";
            let cf = document.getElementsByClassName("crossfill");
            for(let e of cf){
                e.style.zIndex = 1;
            }
            
            let disabledBoxList = Array(boxlist)[0];
            disabledBoxList.splice(arr[2] - 1, 1);
            disabledBoxList.splice(arr[1] - 1, 1);
            disabledBoxList.splice(arr[0] - 1, 1);
            
            for (const box of disabledBoxList) {
                disableBoxClick(document.getElementById(box));
            }
            
            return true;
        }
        else if (count == 9) {
            document.getElementById("turn").style.display = "none";
            document.getElementById("winner").style.display = "block";
            document.getElementById("winner").innerHTML = "Game is Draw";
        }
    }
}

function disableBoxClick(box) {
    box.onclick = () => {};
    box.classList.remove("box_hover");
}

// materializeEffect(event, boxObj);

// function materializeEffect(event, box) {
//     const circle = document.createElement('div');
//     const x = event.layerX;
//     const y = event.layerY;
//     circle.classList.add('circle');
//     circle.style.left = `${x}px`;
//     circle.style.top = `${y}px`;
//     box.appendChild(circle);
// }