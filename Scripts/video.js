const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
  const container = document.getElementById("categories-container");
  categories.forEach((element) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.innerText = element.category;
    categoryBtn.classList = 'btn px-7 py-0 text-lg font-semibold bg-gray-100 hover:bg-red-500 hover:text-white mx-3'
    categoryBtn.onclick = () => {
      categoryVideos(element.category_id)
      categoryBtn.classList.add = 'bg-red-500 text-white'
    };
    container.appendChild(categoryBtn);
  });
};

loadCategories();

// For different types of category
const categoryVideos = (id) =>{
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
    .catch((error) => console.log(error));
}

// For videos
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos-container");
  videoContainer.innerHTML = "";
  videos.forEach((video) => {
    console.log(video);
    const videoCard = document.createElement("div");
    videoCard.classList = "card";

    // Date & Time functions starts here
    const dateTime = (time) => {
      const month = parseInt(time / 2.592e6);
      let remainingSec = time % 2.592e6;
      const day = parseInt(remainingSec / 86400);
      remainingSec = time % 86400;
      const hour = parseInt(remainingSec / 3600);
      remainingSec = time % 3600;
      const minute = parseInt(remainingSec / 60);
      remainingSec = time % 60;
      const checkTime = (time) => {
        time > 2.592e6
          ? month`month`
          : time > 86400
          ? day`day`
          : time > 3600
          ? hour`hour`
          : time > 60
          ? minute`min`
          : remainingSec`sec`;
      };
      return `${hour}h ${minute}m ${remainingSec}s`;
    };
    // Date & Time functions ends here

    videoCard.innerHTML = `
    <figure class="h-[150px] rounded-xl relative">
      <img class="w-full object-cover" src = ${video.thumbnail} />
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `<span class="absolute text-sm right-1 bottom-1 text-white p-1 px-2 rounded-lg"> ${dateTime(
              video.others.posted_date
            )} </span>`
      }
    </figure>
    <div class="py-5 flex gap-3">
        <div>
          <img src= ${
            video.authors[0].profile_picture
          } class="h-10 w-10 rounded-full object-cover"/>
        </div>
        <div>
            <h2 class="card-title"> ${video.title} </h2>
            <div class= "flex items-center gap-1">
                <p class="text-stone-400"> ${video.authors[0].profile_name} </p>
                ${
                  video.authors[0].verified === true
                    ? '<img src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" class="w-5 h-5"/>'
                    : ""
                }
            </div>
            <span class="text-stone-400 text-sm"> ${
              video.others.views
            } views</span>
        </div>
    </div>
    `;
    videoContainer.append(videoCard);
  });
};

loadVideos();
