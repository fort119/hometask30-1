console.log(window.location.search);
const categories = document.querySelector(".categories");
const links = document.querySelectorAll('.categories__link');
const listOfGoods = document.querySelector(".list-of-goods");
console.log(listOfGoods);
const infoAboutGoods = document.querySelector(".info-about-goods");
const checkedElements = [];
const shopInner = document.querySelector(".shop__blocks");
const shopSection = document.querySelector(".shop");
console.log(links);

const categoriesList = `
   <h1 class="categories__caption">Categories</h1>
   <ul>
     <li>
       <a class="categories__link" href="?bikes">bikes</a>
     </li>
     <li>
       <a class="categories__link" href="?scooters">scooters</a>
     </li>
     <li>
       <a class="categories__link" href="?rollers">rollers</a>
     </li>
   </ul>
`
categories.innerHTML = categoriesList;

const data = {
  bikes: [
    { name: 'BMX', price: 200, about: 'good for tricks', picture: 'bmx.jpg' },
    { name: 'MTB', price: 400, about: 'good for hillclimb', picture: 'mtb.jpg' },
    { name: 'Sport', price: 100, about: 'good for racing', picture: 'sportBike2.jpg' }
  ],
  scooters: [
    { name: 'sport', price: 23, about: 'good for sport', picture: 'scooter1.jpeg' },
    { name: 'super-sport', price: 20, about: 'very good for sport', picture: 'scooter2.jpeg' },
    { name: 'ultra-sport', price: 41, about: 'extremely good for sport', picture: 'scooter3.jpeg' },
    { name: 'cruisers', price: 7, about: 'good for cruising around', picture: 'scooter4.jpg' }
  ],
  rollers: [
    { name: 'with brakes', price: 23, about: 'good for begginers', picture: 'rollers1.jpg' },
    { name: 'without brakes', price: 20, about: 'good for professionals', picture: 'rollers2.jpg' },
    { name: 'blue', price: 41, about: 'nice blue color', picture: 'rollers3.jpg' },
    { name: 'pink', price: 7, about: 'nice pink color', picture: 'rollers4.jpg' }
  ]
}

const goodsCategory = window.location.search.replace("?", "");
console.log(goodsCategory);

function check1() {
  if (goodsCategory) {
    const listOfGoodsFromCategory = data[goodsCategory];
    const goodsNames = listOfGoodsFromCategory.map(goods => goods.name);

    console.log(goodsNames);
    listOfGoods.innerHTML = "";
    goodsNames.forEach(name => {
      const div = document.createElement('div');
      div.classList.add("category__item")
      div.innerHTML = `
      <p class="category__item-descr">${name}</p>
      <div><img src="assets/images/${listOfGoodsFromCategory.find(product => product.name === name).picture}" width = "200px" height = "200px" alt = "picture"></div>
      <div class="category__item-btn">
        <button class = "btn">Details</button>
      </div>
      `;

      listOfGoods.appendChild(div);

      //
      const buttons = document.querySelectorAll('.btn');
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const buyBtn = document.createElement('button');
          buyBtn.textContent = 'Buy';
          buyBtn.addEventListener('click', function () {
            const productInfo = listOfGoodsFromCategory.find(product => product.name === name);
            buyBtn.classList.add("-hidden");
            formBuilder(infoAboutGoods, labelBuilder, inputBuider);
            const form1 = document.querySelector(".form1");
            console.log(form1);
            form1.addEventListener("submit", function (e) {
              console.log(productInfo.name);
              e.preventDefault();
              const fnameInput = document.getElementById("fname");
              const fnameAmount = document.getElementById("postStorage");
              const fnamePost = document.getElementById("number");
              checkRequiredFieldsAndShowInfoAboutOrder(productInfo, fnameInput, fnameAmount, fnamePost, form1);

            })
          })


          const aboutProduct = document.createElement('div');
          aboutProduct.classList.add('product-about');
          aboutProduct.innerHTML = `
          <h2>${name}</h2>
          <p>Price: ${listOfGoodsFromCategory.find(product => product.name === name).price}$</p>
          <div><img src="assets/images/${listOfGoodsFromCategory.find(product => product.name === name).picture}" width = "256px" alt = "pcture"></div>
          <p>About: ${listOfGoodsFromCategory.find(product => product.name === name).about}</p>
          `;
          aboutProduct.appendChild(buyBtn);

          div.addEventListener('click', () => {
            infoAboutGoods.textContent = '';
            infoAboutGoods.appendChild(aboutProduct);
          });
        })

      })
    })
  }
}



//function form builder

