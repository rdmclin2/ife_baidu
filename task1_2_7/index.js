var queue = [];
var randomNumber = 30;

function renderNums() {
    var divNums = document.getElementById("nums");
    var content = "";
    var height = divNums.offsetHeight;
    queue.forEach(function(num) {
        content += "<span class='cube' " + "style='width: 8px;height:" + (num * 2) + "px;margin-top:" + (height - num * 2) + "px;'></span>";
    });
    divNums.innerHTML = content;
}

function validate(num) {
    if (!/^\d+$/.test(num) || 10 > parseInt(num) || parseInt(num) > 100) {
        alert("请输入10-100之前的数字");
        return false;
    }

    if (queue.length >= 60) {
        alert("元素最多不能超过60个");
        return false;
    }

    return true;
}

function createRandomNumbers() {
    queue = [];
    for (var i = 0; i < randomNumber; i++) {
        var value = 10 + Math.floor(Math.random() * (100 - 10));
        queue.push(value);
    }
    renderNums();

}

function leftIn() {
    var inputNum = document.getElementById("num");
    var value = inputNum.value.trim();
    if (!validate(value)) return;
    value = parseInt(value);
    queue.unshift(value);
    renderNums();
}

function leftOut() {
    var value = queue.shift();
    if (value) {
        alert(value);
        renderNums();
    }
}

function rightOut() {
    var value = queue.pop();
    if (value) {
        alert(value);
        renderNums();
    }
}

function rightIn() {
    var inputNum = document.getElementById("num");
    var value = inputNum.value.trim();
    if (!validate(value)) return;
    value = parseInt(value);
    queue.push(value);
    renderNums();
}


function doOneSort(i, j,cnt) {
    setTimeout(function() {
        if (queue[i] > queue[j]) {
            var temp = queue[j];
            queue[j] = queue[i];
            queue[i] = temp;
            renderNums();
        }
    }, 10*cnt);
}

function bubbleSort() {
    var cnt = 0 ;
    for (var i = queue.length - 1; i >= 0; i--) {
        for (var j = 0; j < i; j++) {
            cnt++;    
            doOneSort(j,j+1,cnt);
        }
    }
}


function initButtons() {
    var btnLeftin = document.getElementById("btn-leftin");
    var btnRightin = document.getElementById("btn-rightin");
    var btnLeftout = document.getElementById("btn-leftout");
    var btnRightout = document.getElementById("btn-rightout");
    var btnRandom = document.getElementById("btn-random");
    var btnBubble = document.getElementById("btn-bubble");

    btnRandom.onclick = createRandomNumbers;
    btnLeftin.onclick = leftIn;
    btnRightin.onclick = rightIn;
    btnLeftout.onclick = leftOut;
    btnRightout.onclick = rightOut;
    btnBubble.onclick = bubbleSort;
}



function initClickRemove() {
    var divNums = document.getElementById("nums");

    divNums.onclick = function(e) {
        var node = e.target;
        if (node && node.nodeName.toUpperCase() === "SPAN") {
            var index = [].indexOf.call(node.parentNode.children, node);
            queue.splice(index, 1);
            renderNums();
        }
    }
}

function init() {
    initButtons();
    initClickRemove();
    createRandomNumbers();
}

window.onload = init;
