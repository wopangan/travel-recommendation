let travelData = null; // stores the fetched data

// Run when the page is loaded
window.onload = function () {
  fetchTravelData();

  document.getElementById("searchBtn").addEventListener("click", search);
  document.getElementById("clearBtn").addEventListener("click", clearSearch);
};

// Function to test if a specific data from the json is fetched successfully through console.
function fetchTravelData() {
  fetch("travel_recommendation_api.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched JSON successfully");
      travelData = data;

      data.countries.forEach((country) => {
        console.log(`Country: ${country.name}`);
        country.cities.forEach((city) => {
          console.log(`City: ${city.name}`);
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
}

// Search function for the keyword searches of locations
function search() {
  const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("search-result");
  resultDiv.innerHTML = "";
  resultDiv.style.display = "block";

  let foundData = false; // Track if something matched.

  // Beaches data
  if ((searchInput === "beach" || searchInput === "beaches") && travelData.beaches) {
    travelData.beaches.forEach((beach) => {
      const div = document.createElement("div");
      div.innerHTML = `
    <img src="${beach.imageUrl}" alt="${beach.name}"/>
    <h2>${beach.name}</h2>
    <p>${beach.description}</p>
    <button>Visit</button>
    `;
      resultDiv.appendChild(div);
    });
    return;
  }

  // Temples data
  if ((searchInput === "temple" || searchInput === "temples") && travelData.temples) {
    travelData.temples.forEach((temple) => {
      const div = document.createElement("div");
      div.innerHTML = `
            <img src="${temple.imageUrl}" alt="${temple.name}"/>
            <h2>${temple.name}</h2>
            <p>${temple.description}</p>
            <button>Visit</button>
        `;
      resultDiv.appendChild(div);
    });
    return;
  }

  // Cities
  if (travelData.countries) {
    travelData.countries.forEach((country) => {
      country.cities.forEach((city) => {
        if (city.name.toLowerCase().includes(searchInput)) {
          foundData = true;
          const div = document.createElement("div");
          div.innerHTML = `
                    <img src="${city.imageUrl}" alt="${city.name}" />
                    <h2>${city.name}</h2>
                    <p>${city.description}</p>
                    <button>Visit</button
                `;
          resultDiv.appendChild(div);
        }
      });
    });
  }

  // Statement to show a message if no matching data found in beaches, temples, or cities
  if (!foundData) {
    resultDiv.innerHTML = `<h3>No results found for "${searchInput}".</h3>`;
    resultDiv.style.color = "white";
  }
}

// Function to clear the search bar and resultDiv results
function clearSearch() {
  document.getElementById("searchInput").value = "";
  const resultDiv = document.getElementById("search-result");
  resultDiv.innerHTML = "";
  resultDiv.style.display = "none";
}
