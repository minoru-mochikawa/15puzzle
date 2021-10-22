var positionArray = [];
var emptyTileNum = 15;

$(document).on("click", ".startBtn", function() {
    console.log("start!");
    do {
        makeRandomTiles();
    } while (!checkAbleToSolve());
    drawTiles();
});

function checkAbleToSolve() {
    let count = 0;
    var tmpPositionArray = copyPositionArray();
    for (let i = 0; i < tmpPositionArray.length; i++) {
        if (tmpPositionArray[i].txt == i + 1) {
            continue;
        } else {
            let targetIndex = searchTargetIndex(tmpPositionArray, i);
            swapIndex(tmpPositionArray, i, targetIndex);
            count++;
        }
    }
    if (count % 2 == 0) {
        console.log("count = " + count + ", true!");
        return true;
    }
    console.log("count = " + count + ", false!");
    return false;
}

function copyPositionArray() {
    let tmpPositionArray = [];
    for (let index = 0; index < positionArray.length; index++) {
        tmpPositionArray.push({
            txt: positionArray[index].txt,
            top: positionArray[index].top,
            left: positionArray[index].left,
        });
    }
    return tmpPositionArray;
}

function searchTargetIndex(tmpPositionArray, currentIndex) {
    for (let targetIndex = currentIndex; targetIndex < 16; targetIndex++) {
        if ((tmpPositionArray[targetIndex].txt = currentIndex + 1)) {
            return targetIndex;
        }
    }
}

function swapIndex(tmpPositionArray, currentIndex, targetIndex) {
    let tmp = tmpPositionArray[currentIndex].txt;
    tmpPositionArray[currentIndex].txt = tmpPositionArray[targetIndex].txt;
    tmpPositionArray[targetIndex].txt = tmp;
}

function makeRandomTiles() {
    let randoms = [],
        min = 1,
        max = 16;
    for (let i = min; i <= max; i++) {
        while (true) {
            let tmp = intRandom(min, max);
            if (!randoms.includes(tmp)) {
                randoms.push(tmp);
                if (tmp == max) {
                    positionArray[i - 1].txt = "";
                    emptyTileNum = i - 1;
                } else {
                    positionArray[i - 1].txt = tmp;
                }
                break;
            }
        }
    }
}

function intRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
window.onload = function initTiles() {
    let width = 235;
    let margin = 12;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let topPosition = i * width + margin * (i + 1);
            let leftPosition = j * width + margin * (j + 1);
            positionArray.push({
                txt: i * 4 + j + 1,
                top: topPosition,
                left: leftPosition,
            });
        }
    }

    for (let i = 0; i < 16; i++) {
        let num = i + 1;
        $(".platform").append('<div class="tiles">' + num + "</div>");
    }
    var idName = 0;
    $(".tiles").each(function() {
        $(this).attr("id", idName);
        $(this).css("top", positionArray[idName].top);
        $(this).css("left", positionArray[idName].left);
        if (idName == 15) {
            $(this).text("");
            positionArray[idName].txt = "";
        }
        idName++;
    });
};

$(document).ready(function() {
    console.log("ready!");

    $(".platform").on({
            mouseenter: function() {
                $(this).css("opacity", "0.8");
            },
            mouseleave: function() {
                $(this).css("opacity", "1");
            },
            click: function() {
                swapTiles($(this).attr("id"));
            },
        },
        ".tiles"
    );
});

function swapTiles(tileNumString) {
    let tileNum = parseInt(tileNumString, 10);

    if (checkEmptyTile(tileNum) > -1) {
        console.log("swap");
        let tmp = positionArray[emptyTileNum].txt;
        positionArray[emptyTileNum].txt = positionArray[tileNum].txt;
        positionArray[tileNum].txt = tmp;
        emptyTileNum = tileNum;
        drawTiles();
    }
    checkFinish();
}

function checkFinish() {
    let idName = 0;
    let finishFlag = true;
    $(".tiles").each(function() {
        if (idName < 15 && positionArray[idName].txt != idName + 1) {
            //console.log(positionArray[idName].txt + " != " + (idName + 1));
            finishFlag = false;
            return false;
        }
        idName++;
    });
    if (finishFlag) {
        alert("done!");
    }
}

function checkEmptyTile(tileNum) {
    //console.log("tile num = " + tileNum);
    if (positionArray[tileNum + 4] !== undefined && tileNum + 4 == emptyTileNum) {
        //console.log("swapped tile num = " + emptyTileNum);
        return tileNum + 4;
    } else if (
        positionArray[tileNum - 4] !== undefined &&
        tileNum - 4 == emptyTileNum
    ) {
        //console.log("swapped tile num = " + emptyTileNum);
        return tileNum - 4;
    } else if (
        positionArray[tileNum + 1] !== undefined &&
        tileNum + 1 == emptyTileNum
    ) {
        //console.log("swapped tile num = " + emptyTileNum);
        return tileNum + 1;
    } else if (
        positionArray[tileNum - 1] !== undefined &&
        tileNum - 1 == emptyTileNum
    ) {
        //console.log("swapped tile num = " + emptyTileNum);
        return tileNum - 1;
    } else {
        //console.log("no swapped tile");
        return -1;
    }
}

function drawTiles() {
    var idName = 0;
    $(".tiles").each(function() {
        $(this).text(positionArray[idName].txt);
        $(this).css("top", positionArray[idName].top);
        $(this).css("left", positionArray[idName].left);
        idName++;
    });
}