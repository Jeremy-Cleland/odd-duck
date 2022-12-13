'use strict';


// ******* GLOBALS *******
let productArray = [];
let votingRounds = 15;

//  ****** DOM WINDOWS *******

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let viewResultsBtn = document.getElementById('poll-result-btn');
let pollResults = document.getElementById('poll-result-container');


// ***** CONSTRUCTOR FUNCTION ******

function Product(name, imgExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;

}
// ***** HELPER FUNCTIONS / UTILITIES *****
function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImg() {
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();

  while (imgOneIndex === imgTwoIndex |imgTwoIndex === imgThreeIndex || imgOneIndex === imgThreeIndex) {
    if (imgOneIndex === imgTwoIndex) {
      imgTwoIndex = randomIndex();
    } if (imgOneIndex === imgThreeIndex) {
      imgOneIndex = randomIndex();
    } if (imgTwoIndex === imgThreeIndex) {
      imgTwoIndex = randomIndex();
    }
  }

  imgOne.src = productArray[imgOneIndex].img;
  imgOne.title = productArray[imgOneIndex].name;
  imgOne.alt = `This is an image of ${productArray[imgOneIndex].name}`;

  imgTwo.src = productArray[imgTwoIndex].img;
  imgTwo.title = productArray[imgTwoIndex].name;
  imgOne.alt = `This is an image of ${productArray[imgTwoIndex].name}`;

  imgThree.src = productArray[imgThreeIndex].img;
  imgThree.title = productArray[imgThreeIndex].name;
  imgOne.alt = `This is an image of ${productArray[imgThreeIndex].name}`;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;

}

// **** EVENT HANDLERS *****

function handleClick(event) {

  let imgClicked = event.target.title;
  console.log(imgClicked);

  for (let i = 0; i < productArray.length; i++) {
    if(imgClicked === productArray[i].name) {
      productArray[i].votes++;
    }
  }
  votingRounds--;

  renderImg();

  if(votingRounds === 0) {
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults() {
  if(votingRounds === 0) {
    for(let i = 0; i < productArray.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent = `${productArray[i].name} | views: ${productArray[i].views} | Votes: ${productArray[i].votes}`;
      pollResults.appendChild(liElem);
    }
    viewResultsBtn.removeEventListener('click', handleShowResults);
  }
}

// **** EXECUTABLE CODE *****

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let waterCan = new Product('water-can');
let wineGlass = new Product('wine-glass');


productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, tauntaun, unicorn, waterCan, wineGlass);

renderImg();

imgContainer.addEventListener('click', handleClick);
viewResultsBtn.addEventListener('click', handleShowResults);
