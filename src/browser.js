const url = "https://wagon-garage-api.herokuapp.com/jojo/cars";
const carsList = document.querySelector(".cars-list");

const createCar = (brand, model, owner) => {
  return `<div class="car">
          <div class="car-image">
            <img src="images/white_logo_black_square.png" alt="">
          </div>
          <div class="car-info">
            <h4>${brand} - ${model}</h4>
            <p><strong>Owner:</strong> ${owner}</p>
          </div>
        </div>`
};

fetch(url)
  .then(response => response.json())
  .then((data) => {
    data.forEach((car) => {
      carsList.insertAdjacentHTML("beforeend", createCar(car.brand, car.model, car.owner));
    });
  });

const btn = document.querySelector(".btn-cta");
btn.addEventListener("click", (event) => {
  const inputs = document.querySelectorAll(".form-control");
  const data =   {
    "brand": inputs[0].value,
    "model": inputs[1].value,
    "owner": inputs[2].value,
    "plate": "123AZ56"
  };
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    carsList.insertAdjacentHTML("beforeend", createCar(data.brand, data.model, data.owner));
  });
});

