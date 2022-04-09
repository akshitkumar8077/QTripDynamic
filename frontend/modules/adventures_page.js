import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  let city = new URLSearchParams(search).get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const res = await fetch(
      config.backendEndpoint + "/adventures/?city=" + city
    );
    const citydata = await res.json();
    return citydata;
  } catch (e) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //console.log(adventures);
  adventures.map((adventure, index) => {
    var divElement = document.createElement("div");
    divElement.className = "col-6 col-md-4 col-lg-3 mb-4";
    divElement.innerHTML = `
    <a href="detail/?adventure=${adventure.id}" id=${adventure.id}>
    <div class="category-banner">${adventure.category}</div>
    <div class="activity-card">
    <img class="img-responsive" src="${adventure.image}" />
      <div class="adventure-card-text w-100 text-md-center mt-2">
      <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3"
        <h5>${adventure.name}</h5>
        <p>&#x20B9;${adventure.costPerHead}</p>
      </div>
      <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3"
        <h5>Duration</h5>
        <p>${adventure.duration} hours</p>
      </div>
      </div>
    </div>
  </a>
    `;
    document.getElementById("data").appendChild(divElement);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = [];
  //console.log(list);
  //console.log(list);
  list.map((adv) => {
    if (adv.duration >= low && adv.duration <= high) {
      filteredList.push(adv);
      //console.log(adv.duration);
    }
  });
  if (filteredList.length === 0) {
    return list;
  }
  //console.log(filteredList);
  return filteredList;
}

/*let arrayLength = (categoryList["category"]).length;
  if(arrayLength == 0) {
    return list;
  }*/

/*if(cityCategory.every(c => categoryList.includes(c))) {
      filteredAdvByCategory.push(adv);
    }*/
/*var test = cityCategory.some(c => categoryList.indexOf(c) >=0);
    console.log(test);*/

//console.log(filteredAdvByCategory);
//var arrayLength = (categoryList["category"]).length;

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  var filteredAdvByCategory = [];
  categoryList.map((category) => {
    list.map((key) => {
      if (key.category === category) {
        filteredAdvByCategory.push(key);
      }
    });
  });

  if (categoryList.length === 0) {
    return list;
  }
  //console.log(filteredAdvByCategory);
  return filteredAdvByCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  //console.log(list, filters);

  //console.log(range, low, high);

  /*if(filters.length === 0) {
    return list;
  }*/

  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let range = filters["duration"];
    let rangeArray = range.split("-");
    let filterByDurationList = filterByDuration(
      list,
      rangeArray[0],
      rangeArray[1]
    );
    var finalList = filterByCategory(filterByDurationList, filters["category"]);
  } else if (filters["duration"].length > 0) {
    let range = filters["duration"];
    let rangeArray = range.split("-");
    var finalList = filterByDuration(list, rangeArray[0], rangeArray[1]);
  } else if (filters["category"].length > 0) {
    var finalList = filterByCategory(list, filters["category"]);
  } else {
    return list;
  }

  return finalList;

  //let filterByDurationList = filterByDuration(list, low, high);
  //console.log(filterByDurationList);

  //let flist = filterByCategory(list, filters["category"]);

  // Place holder for functionality to work in the Stubs
  //return flist;
  //return filterByDurationList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  let localStorageFilter = JSON.parse(window.localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return localStorageFilter;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  //console.log(filters["category"]);
  //var index = 0;
  //document.getElementById("category-list");
  //var divElementForPills = document.createElement("div");
  //divElementForPills.className = "category-filter";
  //divElementForPills.innerText = JSON.stringify(filters["category"]);
  //var ulElement = document.createElement("ul");
  /*var liElement = document.createElement("li");
  liElement.className = "category-filter";
  liElement.innerText = filters["category"];
  var tElement = ulElement.appendChild(liElement);
  divElementForPills.appendChild(tElement);*/

  /*for(index = 0; index < filters["category"].length; index++) {
    var liElement = document.createElement("li");
    liElement.className = "category-filter";
    console.log(filters["category"][index]);
    liElement.innerHTML = liElement.innerHTML + filters["category"][index];
    var tElement = ulElement.appendChild(liElement);
  }
  var pElement = divElementForPills.appendChild(tElement);
  document.getElementById("category-list").appendChild(pElement);*/

  filters["category"].map((key) => {
    let divElementPills = document.createElement("div");
    divElementPills.className = "category-filter";
    divElementPills.innerHTML = `
      <div>${key}</div>
    `;
    document.getElementById("category-list").appendChild(divElementPills);
  });

  if (filters["duration"]) {
    document.getElementById("duration-select").value = filters["duration"];
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
