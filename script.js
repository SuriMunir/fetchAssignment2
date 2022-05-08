//Building an HTML Element
document.body.innerHTML = `
 <div class="heading">
      <img
        class="icon"
        src="https://upload.wikimedia.org/wikipedia/en/6/6a/Nobel_medal.png"
      />
      <h1>Noble Laureates Database</h1>
    </div>
    <div class="container mt-5 text-center">
    <button class="btn btn-primary " id="fetchBtn">Get Laureates</button>    
    </div>
    <div id="main" class="container mt-5"></div>
`;

let urlLaureates = 'https://api.nobelprize.org/2.1/laureates?limit=30';
const fetchBtn = document.querySelector('#fetchBtn');
const resultContainer = document.querySelector('#main');

async function getData() {
  try {
    const response = await fetch(urlLaureates);
    const data = await response.json();
    let dataArray = data.laureates;
    resultContainer.innerHTML = '';
    displayData(dataArray);
  } catch (error) {
    console.log(error);
  }
}

fetchBtn.addEventListener('click', getData);

function displayData(data) {
  let resultData = data
    .map((ele) => {
      return `<div class="card card-shadow" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">${ele.fullName.en}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Birth: ${ele.birth.date}</h6>
          <p class="card-text text-muted">Award Year: ${ele.nobelPrizes[0].awardYear}</p>
          <p class="card-text text-muted">Award Category: ${ele.nobelPrizes[0].category.en}</p>
          <p class="card-text text-muted">
            Award : ${ele.nobelPrizes[0].categoryFullName.en}l
          </p>
          <p class="card-text text-muted">
            Reason : ${ele.nobelPrizes[0].motivation.en}
          </p>
          <p class="card-text text-muted">Award Prize: $ ${ele.nobelPrizes[0].prizeAmount}</p>
          <p class="card-text text-muted">Award Portion: ${ele.nobelPrizes[0].portion}</p>

          <a href="${ele.nobelPrizes[0].links[1].href}" class="card-link text-uppercase">${ele.givenName.en}</a>
          <a href="${ele.nobelPrizes[0].links[2].href}" class="card-link text-uppercase">The Prize</a>
        </div>
      </div>`;
    })
    .join('');
  resultContainer.innerHTML = resultData;
}
