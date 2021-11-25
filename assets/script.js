const section = document.querySelector("section");
const cardsPilot = document.querySelector(".pilots-area");
const cardsStarships = document.querySelector(".spaceships-cards");
const body = document.querySelector("body");
const main = document.querySelector("main");
const selectButton = document.querySelectorAll(".select--button");
const sectionTitle = document.querySelector(".section--title");
const changeSection = document.querySelector("#change--section");


Array.from(selectButton).map((item) => {
  item.addEventListener("click", () => {
    switch (item.id) {
      case "pilots":
        cardsStarships.style.opacity = '0';
        cardsStarships.style.height = '0';

        cardsPilot.style.height = 'auto';
        cardsPilot.style.opacity = '1';

        sectionTitle.innerHTML = "pilots";
        changeSection.id = "spaceships";
        changeSection.innerHTML = "show starships";
        break;
      case "spaceships":
        cardsPilot.style.opacity = '0';
        cardsPilot.style.height = '0';

        cardsStarships.style.height = 'auto';
        cardsStarships.style.opacity = '1';

        sectionTitle.innerHTML = "starships";
        changeSection.id = "pilots";
        changeSection.innerHTML = "show pilots";
        break;
    }

    main.style.marginTop = "-100vh";
    section.style.marginTop = "0";
    document.querySelector('.slider').style.height = 'auto';
    body.style.backgroundImage = "linear-gradient(#1F2738, #000)";
  });
});

const showData = (results, classe) => {
  results.map((item) => {
    let cardItem = document.querySelector(".models .card-item").cloneNode(true);
    const cardImage = cardItem.querySelector('img');
    let li = ''
    switch(classe){
      case ".pilots-area":
        li+=`<li><strong>Height:</strong> ${item.height}</li>
            <li><strong>Mass:</strong> ${item.mass}</li>
            <li><strong>Hair Color:</strong> ${item.hair_color}</li>
            <li><strong>Skin Color:</strong> ${item.skin_color}</li>
            <li><strong>Eye Color:</strong> ${item.eye_color}</li>`
            cardImage.src = "../images/luke.png";
        break;
      case ".spaceships-cards":
        li+=`<li><strong>Model:</strong> ${item.model}</li>
            <li><strong>Manufacturer:</strong> ${item.manufacturer}</li>
            <li><strong>Cost in Credits:</strong> ${item.cost_in_credits}</li>
            <li><strong>Length:</strong> ${item.length}</li>
            <li><strong>Max Atmosphering Speed:</strong> ${item.max_atmosphering_speed}</li>`
            cardImage.src = "../images/starship.png";
            cardImage.style.paddingTop = '10px'
        break;
    }

    cardItem.querySelector(".card-title").innerHTML = item.name;

    cardItem.querySelector(".models--list").innerHTML = li;

    document.querySelector(`${classe}`).append(cardItem);
  });
};

const options = {
  method: "GET",
  mode: "cors",
  cache: "default",
};


fetch("https://swapi.dev/api/people", options)
  .then((response) => {
    response.json().then((data) => {
      showData(data.results, ".pilots-area");
    });
  })

  .catch((error) => console.log(error));

fetch("https://swapi.dev/api/starships", options)
  .then((response) => {
    response.json().then((data) => {
      showData(data.results, ".spaceships-cards");
    });
  })
  .catch((error) => console.log(error));
