
// Load Catagory Name : 
const loadCatagory = async() => {
    const cataoryTitleUrl = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const getCatagory = await fetch(cataoryTitleUrl);
        const catagoryName = await getCatagory.json();
        displayCatagoryName(catagoryName);
    }
    catch(error){
       console.log(error); 
    }
};


// Load Catagory Name > call Function
loadCatagory(); 


// Catagory Details Load here ......
const loadCatagoryDetails = async(id, catagoryNameDisplay) => {
    const cataDetUrl = `https://openapi.programming-hero.com/api/news/category/${id}`;
    try{
        const getDetails = await fetch(cataDetUrl);
        const detailsCata = await getDetails.json();
        detailsDataLoad(detailsCata, catagoryNameDisplay);
    }
    catch(err){
        console.log(err);
    }
};



// Load Post Details .......
const loadpostDetails = async(postId) => {
    const postDetailsUrl = `https://openapi.programming-hero.com/api/news/${postId}`;
    try{
        const loadpostDetailsData = await fetch(postDetailsUrl);
        const postDetailsConvert = await loadpostDetailsData.json();
        displayPostData(postDetailsConvert);
    }
    catch(err){
        console.log(err);
    }
}

// Modal Post Data and Function here.....
const displayPostData = (postData) => {
    const getPost = postData.data[0];
    const authorName = getPost.author.name ? getPost.author.name : "No Data Available";
    const pubData = getPost.author.published_date ? getPost.author.published_date : "No Data Available";
    const authorPhoto = getPost.author.img ? getPost.author.img : "No Data Available";
    const postDetailsTitle = getPost.title ? getPost.title : "No Data Available";
    const postDetailsPara = getPost.details ? getPost.details : "No Data Available";
    const postDetailsImage = getPost.image_url;
    const postView = getPost.total_view ? getPost.total_view : "No View";

    const modalTitle = document.getElementById('ModalLabel');
    modalTitle.innerText = postDetailsTitle;
    const modalImg = document.getElementById('post-image');
    modalImg.src = postDetailsImage;
    const postDetails = document.getElementById('post-details');
    postDetails.innerText = postDetailsPara;
    const postauthorImage = document.getElementById('author-img');
    postauthorImage.src = authorPhoto;
    const postAuthorName = document.getElementById('author-name');
    postAuthorName.innerText = authorName;
    const date = document.getElementById('pub-date');
    date.innerText = pubData;

    const viewpost = document.getElementById('view-post');
    viewpost.innerText = postView;
}

const detailsDataLoad = (detailsLoad, catagoryNameDisplay) => {
    const details = detailsLoad.data; 
    const posterContainer = document.getElementById('poster');
    posterContainer.innerHTML ="";
    const detailsNumberOfData = details.length;
    const numberOfPost = document.getElementById('item-list');
    numberOfPost.innerText = detailsNumberOfData;
    const placeInnerText = document.getElementById('item-name');
    placeInnerText.innerText = catagoryNameDisplay ? catagoryNameDisplay : "Breaking News";
   if(detailsNumberOfData === 0){
        numberOfPost.innerText = "No";
        const noFound = document.createElement('div');
        noFound.innerHTML = `
            <h4 class="text-center text-orange">No News Found, Please Visit Another Catagory</h4>
        `;
        posterContainer.appendChild(noFound);
   }
    details.forEach(detailsItem => {
        // Load All data.....
        const authorName = detailsItem.author.name ? detailsItem.author.name : "Guest Author";
        const publishDate = detailsItem.author.published_date ? detailsItem.author.published_date : "No Date Show";
        const authorImg = detailsItem.author.img;
        const detailsPost = detailsItem.details;
        const detailsPostShort = detailsPost.length > 300 ? detailsPost.slice(0, 300) + "..." : detailsPost;
        const postImage = detailsItem.image_url;
        const postTitle = detailsItem.title;
        const totalView = detailsItem.total_view ? detailsItem.total_view : "No View";
        const isToDaysPick = detailsItem.others_info.is_todays_pick;        
        const isTrending = detailsItem.others_info.is_trending;
        const postId = detailsItem._id;
        
        // Show All Post.....
        const posterBody = document.createElement('div');
        posterBody.innerHTML = `
        <div class="row white-bg p-3 my-3 rounded">
            <div class="col-12 col-lg-4">
                <img class="img-fluid" src="${postImage}" alt="No Image Found">
            </div>
            <div class="col-12 col-lg-8">
                <h3>${postTitle}</h3>
                <p>${detailsPostShort}</p>

                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="user">
                        <img class="user-img" src="${authorImg}" alt="">
                        </div>
                        <div class="mx-2">
                        <h6 class="m-0">${authorName}</h6>
                        <small class="m-0">${publishDate}</small>
                        </div>
                    </div>

                    <h6><span><i class="fa-regular fa-eye"></i></span> <span>${totalView}</span></h6>

                    <div class="rating">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>

                    <button id="${postId}"  data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn border-0"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
        `
        posterContainer.appendChild(posterBody);
        loader(false)
        // Show Post Details.....
        document.getElementById(`${postId}`).addEventListener('click', function(){
            loadpostDetails(`${postId}`);
            loader(true)
        })

    })
}



const displayCatagoryName = (catagory) => {
    const catagoryArray = catagory.data.news_category;
    const cataBody = document.getElementById('catagory-body');

    catagoryArray.forEach(catagoryTitle => {
        const nameOfCatagory = catagoryTitle.category_name;
        const userId = catagoryTitle.category_id;
        
        const catagoryDiv = document.createElement('li');
        catagoryDiv.innerHTML = `
                <a id="${userId}" class="nav-link pointer" aria-current="page" >${nameOfCatagory}</a>
        `;
        catagoryDiv.classList.add('nav-link');
        cataBody.appendChild(catagoryDiv);
        document.getElementById(`${userId}`).addEventListener('click', function(){
            loadCatagoryDetails(`${userId}`, nameOfCatagory);

            loader(true);
        });

})
};





loadCatagoryDetails('01');


// Loader Function
const loader = (isLoad) => {
    const loaderSection  = document.getElementById('loarder-section');
    if(isLoad){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


