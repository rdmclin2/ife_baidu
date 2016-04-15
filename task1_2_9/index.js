var tagQueue = [];
var interestQueue = [];

function renderInterests() {
    var divInterests = document.getElementById("interests");
    var content = "";
    interestQueue.forEach(function(num) {
        content += "<span class='interest'>" + num + "</span>";
    });
    divInterests.innerHTML = content;
}

function renderTags() {
    var divTags = document.getElementById("tags");
    var content = "";
    tagQueue.forEach(function(tag) {
        content += "<span class='cube'>" + tag + "</span>";
    });
    divTags.innerHTML = content;
}

function initButtons() {
    var btnInterest = document.getElementById("btn-interest");
    var inputTag = document.getElementById("tag");
    var textareaInterest = document.getElementById("ta-interest");


    inputTag.onkeyup = function(e) {
        var value = inputTag.value;
        if (e.keyCode === 13) {
            value = value.trim();
            inputTag.value = "";
        } else if (e.keyCode === 188 || e.keyCode === 32) {
            value = value.substring(0, value.length - 1);
            inputTag.value = "";
        } else {
            return;
        }
        if (value && tagQueue.indexOf(value) === -1) {
            tagQueue.push(value);
            if (tagQueue.length > 10) {
                tagQueue.shift();
            }
            renderTags();
        }
    }

    btnInterest.onclick = function() {
        var value = textareaInterest.value.trim();
        var values = value.split(/[\r,，、\s\t]+/);
        for (var i = 0; i < values.length; i++){
            values[i] = values[i].trim();
            if(values[i] && interestQueue.indexOf(values[i]) === -1){
                interestQueue.push(values[i]);
                if (interestQueue.length > 10) {
                     interestQueue.shift();
                }
            }
        }
        renderInterests();
    };
}

function initTagEvents() {
    var divTags = document.getElementById("tags");

    divTags.onclick = function(e) {
        var node = e.target;
        if (node && node.nodeName.toUpperCase() === "SPAN") {
            var index = [].indexOf.call(node.parentNode.children, node);
            tagQueue.splice(index, 1);
            renderTags();
        }
    }

    divTags.onmouseover = function(e) {
        var node = e.target;
        if (node && node.nodeName.toUpperCase() === "SPAN") {
            node.innerText = "点击删除 " + node.innerText;
            node.classList.add('tag-remove');
        }
    }

    divTags.onmouseout = function(e) {
        var node = e.target;
        if (node && node.nodeName.toUpperCase() === "SPAN") {
            node.innerText = node.innerText.split(" ")[1];
            node.classList.remove('tag-remove');
        }
    }

}



function init() {
    initButtons();
    initTagEvents();
}

window.onload = init;