function formBuilder(parent, callbackForLabel, callbackForInput) {
  //wrapper
  const formWrapper = document.createElement("div");
  formWrapper.classList.add("form-wrapper");

  //form
  const forForGoods = document.createElement("form");
  forForGoods.classList.add("form1");
  forForGoods.setAttribute("action", "#");

  //form item div
  const formItemDiv = document.createElement("div");
  formItemDiv.classList.add("form__item");

  // name and surname input
  const labelForNameInput = callbackForLabel("fname", "ПІБ:");
  const inputForName = callbackForInput("text", "fname", "fname", "required");
  let cloneOfDivForName = formItemDiv.cloneNode(true);

  //postStorage input
  const labelForPostInput = callbackForLabel("postStorage", "Enter post storage:");
  const inputForPost = callbackForInput("text", "postStorage", "postStorage", "required");
  let cloneOfDivForPost = formItemDiv.cloneNode(true);

  //cash or card radio set
  const divForPaymentRadio = document.createElement("div");
  divForPaymentRadio.classList.add("payment-radio__inner");
  const radioSetForPayment = `
    <fieldset>
      <legend>Способ оплаты:</legend>

      <div>
        <label>
          <input type="radio" name="pay" value="cash" checked>карта
        </label>
      </div>
      <div>
        <label>
          <input type="radio" name="pay" value="card">наложка
        </label>
      </div>

      </fieldset>
  `
  divForPaymentRadio.innerHTML = radioSetForPayment;

  //city choice select
  const divForCitySelect = document.createElement("div");
  divForCitySelect.classList.add("city-select__inner");
  const citySelect = `
      <label for="selectCity">Choose your city:</label>
      <select name="selectCity" id="selectCity">
        <option value="Odessa" selected>Odessa</option>
        <option value="Kiyv">Kiyv</option>
        <option value="Dnipro">Dnipro</option>
      </select>
 `
  divForCitySelect.innerHTML = citySelect;
  //amount of goods to order input
  const labelForAmount = callbackForLabel("amountOfpieces", "amountOfpieces:");
  const inputForAmount = callbackForInput("number", "number", "amountOfpieces", "required", "100", "1");
  let cloneOfDivForAmount = formItemDiv.cloneNode(true);

  //comment to order textarea
  const labelForComment = callbackForLabel("comment", "comment:");
  const textareaComment = document.createElement("textarea");
  textareaComment.setAttribute("name", "comment");
  textareaComment.setAttribute("rows", "5");
  textareaComment.setAttribute("cols", "33");
  textareaComment.style.display = "block";
  let cloneOfDivForComment = formItemDiv.cloneNode(true);

  //submit button
  const submitBtn = callbackForInput("submit");
  submitBtn.classList.add("submit-btn");

  //creating form
  formWrapper.appendChild(forForGoods);
  cloneOfDivForName.append(labelForNameInput, inputForName)
  forForGoods.appendChild(cloneOfDivForName);
  forForGoods.appendChild(divForCitySelect);
  cloneOfDivForPost.append(labelForPostInput, inputForPost)
  forForGoods.appendChild(cloneOfDivForPost);
  forForGoods.appendChild(divForPaymentRadio);
  cloneOfDivForAmount.append(labelForAmount, inputForAmount);
  forForGoods.appendChild(cloneOfDivForAmount);
  cloneOfDivForComment.append(labelForComment, textareaComment);
  forForGoods.appendChild(cloneOfDivForComment);
  forForGoods.appendChild(submitBtn);
  parent.appendChild(formWrapper);
}






//function input builder
let labelBuilder = function (labelFor, labelText) {
  const formLabel = document.createElement("label");
  formLabel.setAttribute("for", labelFor);
  formLabel.textContent = labelText;
  return formLabel;
};


let inputBuider = function (inputType, inputId, inputName, inputPlaceHolder, max, min) {
  const formInput = document.createElement("input");
  formInput.setAttribute("type", inputType);
  formInput.setAttribute("id", inputId);
  formInput.setAttribute("name", inputName);
  formInput.setAttribute("placeholder", inputPlaceHolder);
  formInput.setAttribute("max", max);
  formInput.setAttribute("min", min);
  return formInput;
}

check1();

//function check fields
function checkRequiredFieldsAndShowInfoAboutOrder(nameOfGood, required1, required2, required3, form) {
  const checkedInfo = [];
  if (!required1.value && !required2.value && !required3.value) {
    const warning = document.createElement("p");
    warning.classList.add("warning");
    warning.innerHTML = `
    please, fill all required fields
    `
    form.append(warning);
    return;
  }
  showOrder(nameOfGood, required1, required2, required3);
  checkedInfo.push(nameOfGood.name);
  checkedInfo.push(required1.value);
  checkedInfo.push(required2.value);
  checkedInfo.push(required3.value);
  console.log(checkedInfo);
  return checkedInfo;
}

//show info about an order
function showOrder(nameOfGood, nameOfClient, postDep, amountOfGoods) {
  const shopWrapper = document.querySelector(".form-wrapper")
  const form1 = document.querySelector(".form1");
  form1.classList.add("-hidden");
  shopWrapper.innerHTML = `
  <table class = "table">
      <tr>
        <td>Your name and surname: ${nameOfClient.value}</td
      </tr>
      <tr>
        <td>You have ordered: ${nameOfGood.name}</td
      </tr>
      <tr>
        <td>Your post department: ${postDep.value}</td
      </tr>
      <tr>
         <td>Your amount: ${amountOfGoods.value}</td
      </tr>
    </table>
`
}