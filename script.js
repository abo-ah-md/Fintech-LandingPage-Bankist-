'use strict';
//Elements
const coockiesMesaage= document.createElement(`div`);
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const learnBtn= document.querySelector(`.btn--scroll-to`)
const featuressection= document.querySelector(`#section--1`)
const h1= document.querySelector(`h1`);
const navLink=document.querySelectorAll(`.nav__link`);
const navLinks=document.querySelector(`.nav__links`);
const nav=document.querySelector(`.nav`);
const operations=document.querySelector(`.operations`);
const operationscontainer=document.querySelector(`.operations__tab-container`);
const operationsTabs=document.querySelectorAll(`.operations__tab`);
const operationsContent=document.querySelectorAll(`.operations__content`);
const section1=document.querySelector(`#section--1`);
const header = document.querySelector(`.header`);
const sliders= document.querySelectorAll(`.slide`)
const slideContainer= document.querySelector(`.slider`)
const sliderLeftBtn= document.querySelector(`.slider__btn--left`);
const sliderRightBtn= document.querySelector(`.slider__btn--right`);
const dots= document.querySelector(`.dots`);


//this will fire with every scroll you should avoid this approach and use the intersection observer API instead

/*
const initialCoords=section1.getBoundingClientRect().top;
window.addEventListener(`scroll`,()=>{
  if (window.scrollY> initialCoords) {
    nav.classList.add(`sticky`)
  }else nav.classList.remove(`sticky`)

})
*/
/*
const observerCallbackFunc= (entries,observer)=>{
  entries.forEach(entry => {
    console.log(entry);
  })
}
const observerObject={
  root:null,//this will make it observe the window (i think 😂)
  threshold:[0,0.2],//this will make the callback function [end if the intersection no longer in the viewport,fires at 20% in the viewport of the targeted elment ]

}
const observer = new IntersectionObserver(observerCallbackFunc,observerObject)

observer.observe(section1)
*/
//sticky nav with IntersectionObserver;




//////////////////////////////////////////////


//creating an Elements 
//////////////////////////////////////
coockiesMesaage.classList.add(`cookie-message`);
coockiesMesaage.innerHTML=`
We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

document.body.append(coockiesMesaage);

//////////////////////////////////////////////


const navHight= nav.getBoundingClientRect().height;
const stickynav= (intries)=>{
const [entry]= intries;
if (!entry.isIntersecting) {
  nav.classList.add(`sticky`)
}else nav.classList.remove(`sticky`)

}

const headerObserver= new IntersectionObserver(stickynav,{
  root:null,
  threshold:0,
  rootMargin:`${navHight}px`
});
headerObserver.observe(header);



////////////////////////////////////////////////////
//reveal sections
const allSections = document.querySelectorAll(`.section`);

const sectionObservercallb=(entries,observer)=>{
  const [entry]= entries;
  if (!entry.isIntersecting) return;
   entry.target.classList.remove(`section--hidden`);
   observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionObservercallb,{
  root:null,
  threshold:0.15
})


allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add(`section--hidden`);
});


/////////////////////////////////////////////////////////////
//to lazy load the images
const imgObserverCallb = (entries,observer)=>{

  const[entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src=`${entry.target.dataset.src}`;

  entry.target.addEventListener("load",()=>{entry.target.classList.remove(`lazy-img`);})
  
observer.unobserve(entry.target);
}
const lazyImages= document.querySelectorAll(`img[data-src]`);
const imageObserver= new IntersectionObserver(imgObserverCallb,{
  root:null,
  threshold:0,
  rootMargin:`200px`
});

lazyImages.forEach(img => imageObserver.observe(img))



/////////////////////////////////////////////////////////////////
//slider functionality 

const slider = ()=>{
let currentSlide = 0;
const maxSlides = sliders.length


//functions 

const goToSlide= (slideNum)=>{

  sliders.forEach((slide,i) => {

    slide.style.transform = `translateX(${100*(i-slideNum)}%)`;
  })
}
//////////////

//////////////
const nextSlide=()=>{
  
  
    if (currentSlide===maxSlides-1) {
      currentSlide=0;
        }else{
          currentSlide++
        }
    
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  
  const prevSlide=()=>{
    
    if (currentSlide===0) {
      currentSlide=maxSlides-1
    }else{
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);

  };
  //////////////

const creatDots= ()=>{
  sliders.forEach((_,i) =>{
  dots.insertAdjacentHTML(`beforeend`,
  `<button class="dots__dot" data-slide=${i}></button>`);
  })}


const activateDot=(slide)=>{
  
  document
  .querySelectorAll(`.dots__dot`)
  .forEach(dot=> dot.classList.remove(`dots__dot--active`))

  document
  .querySelector(`[data-slide="${slide}"]`)
  .classList.add(`dots__dot--active`)
}
//////////////

//init 
const initSlider=()=>{
  creatDots();
  goToSlide(0);
  activateDot(0);
}

//Event Listeners
initSlider();
//assigning event listners to the left and right slide buttons
sliderRightBtn.addEventListener("click",nextSlide);
sliderLeftBtn.addEventListener("click",prevSlide);
//assigning event listners to document left and right slide Arrow keys event
document.addEventListener("keydown",(e)=>{
e.key===`ArrowRight`&&nextSlide();

e.key===`ArrowLeft`&&prevSlide();
});


dots.addEventListener("click",(e)=>{
  
  if (e.target.classList.contains(`dots__dot`)) {
  const {slide}= e.target.dataset;
  goToSlide(slide);
  activateDot(slide);
  }})

}

slider();


///////////////////////////////////////////////////////////////////////////

//handle hover function
const handleHover= function (e){
  if(e.target.classList.contains(`nav__link`)){
   const link = e.target;
   const sibilings= link.closest(`.nav`).querySelectorAll(`.nav__link`);
   const icon= link.closest(`.nav`).querySelector(`img`);

  sibilings.forEach(El =>{ 

   if (link!==El) El.style.opacity=this;

   icon.style.opacity=this
  })
}}

nav.addEventListener("mouseover",handleHover.bind(0.5));

nav.addEventListener("mouseout",handleHover.bind(1))


///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener("click",openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);


document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});




///////////////////////////////////

learnBtn.addEventListener("click",(e)=>{
e.preventDefault();

  featuressection.scrollIntoView({
    block:`start`,
    behavior:"smooth"})})

//navigation to link 
nav.addEventListener("click",(e)=>{
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id= e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({behavior:`smooth`})
  }
})


//tab operation to change depending on the button
operationscontainer.addEventListener("click",(e)=>{
  e.preventDefault();
  const clicked= e.target.closest(`.operations__tab`);
  //Guard clause 
  if (!clicked) return
  
  operationsTabs.forEach(El => {
    operationsContent.forEach(c => c.classList.remove(`operations__content--active`))
   El.classList.remove(`operations__tab--active`);
  clicked.classList.add(`operations__tab--active`);
  })

document.querySelector(`.operations__content--${
  clicked.dataset.tab}`)
  .classList.add(`operations__content--active`)
})
