"use strict";
var selectedCurrentProduct = [];
class subscriptionJS {
    constructor(){
      selectCollection();
      backButton();
      nextButton();
      selectProdutcs();
      funnelAddToCart();
      selectedFrequency();
    }
}

function selectCollection() {
  let collectionSelectButton = document.querySelectorAll(".collection-select-button button");
  collectionSelectButton.forEach((thisBtn) => {
    thisBtn.addEventListener("click", function(){
       this.closest("select-collection").classList.add("d-none");
       let CollectionType = this.dataset.type;
       console.log(CollectionType);
       let collectionAllProducts  = document.querySelectorAll(".funnel-selcted-box-products");
       collectionAllProducts.forEach((products) => {
        let productsType = products.dataset.type;
        console.log(productsType);
        if( CollectionType ==  productsType )
        {
          products.closest("select-products").classList.remove("d-none");
          products.classList.remove("d-none");
        }
        else{
          products.classList.add("d-none");
        }
      });
    });
  });
}






function backButton() {
  let backButton = document.querySelectorAll(".backBtn");
  backButton.forEach((backbtn) => {
    backbtn.addEventListener('click' , function(){
      backbtn.closest(".steps").classList.add("d-none");
      let backStep = backbtn.closest('.steps').dataset.step - 1;
      console.log(backStep);
      document.querySelectorAll(".steps").forEach((Steps) => {
       var allStepsIndex =  Steps.dataset.step;
       console.log(allStepsIndex);
       if(allStepsIndex == backStep ){
        Steps.classList.remove("d-none");
       }
      });
    });
  });
}

function nextButton(){
  let nextButton = document.querySelectorAll(".nextBtn");
  nextButton.forEach((nextbtn) => {
    nextbtn.addEventListener('click' , function(){
      let nextStep = parseInt(nextbtn.closest('.steps').dataset.step) + parseInt(1);
      console.log(nextStep);
      if(parseInt(nextbtn.closest('.steps').dataset.step) == parseInt(2))
      {
        let checkSelectedProduct = document.querySelector(".products-wrapper.active");
        if(document.body.contains(checkSelectedProduct))
        {
           nextbtn.closest(".steps").classList.add("d-none");
          document.querySelectorAll(".steps").forEach((Steps) => {
          var allStepsIndex =  Steps.dataset.step;
               if(allStepsIndex == nextStep ){
                   Steps.classList.remove("d-none");
                }
            });
        }
        else
        {
          alert("Please Select Any Product");
        }
      }
      else
      {
        document.querySelectorAll(".steps").forEach((Steps) => {
             var allStepsIndex =  Steps.dataset.step;
             if(allStepsIndex == nextStep ){
                  Steps.classList.remove("d-none");
                }
           });
      }
    });
  });
}

function selectProdutcs(){
let allProducts = document.querySelectorAll(".product-select-btn .select");
allProducts.forEach((selectBtn) => {
  selectBtn.addEventListener("click" , function(){
    selectBtn.closest(".products-wrapper").classList.add("active");
    selectBtn.closest(".products-wrapper").querySelector(".product-selected-btn").classList.remove("d-none");
    selectBtn.closest(".products-wrapper").querySelector(".product-select-btn").classList.add("d-none")
    appendHTML(selectBtn);
   });
});
}

function appendHTML() {
  var activeProductHTML = "";
  let activeProductId;
  var SelectedProductTitle;
  let productJson;
  let activeParents = document.querySelectorAll(".products-wrapper.active");
  activeParents.forEach((active) => {
    activeProductId = active.dataset.productid;
    console.log(activeProductId);
    SelectedProductTitle = active.querySelector(".card-title .product-link").innerHTML;
    console.log(SelectedProductTitle);
    activeProductHTML += "<div class='selected-products-wrapper text-center'><div class='selected-product-title' data-title="+`${SelectedProductTitle}`+"><h5>" + SelectedProductTitle + "</h5></div><div class='remove-btn'>Remove</div></div>";
    console.log(activeProductHTML);
    document.querySelector(".selected-prouducts-stack").innerHTML = activeProductHTML;
    productJson =  active.querySelector(`[data-ProductJson="${activeProductId}"]`).innerHTML;
    selectedCurrentProduct = JSON.parse(productJson);
    console.log(selectedCurrentProduct);
    removeProductsFromStack();
    selectedButtonClick();
    frequencySelection(active);
  });
}


function selectedButtonClick(){
  let allSelectedProducts = document.querySelectorAll(".product-selected-btn .selected");
  allSelectedProducts.forEach((selectProductBtn) => {
  selectProductBtn.addEventListener("click" , function(){
    selectProductBtn.closest(".products-wrapper").classList.remove("active");
    selectProductBtn.closest(".products-wrapper").querySelector(".product-selected-btn").classList.add("d-none");
    selectProductBtn.closest(".products-wrapper").querySelector(".product-select-btn").classList.remove("d-none")
    removeProductsFromStackWithSelected(selectProductBtn);
   });
});
}

