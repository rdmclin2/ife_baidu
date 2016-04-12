var queue = [];

function renderNums() {
    var divNums = document.getElementById("nums");
    var content = "";
    queue.forEach(function(num) {
        content += "<span class='cube'>" + num + "</span>";
    });
    divNums.innerHTML = content;
}

function validate(value) {
    var reg = /^[\u4E00-\uFA29A-Za-z\d\r,，、\s\t]+$/;
    if (!reg.test(value)) {
        alert("请输入正确的值");
        return false;
    }
    return true;
}

function initButtons() {
    var btnLeftin = document.getElementById("btn-leftin");
    var btnRightin = document.getElementById("btn-rightin");
    var btnLeftout = document.getElementById("btn-leftout");
    var btnRightout = document.getElementById("btn-rightout");
    var btnSearch = document.getElementById("btn-search");

    var inputNum = document.getElementById("num");

    var inputSearch = document.getElementById("input-search");

    btnSearch.onclick = function() {
        var searchValue = inputSearch.value.trim();
        if(!searchValue){
            return ;
        }
        var divNums = document.getElementById("nums");
        var content = "";
        queue.forEach(function(value) {
            if(value.indexOf(searchValue) !== -1){
                content += "<span class='cube special'>" + value + "</span>";
            }else{
                content += "<span class='cube'>" + value + "</span>";
            }
        });
        divNums.innerHTML = content;
    }


    btnLeftin.onclick = function() {
        var value = inputNum.value.trim();
        if (validate(value)) {
            var values = value.split(/[\r,，、\s\t]+/);
            for (var i = values.length - 1; i >= 0; i--) {
                queue.unshift(values[i]);
            }
            renderNums();
        }
    }

    btnRightin.onclick = function() {
        var value = inputNum.value.trim();
        if (validate(value)) {
            var values = value.split(/[\r,，、\s\t]+/);
            for (var a of values) {
                queue.push(a);
            }
            renderNums();
        }
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
