$(document).ready(function() {

    $.ajax({
        url: "elements.json",
        success: function(data) {
            localStorage.setItem("left", JSON.stringify(data));
        },
        error: function(err) {
            console.log(err);
        }
    });

    localStorage.removeItem("right");

    let arrayLeft = JSON.parse(localStorage.getItem("left"));
    displayElements(arrayLeft, "left");


    $("#add").click(function() {
        let checked = [];
        let unchecked = [];
        let elementsArray = JSON.parse(localStorage.getItem("left"));

        $(".cbx:checked").each(function() {
            checked.push($(this).attr("data"));
        });

        let allIds = [];
        elementsArray.forEach(function(el) {
            allIds.push(el.id);
        });

        unchecked = allIds.filter(function(id) {
            if (!checked.includes(id)) {
                return true;
            }
        });

        let rightArray = [];
        if (localStorage.getItem("right")) {
            let elementsAlreadyin = JSON.parse(localStorage.getItem("right"));

            rightArray = elementsArray.filter(function(el) {
                for (let num of checked) {
                    if (el.id == num) {
                        return true;
                    }
                }
            });

            elementsAlreadyin.forEach(function(el) {
                rightArray.push(el);
            });
        } else {
            rightArray = elementsArray.filter(function(el) {
                for (let num of checked) {
                    if (el.id == num) {
                        return true;
                    }
                }
            });
        }

        let leftArray = elementsArray.filter(function(el) {
            for (let num of unchecked) {
                if (el.id == num) {
                    return true;
                }
            }
        });

        sortElements(rightArray);

        displayElements(leftArray, "left");
        displayElements(rightArray, "right");

        localStorage.setItem("left", JSON.stringify(leftArray));
        localStorage.setItem("right", JSON.stringify(rightArray));
    });

    $("#remove").click(function() {

        let checked = [];
        let unchecked = [];
        let elementsArray = JSON.parse(localStorage.getItem("right"));

        $(".cbx:checked").each(function() {
            checked.push($(this).attr("data"));
        });

        let allIds = [];
        elementsArray.forEach(function(el) {
            allIds.push(el.id);
        });

        unchecked = allIds.filter(function(id) {
            if (!checked.includes(id)) {
                return true;
            }
        });

        let leftArray = [];
        if (localStorage.getItem("left")) {
            let elementsAlreadyin = JSON.parse(localStorage.getItem("left"));

            leftArray = elementsArray.filter(function(el) {
                for (let num of checked) {
                    if (el.id == num) {
                        return true;
                    }
                }
            });

            elementsAlreadyin.forEach(function(el) {
                leftArray.push(el);
            });
        } else {
            leftArray = elementsArray.filter(function(el) {
                for (let num of checked) {
                    if (el.id == num) {
                        return true;
                    }
                }
            });
        }

        let rightArray = elementsArray.filter(function(el) {
            for (let num of unchecked) {
                if (el.id == num) {
                    return true;
                }
            }
        });

        sortElements(leftArray);

        displayElements(leftArray, "left");
        displayElements(rightArray, "right");

        localStorage.setItem("left", JSON.stringify(leftArray));
        localStorage.setItem("right", JSON.stringify(rightArray));
    });

    $("#submit").click(function() {
        let arrayToSend = JSON.parse(localStorage.getItem("right"));

        if (arrayToSend) {
            $.ajax({
                url: "obrada.php",
                method: "GET",
                type: "json",
                data: {
                    products: arrayToSend
                },
                success: function(data) {
                    alert("Uspesan unos!");
                },
                error: function(err) {
                    console.error(err);
                }
            });
        } else {
            alert("There must be elements in the cart to proceed.");
        }
    });



});

function sortElements(array) {
    array.sort(function(a, b) {
        if (a.id < b.id) {
            return -1;
        } else if (a.id > b.id) {
            return 1;
        } else {
            return 0;
        }
    });
}

function displayElements(data, location) {
    let ispis = "";

    data.forEach(function(el) {
        ispis += `
            <div class="custom-control custom-checkbox mr-sm-2">
                <input type="checkbox" class="custom-control-input cbx" data="${el.id}" id="${el.id}">
                <label class="custom-control-label"  for="${el.id}">${el.name}</label>
            </div>
        `;
    });

    if (location == "left") {
        $("#listLeft").html(ispis);
    } else if (location == "right") {
        $("#listRight").html(ispis);
    }
}