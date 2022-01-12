const weatherForm = document.querySelector("form");
const searchRes = document.querySelector("input");
const msgOne = document.getElementById("msg-1");
const msgTwo = document.getElementById("msg-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchRes.value;
  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgOne.textContent = data.error;
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecast;
      }
    });
  });
});
