const newsCategories={
    National:[
        {
            title:"Wildfire in Washington",
            content:"Disastrous fire spreads across thousands of acres.",
            image:"fire.jpg",
            date:"2023-08-18"
        },

        {
            title:"Giraffe Takes Down Ostrich",
            content:"Funny moment at the zoo.",
            image:"giraffe.jpg",
            date:"2023-08-18"
        }
    ],

    World:[
        {
            title:"Beautiful Beaches",
            content:"18 beaches you should visit.",
            image:"beach.jpg",
            date:"2023-08-18"
        }
    ],

    Business:[
        {
            title:"Dubai Luxury",
            content:"Expensive things found only in Dubai.",
            image:"dubai-lux.jpg",
            date:"2023-08-18"
        }
    ],

    Sports:[
        {
            title:"World Cup",
            content:"Semi Final Highlights.",
            image:"wcq.jpg",
            date:"2023-08-18"
        }
    ],

    Science:[
        {
            title:"Chandrayaan-3",
            content:"Historic moon landing by ISRO.",
            image:"chd.jpg",
            date:"2023-08-18"
        }
    ],

    Technology:[
        {
            title:"Artificial Intelligence",
            content:"AI changes the future of work.",
            image:"ai222.jpg",
            date:"2023-08-18"
        }
    ]
};

const menu=document.getElementById("menu");
	for(let category in newsCategories){
        const li=document.createElement("li");
        li.innerHTML=`<a href="#">${category}</a>`;
        li.onclick=()=>showCategory(category);
        menu.appendChild(li);
}

const container=document.getElementById("newsContainer");
	function showCategory(category){
		container.innerHTML="";
		newsCategories[category].forEach(news=>{
            container.innerHTML+=`
            <div class="card">
            <img src="${news.image}">
            <h2>${news.title}</h2>
            <p>${news.content}</p>
            <p class="category">${category}</p>
            <p class="date">Published ${news.date}</p>
            </div>
        `;
        });
}

function showAllNews(){
    container.innerHTML="";
    for(let category in newsCategories){
        newsCategories[category].forEach(news=>{
        container.innerHTML+=`
        <div class="card">
        <img src="${news.image}">
        <h2>${news.title}</h2>
        <p>${news.content}</p>
        <p class="category">${category}</p>
        <p class="date">Published ${news.date}</p>
        </div>
        `;
        });
    }
}

showAllNews();

function updateClock(){
    const now=new Date();
    clock.innerHTML=now.toLocaleTimeString();
    todayDate.innerHTML=now.toDateString();
}

setInterval(updateClock,1000);

updateClock();