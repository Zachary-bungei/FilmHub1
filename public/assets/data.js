let PostCard = `
<div class="card">
    <div class="preview_idea">
        <img src="" alt="">
        <span class="material-icons" id="torep_img">image</span>

        <div class="pre_chat"> 
            <button id="iconchat_idea">
                <span class="material-icons">chat</span>
            </button>

            <div class="idea_pre_inter">
                <button>preview</button>
                <button>Order</button>
            </div>
        </div>
    </div>

    <div class="about_idea">
        <div class="abt1">
            <img src="" alt="">
            
            <div class="ItsNmae">
                <p>The W-war</p>
            </div>
        </div>

        <div class="abt2">
            <h2>Zaxly</h2>
        </div>

        <div class="abt3"> 
            <div class="rate">
                <span class="material-icons star1">star</span>
                <span class="material-icons star2">star</span>
                <span class="material-icons star3">star</span>
                <span class="material-icons star4">star</span>
                <span class="material-icons star5">star</span>
            </div>
            <b>–</b>
            <div class="time">6 day(s)</div>
        </div>
    </div>
</div>
`;
let NotificationCard = `
<div class="notification-box">
  <div class="notification-header">
    <div class="notification-title">
      <b>zaxly</b>
      <p>–</p>
      <blockquote>promotion</blockquote>
    </div>
    <div class="material-icons" title="Delete">delete</div>
  </div>

  <div class="not_content">
    <div class="notification-body">
      Is your add-on creative or unexpected in tech, design, or workflow?
      If similar ideas exist, how is yours better?
      What’s original or delightful about it?
    </div>

    <div class="notification-footer">
      <div class="doc-count">document (<b>5</b>)</div>
      <div class="footer-actions">
        <span class="read"><span class="material-icons">library_books</span>read more</span>
        <span class="open"><span class="material-icons">picture_as_pdf</span>open</span>
        <span class="about"><span class="material-icons">visibility</span>about</span>
      </div>
    </div>
  </div>
</div>
`;


loadData();



// Renders star icons based on rating
function renderStars(rating = 0) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        const type = i <= rating ? "star" : "star_border";
        stars += `<span class="material-icons star${i}">${type}</span>`;
    }
    return stars;
}

// Builds a single idea card as HTML
function createIdeaCard(idea) {
    const {
        onwer = "onwer",
        ownerprofile = "",
        banner = "",
        name = "Untitled",
        hook = "",
        rating = 0,
        date = "Unknown"
    } = idea;

    return `
    <div class="card">
        <div class="preview_idea">
            <img src="${banner}" alt="">
            <span class="material-icons" id="torep_img">image</span>

            <div class="pre_chat"> 
                <button id="iconchat_idea">
                    <span class="material-icons">chat</span>
                </button>

                <div class="idea_pre_inter">
                    <button>preview</button>
                    <button>Order</button>
                </div>
            </div>
        </div>

        <div class="about_idea">
            <div class="abt1">
                <img src="${ownerprofile}" alt="OnwerProfile">
                <div class="ItsNmae">
                   <p>${onwer}</p>  |
                    <p>${name}</p> 
                </div>
            </div>

            <div class="abt2">
                <h2>${hook}</h2>
            </div>

            <div class="abt3"> 
                <div class="rate">
                    ${renderStars(rating)}
                </div>
                <b>–</b>
                <div class="time">${timeAgo(date)}</div>
            </div>
        </div>
    </div>
    `;
}

// Loads JSON and inserts cards into the container
async function loadData() {
    const response = await fetch('../data.json');
    const data = await response.json();

    const Actionlist = document.getElementById("ActionSection");
    const Actioadventurelist = document.getElementById("adventureSection");
    const adventurelist = document.getElementById("adventureSection");
    const FiSection = document.getElementById("Sci-FiSection");
    const Romancelist = document.getElementById("RomanceSection");
    const MysteryLit= document.getElementById("MysterySection");
    const HorrorSection = document.getElementById("HorrorSection");
    const Fantasylist = document.getElementById("FantasySection");
    const Dramalist = document.getElementById("DramaSection");
    const Comedylist = document.getElementById("ComedySection");
    const Suggestionlist =  document.getElementById("suggestion-grid");



    let ideas = data?.features?.ideas || [];
    ideas.forEach(idea => {
        const category = idea.category?.toLowerCase();
        const cardHTML = createIdeaCard(idea);
    
        if (category === "action") {
            Actionlist.innerHTML += cardHTML;
        }
    
        else if (category === "romance") {
            Romancelist.innerHTML += cardHTML;
        }
    
        else if (category === "adventure") {
            adventurelist.innerHTML += cardHTML;
        }
    
        else if (category === "comedy") {
            Comedylist.innerHTML += cardHTML;
        }
    
        else if (category === "fantasy") {
            Fantasylist.innerHTML += cardHTML;
        }
    
        else if (category === "mystery") {
            MysteryLit.innerHTML += cardHTML;
        }
    
        else if (category === "horror") {
            HorrorSection.innerHTML += cardHTML;
        }
    
        else if (category === "drama") {
            Dramalist.innerHTML += cardHTML;
        }
        else if (category === "science-fiction") {
            FiSection.innerHTML += cardHTML;
        }
    
        else {
            // everything else falls here
            Suggestionlist.innerHTML += cardHTML;
        }
    });

}

loadData();

function timeAgo(dateInput) {
    const now = new Date();
    const past = new Date(dateInput);

    const diffMs = now - past;
    const sec = diffMs / 1000;
    const min = sec / 60;
    const hour = min / 60;
    const day = hour / 24;
    const week = day / 7;
    const month = day / 30.44;   
    const year = day / 365.25;   
    if (sec < 60) {
        return "now";
    } else if (min < 60) {
        return Math.floor(min) + " min";
    } else if (hour < 24) {
        return Math.floor(hour) + " hr";
    } else if (day < 7) {
        return Math.floor(day) + " day(s)";
    } else if (week < 5) {
        return Math.floor(week) + " week(s)";
    } else if (month < 12) {
        return Math.floor(month) + " month(s)";
    } else {
        return Math.floor(year) + " year(s)";
    }
}
console.log(timeAgo("2025-01-28T12:00:00"));


