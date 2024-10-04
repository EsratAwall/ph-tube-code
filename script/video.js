console.log('video script added');

function getTimeString(time){
  // get hours and rest second ago
  const hours =parseInt(time /3600) ;
  let remainingSecond = time % 3600;
  const minuites = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hours} hour ${minuites} minuite ${remainingSecond} second ago`;
}

//1.Fetch, load, and show categories on html

// create loadcategories
const loadCategories = () =>{
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch((error) => console.log(error));

}

// videos
const loadVideos = (searchText = '') =>{
    // fetch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res => res.json())
    .then(data =>  videosCategories(data.videos))
    .catch((error) => console.log(error));

}
const removeActiveClass = () =>{
const buttons = document.getElementsByClassName('category-btn');
for (const btn of buttons) {
  btn.classList.remove('active');

}
}

const loadCategoryVideos = (id) =>{
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
      // sobaike active class remove koro
      removeActiveClass();
      // id er class k active koro
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add('active')
      
      videosCategories(data.category);
    } )
    .catch((error) => console.log(error));
}

const loadDetailbtn = async(videoId) =>{
const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
const res = await fetch(uri);
const data = await res.json();
displayDetails(data.video);

}
const displayDetails = (video) =>{
const detailsContainer = document.getElementById('modal-contain');
detailsContainer.innerHTML =`
<img src=${video.thumbnail}/>
<p>${video.description}</P
`

// way-1
// document.getElementById('showModaldata').click();
// way-22
document.getElementById('customModal').showModal();
}


// create displayCaregories
const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById('categories')
categories.forEach((item) => {
    console.log(item);
    // Create a button
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick ="loadCategoryVideos(${item.category_id})" class="btn category-btn">${item.category}</button>
    `
    // button.onclick = () =>{
    //   alert('hello')
    // }
    // add button to category container
    categoryContainer.append(buttonContainer);
})

}

// demo object
// {
//   "category_id": "1003",
//   "video_id": "aaak",
//   "thumbnail": "https://i.ibb.co/ZNggzdm/cake.jpg",
//   "title": "Beyond The Pale",
//   "authors": [
//       {
//           "profile_picture": "https://i.ibb.co/MZ2vbXR/jimm.jpg",
//           "profile_name": "Jim Gaffigan",
//           "verified": false
//       }
//   ],
//   "others": {
//       "views": "2.6K",
//       "posted_date": "15400"
//   },
//   "description": "'Beyond The Pale' by Jim Gaffigan, with 2.6K views, is a comedic gem that explores everyday observations and family life with a light-hearted and witty approach. Jim's humor is accessible and delightful, making this show perfect for anyone who enjoys clean, observational comedy."
// }



// create videosCategories
const videosCategories = (videos) =>{
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = '';
    if (videos.length == 0) {
      videosContainer.classList.remove('grid');
      videosContainer.innerHTML = `
      <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
      <img src= "assets/Icon.png"/>
      <h2 class="text-center text-xl font-bold">No Content Here in this Category</h2>
      </div>
      `;
      return;
    }else{
      videosContainer.classList.add('grid');
    }
videos.forEach((video) =>{
console.log(video);
const card = document.createElement('div');
card.classList = 'card card-compact';
card.innerHTML = `
  <figure class="h-[200px] relative">
    <img
      src="${video.thumbnail}"
     class="w-full h-full object-cover" alt="Shoes" />
     ${video.others.posted_date?.length == 0 ?"" : `<span class="absolute right-2 bottom-2 bg-black text-xs rounded p-1 text-white">${getTimeString(video.others.posted_date)}</span>` } 
  </figure>
  <div class="px-0 py-2 flex gap-2">
   <div>
      <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}"/>
   </div>
   <div>
   <h2 class="font-bold">${video.title}</h2>
   <div class="flex items-center gap-2">
   <p class="text-gray-400">${video.authors[0].profile_name}</p>
   ${video.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ''}
   </div>
   <button onclick="loadDetailbtn('${video.video_id}')" class="btn btn-sm btn-error">Details</button>
   </div>
    </div>
  </div>

`
videosContainer.append(card);

})

}

document.getElementById('serch-input').addEventListener('keyup', (e) =>{
loadVideos(e.target.value);

})
loadCategories();
loadVideos();