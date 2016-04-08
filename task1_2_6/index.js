var queue = [];

function renderNums() {
    var divNums = document.getElementById("nums");
    var content = "";
    queue.forEach(function(num) {
        content += "<span class='cube'>" + num + "</span>";
    });
    divNums.innerHTML = content;
}

function initButtons() {
    var btnLeftin = document.getElementById("btn-leftin");
    var btnRightin = document.getElementById("btn-rightin");
    var btnLeftout = document.getElementById("btn-leftout");
    var btnRightout = document.getElementById("btn-rightout");

    var inputNum = document.getElementById("num");


    btnLeftin.onclick = function() {
        var value = inputNum.value.trim();
        if (!/^\d+$/.test(value)) {
            alert("请输入数字");
            return;
        }
        queue.unshift(value);
        renderNums();
    }

    btnRightin.onclick = function() {
        var value = inputNum.value.trim();
        if (!/^\d+$/.test(value)) {
            alert("请输入数字");
            return;
        }
        queue.push(value);
        renderNums();
    }

    btnLeftout.onclick = function() {
        var value = queue.shift();
        if (value) {
            alert(value);
            renderNums();
        }
    }

    btnRightout.onclick = function() {
        var value = queue.pop();
        if (value) {
            alert(value);
            renderNums();
        }
    }
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
}

window.onload = init;
