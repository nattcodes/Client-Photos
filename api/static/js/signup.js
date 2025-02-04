var user = {}; // Declare user globally

function submit_new_user() {
    user.username = document.getElementById("username").value;
    user.password = document.getElementById("password").value;
    user.email = document.getElementById("email").value;
    user.first = document.getElementById("first").value;
    user.last = document.getElementById("last").value;
    user.address = document.getElementById("address").value;
    user.city = document.getElementById("city").value;
    user.state = document.getElementById("state").value;
    user.zip = document.getElementById("zip").value;
    user.phone = document.getElementById("phone").value;
    user.country = document.getElementById("country").value;

    let currentLink = window.location.href;
    console.log(window.location.href.substring(0, currentLink.lastIndexOf("/")) + "/createUser");

    let xhr = new XMLHttpRequest();
    xhr.open("POST", window.location.href.substring(0, currentLink.lastIndexOf("/")) + "/createUser");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
            if (xhr.status === 200) {
                alert("User Created!");
            } else {
                alert("Something went wrong :(");
            }
        }
    };
    xhr.send(JSON.stringify(user));

    let newLink = currentLink.substring(0, currentLink.lastIndexOf("/")) + "/login";
    window.location.href = newLink;


}

window.addEventListener("load", function() {
    document.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            submit_new_user();

        }
    });

    fetch('../countries.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const selectElement = document.getElementById("country");
            data.country.map(item => {
                const option = document.createElement('option');
                option.value = item.name;
                option.textContent = item.name;
                selectElement.appendChild(option)
            })
        })
        .catch(error => console.error('Error fetching country data:', error));


});