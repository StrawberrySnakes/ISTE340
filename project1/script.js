document.addEventListener("DOMContentLoaded", function () {
    const formContainer = document.getElementById("form-container");
    const resultContainer = document.getElementById("result");
    const popularPlacesContainer = document.createElement("div");
    popularPlacesContainer.id = "popular-places";
    document.body.appendChild(popularPlacesContainer);

    // Data structure for selections
    const data = {
        init: ['Which continent do you prefer?', 'North America', 'Europe', 'Asia', 'Africa'],
        'North America': ['Do you prefer hot or cold?', 'Hot', 'Cold'],
        'Europe': ['Do you prefer historical sites or modern cities?', 'Historical', 'Modern'],
        'Asia': ['Do you prefer beaches or mountains?', 'Beaches', 'Mountains'],
        'Africa': ['Do you prefer safaris or coastal destinations?', 'Safaris', 'Coastal'],
        
        'Hot': ['Do you like tropical or desert climates?', 'Tropical', 'Desert'],
        'Cold': ['Do you enjoy winter sports?', 'Yes', 'No'],
        'Historical': ['Do you prefer castles or ruins?', 'Castles', 'Ruins'],
        'Modern': ['Do you prefer tech hubs or cultural hubs?', 'Tech', 'Cultural'],
        'Beaches': ['Do you want a party atmosphere or a quiet retreat?', 'Party', 'Quiet'],
        'Mountains': ['Do you prefer hiking or skiing?', 'Hiking', 'Skiing'],
        'Safaris': ['Do you prefer guided tours or self-drive experiences?', 'Guided', 'Self-drive'],
        'Coastal': ['Do you prefer diving or sailing?', 'Diving', 'Sailing'],
        
        'Tropical': ['Recommended Country: Thailand'],
        'Desert': ['Recommended Country: Egypt'],
        'Yes': ['Recommended Country: Canada'],
        'No': ['Recommended Country: Germany'],
        'Castles': ['Recommended Country: France'],
        'Ruins': ['Recommended Country: Greece'],
        'Tech': ['Recommended Country: Japan'],
        'Cultural': ['Recommended Country: Italy'],
        'Party': ['Recommended Country: Brazil'],
        'Quiet': ['Recommended Country: Maldives'],
        'Hiking': ['Recommended Country: Switzerland'],
        'Skiing': ['Recommended Country: Austria'],
        'Guided': ['Recommended Country: Kenya'],
        'Self-drive': ['Recommended Country: Namibia'],
        'Diving': ['Recommended Country: Australia'],
        'Sailing': ['Recommended Country: Croatia']
    };

    function createDropdown(options, id, onChangeCallback) {
        const container = document.createElement("div");
        container.classList.add("dropdown-container");

        const select = document.createElement("select");
        select.id = id;
        select.setAttribute("name", id);
        select.addEventListener("change", onChangeCallback);

        options.forEach(option => {
            const optElement = document.createElement("option");
            optElement.value = option;
            optElement.textContent = option;
            select.appendChild(optElement);
        });

        container.appendChild(select);
        formContainer.appendChild(container);

        // Fade-in animation
        container.style.opacity = "0";
        setTimeout(() => {
            container.style.transition = "opacity 0.5s";
            container.style.opacity = "1";
        }, 10);
    }

    function handleSelection(event) {
        const selectedOption = event.target.value;
        removeFollowingElements(event.target.id);

        if (selectedOption in data) {
            if (data[selectedOption].length === 1) {
                displayFinalSelection(data[selectedOption][0]);
            } else {
                createDropdown(data[selectedOption], `select-${selectedOption}`, handleSelection);
            }
        }

        // Update background if selecting a continent
        if (["North America", "Europe", "Asia", "Africa"].includes(selectedOption)) {
            updateBackground(selectedOption);
        }
    }

    function displayFinalSelection(result) {
        resultContainer.textContent = `Your ideal vacation destination is: ${result}`;
        resultContainer.style.opacity = "0";
        setTimeout(() => {
            resultContainer.style.transition = "opacity 1s";
            resultContainer.style.opacity = "1";
        }, 10);

        saveToLocalStorage(result);
        fetchCountryInfo(result.replace("Recommended Country: ", ""));
    }

    function removeFollowingElements(id) {
        let elements = document.querySelectorAll(".dropdown-container");
        let remove = false;

        elements.forEach(el => {
            if (remove) {
                el.style.transition = "opacity 0.5s";
                el.style.opacity = "0";
                setTimeout(() => el.remove(), 500);
            }
            if (el.firstChild.id === id) remove = true;
        });
    }

    function updateBackground(continent) {
        let images = {
            "North America": "images/north-america.jpg",
            "Europe": "images/europe.jpg",
            "Asia": "images/asia.jpg",
            "Africa": "images/africa.jpg"
        };
        document.body.style.transition = "background 1s ease-in-out";
        document.body.style.backgroundImage = `url(${images[continent]})`;
    }

    function fetchCountryInfo(country) {
        fetch(`https://restcountries.com/v3.1/name/${country}`)
            .then(response => response.json())
            .then(data => {
                const countryData = data[0];
                resultContainer.innerHTML += `
                    <p>Capital: ${countryData.capital[0]}</p>
                    <p>Population: ${countryData.population.toLocaleString()}</p>
                    <p>Region: ${countryData.region}</p>
                    <img src="${countryData.flags.png}" alt="Flag of ${country}" style="width: 150px; border-radius: 5px;">
                `;
            })
            .catch(error => console.error("Error fetching country info:", error));
    }

    function saveToLocalStorage(country) {
        let visitedPlaces = JSON.parse(localStorage.getItem("visitedPlaces")) || [];
        visitedPlaces.push(country);
        localStorage.setItem("visitedPlaces", JSON.stringify(visitedPlaces));
        updatePopularPlaces();
    }

    function updatePopularPlaces() {
        let visitedPlaces = JSON.parse(localStorage.getItem("visitedPlaces")) || [];
        let counts = visitedPlaces.reduce((acc, place) => {
            acc[place] = (acc[place] || 0) + 1;
            return acc;
        }, {});

        let sortedPlaces = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
        popularPlacesContainer.innerHTML = "<h2>Popular Destinations</h2>";
        sortedPlaces.slice(0, 5).forEach(place => {
            let p = document.createElement("p");
            p.textContent = `${place} (${counts[place]} visits)`;
            popularPlacesContainer.appendChild(p);
        });

        popularPlacesContainer.style.opacity = "0";
        setTimeout(() => {
            popularPlacesContainer.style.transition = "opacity 1s";
            popularPlacesContainer.style.opacity = "1";
        }, 10);
    }

    createDropdown(data.init, "select-init", handleSelection);
    updatePopularPlaces();
});