function removeProductsFromStackWithSelected(selectProductBtn){
          let currentProductWrapper = selectProductBtn.closest(".products-container");
          console.log(currentProductWrapper);
          let currentProductTitle = currentProductWrapper.querySelector(".card-title .product-link ").innerHTML;
          console.log(currentProductTitle);
          var selectedProductsList = document.querySelectorAll(".selected-products-wrapper");
          selectedProductsList.forEach((selectedProducts) => {
           let productTitles = selectedProducts.querySelector(".selected-product-title h5").innerHTML;
           console.log(productTitles);
           if(currentProductTitle == productTitles ){
             selectedProducts.innerHTML = "";
             selectedProducts.outerHTML = "";
      }
  });
}

function removeProductsFromStack(){
  let mainProductContainer = document.querySelector(".selected-prouducts-stack");
  let allRemoveBtns = mainProductContainer.querySelectorAll(".remove-btn");
  allRemoveBtns.forEach((remove) => {
    remove.addEventListener("click" , function(){
          let currentProductWrapper = remove.closest(".selected-products-wrapper");
          let currentProductTitle = currentProductWrapper.querySelector(".selected-product-title h5").innerHTML;
          let currentStackProduct = remove.closest(".selected-products-wrapper");
          currentStackProduct.innerHTML = "";
          currentStackProduct.outerHTML = "";
          var selectedProductsList = document.querySelectorAll(".product-select-btn .select");
          selectedProductsList.forEach((selectedProduct) => {
           selectedProduct.closest(".products-wrapper").classList.remove("active");
           let productTitles = selectedProduct.closest(".products-container").dataset.title;
           if(currentProductTitle == productTitles ){
             selectedProduct.closest(".products-wrapper").querySelector(".product-selected-btn").classList.add("d-none");
             selectedProduct.closest(".products-wrapper").querySelector(".product-select-btn").classList.remove("d-none")
           }
         });
      });
  });
}


function frequencySelection(active){
  
    selectedCurrentProduct['selling_plan_groups'].forEach( selling_plan_grp  => {
      selling_plan_grp['selling_plans'].forEach( plan => {
        console.log(plan.id);
        if(plan.name=="Delivery every 2 Months")
        { 
          active.setAttribute("data-selling-id-twoMonths", plan.id);
        }
        if(plan.name=="Delivery every 4 Months")
        { 
          active.setAttribute("data-selling-id-fourMonths", plan.id);
        }
        if(plan.name=="Delivery every 6 Months")
        { 
          active.setAttribute("data-selling-id-sixMonths", plan.id);
        }
      })
    });
    console.log(selectedCurrentProduct);
}

function selectedFrequency(){
  var allFrequencyies = [...document.querySelectorAll(".frequency")];
  allFrequencyies.forEach((currentFreq) => {
    currentFreq.addEventListener('click' , function(){
      setActive(currentFreq);
      
    });
  })
  const setActive = (el) => {
    [...el.parentElement.children].forEach((sib) =>
      sib.classList.remove("active")
    );
    el.classList.add("active");
  };
}

function funnelAddToCart(){
  let cartElement = document.querySelector('ajax-cart');
  let buttonSelector = document.querySelector(".add-to-cart-button button");
  buttonSelector.addEventListener('click', function onSubmitHandler(evt) {
    const addItems = [];
    let allProductsIds = [];
    var Frequecies = document.querySelector(".frequency.active");
    var datafrequncy = Frequecies.dataset.frequency;
    let AllActiveProducts = document.querySelectorAll(".products-wrapper.active");
    console.clear();
    

    for(var i =0 ; i< AllActiveProducts.length; i++ ){
          console.log(AllActiveProducts[i].getAttribute('data-selling-id-twomonths'));
          console.log(AllActiveProducts[i].getAttribute('data-selling-id-fourmonths'));
          console.log(AllActiveProducts[i].getAttribute('data-selling-id-sixmonths'));
          console.log(AllActiveProducts[i].querySelector(".product-form [name='id']").value);
          let activeFrequency ;
          if(datafrequncy == 'Delivery every 2 Months')
          {
            activeFrequency = AllActiveProducts[i].getAttribute('data-selling-id-twomonths');
          }
          if(datafrequncy == 'Delivery every 4 Months')
          {
            activeFrequency = AllActiveProducts[i].getAttribute('data-selling-id-fourmonths');
          }
          if(datafrequncy == 'Delivery every 6 Months')
          {
            activeFrequency = AllActiveProducts[i].getAttribute('data-selling-id-sixmonths');
          }
          console.log(activeFrequency);
          let addOnJSON = {
            id: AllActiveProducts[i].querySelector(".product-form [name='id']").value,
            selling_plan:activeFrequency
          }
          addItems.push(addOnJSON);
   }
   const body = JSON.stringify({
    items: addItems
  });

   console.log(body);
   fetch(`${routes.cart_add_url}`, { ...fetchConfig(), body })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            cartElement.getCartData('open_drawer');
          })
          .catch((e) => {
            console.error(e);
          })

  });
}






typeof subscriptionJS !== 'undefined' && new subscriptionJS();
