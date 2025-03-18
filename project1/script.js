//@Dessa Shapiro
if (!window.localStorage || !window.fetch || !document.createElement) {
    window.location.href = "unsupported.html";  // redirect to legacy page
}

//When content load create the necessary elements
document.addEventListener("DOMContentLoaded", function () {
    const formContainer = document.getElementById("form-container");
    const resultContainer = document.getElementById("result");
    const popularPlacesContainer = document.createElement("div");
    popularPlacesContainer.id = "popular-places";
    const mainHeading = document.querySelector("h1");
    if (mainHeading) {
        mainHeading.insertAdjacentElement("afterend", popularPlacesContainer);
    } else {
        document.body.insertBefore(popularPlacesContainer, document.body.firstChild);
    }

    // fetch data from JSON file for selects
    fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON data.");
            }
            return response.json();
        })
        .then(data => {
            //used data to create the dropdowns
            function createDropdown(options, id, onChangeCallback) {
                const container = document.createElement("div");
                container.classList.add("dropdown-container");
            
                const select = document.createElement("select");
                select.id = id;
                select.setAttribute("name", id);
                select.addEventListener("change", onChangeCallback);
            
                options.forEach(option => {
                    const optElement = document.createElement("option");
                    // remove prefix using regEx Go this from W3schools 
                    const displayText = option.replace(/^.*?_/g, '');
                    optElement.value = option;
                    optElement.textContent = displayText;
                    select.appendChild(optElement);
                });
            
                container.appendChild(select);
                formContainer.appendChild(container);
            
                // fade in animation
                container.style.opacity = "0";
                setTimeout(() => {
                    container.style.transition = "opacity 0.5s";
                    container.style.opacity = "1";
                }, 10);
            }

            //For when you choose each selection 
            function handleSelection(event) {
                const selectedOption = event.target.value;
                removeFollowingElements(event.target.id);
            
                while (resultContainer.firstChild) {
                    resultContainer.removeChild(resultContainer.firstChild);
                }
            
                let existingForm = document.getElementById("visit-form");
                if (existingForm) {
                    existingForm.remove();
                }
            
                if (selectedOption in data) {
                    if (data[selectedOption].length === 1) {
                        displayFinalSelection(data[selectedOption][0]);
                    } else {
                        createDropdown(data[selectedOption], `select-${selectedOption}`, handleSelection);
                    }
                }
            
                // updates background when selecting a different continent
                if (["North America", "Europe", "Asia", "Africa", "South America", "Oceania"].includes(selectedOption)) {
                    updateBackground(selectedOption);
                }
            }
            
            // to show the selection area
            function showSelectionArea() {
                const selectionArea = document.querySelector('.selection-area');
                selectionArea.style.display = 'block'; // Show the selection area
            }
            
            // to hide the selection area
            function hideSelectionArea() {
                const selectionArea = document.querySelector('.selection-area');
                selectionArea.style.display = 'none'; 
            }

            //displays the country info when through the selects
            function displayFinalSelection(result) {
                showSelectionArea()
                resultContainer.textContent = `Your ideal vacation destination is: ${result}`;
                resultContainer.style.opacity = "0";
                setTimeout(() => {
                    resultContainer.style.transition = "opacity 1s";
                    resultContainer.style.opacity = "1";
                }, 10);
            
                // shows the form container after final 
                formContainer.style.display = "block";
            
                saveToLocalStorage(result);
                saveToCookies(getCookieValue("userName") || "Guest", result);
                fetchCountryInfo(result);
            
                createVisitForm(result);
                createPastCountriesSection();
                createPastCountriesAndDestinationsSection();
            }
            
            //code for removing unnecessary selects
            function removeFollowingElements(id) {
                let elements = document.querySelectorAll(".dropdown-container");
                hideSelectionArea()
                let remove = false;
            
                elements.forEach(el => {
                    if (remove) {
                        shrinkFadeOut(el, () => el.remove());
                    }
                    if (el.firstChild.id === id) remove = true;
                });
            
                // remove the form if you go back before submitting
                let existingForm = document.getElementById("visit-form");
                if (existingForm) {
                    existingForm.remove();
                    const formContainer = document.getElementById("visit-form-container");
                    const formHeading = formContainer.querySelector("h2");
                    formHeading.textContent = "Find Your Destination!";

                }
                
            }
            
            // Animation for shrinking
            function shrinkFadeOut(element, callback) {
                let scale = 1;
                let opacity = 1;
            
                function animate() {
                    if (opacity <= 0) {
                        element.style.display = "none"; // Hide element
                        if (callback) callback();
                        return;
                    }
            
                    //Controls Speed
                    scale -= 0.01; 
                    opacity -= 0.01;
            
                    //Creates Shrink and Fades
                    element.style.transform = `scale(${scale})`;
                    element.style.opacity = opacity;
            
                    requestAnimationFrame(animate);
                }
            
                animate();
            }

            //Changes the background pic depending on first choice
            function updateBackground(continent) {
                let images = {
                    "North America": "images/NorthAmerica.png",
                    "South America": "images/worldMap2.png",
                    "Europe": "images/europeMap.png",
                    "Asia": "images/worldMap5.png",
                    "Africa": "images/worldMap3.png",
                    "Oceania": "images/worldMap6.png"

                };
                document.body.style.transition = "background 1s ease-in-out";
                if (document.body.style.backgroundImage !== `url("${images[continent]}")`) {
                    document.body.style.transition = "background 1s ease-in-out";
                    document.body.style.backgroundImage = `url(${images[continent]})`;
                }

                document.body.style.backgroundSize = 'auto';
                document.body.style.backgroundPosition = 'top right';
            }

            //Fetches from an API to get country info and flag
            function fetchCountryInfo(country) {
                fetch(`https://restcountries.com/v3.1/name/${country}`)
                    .then(response => response.json())
                    .then(data => {
                        const countryData = data[0];
                        const capitalP = document.createElement("p");
                        capitalP.textContent = `Capital: ${countryData.capital[0]}`;

                        const populationP = document.createElement("p");
                        populationP.textContent = `Population: ${countryData.population.toLocaleString()}`;

                        const regionP = document.createElement("p");
                        regionP.textContent = `Region: ${countryData.region}`;

                        const flagImg = document.createElement("img");
                        flagImg.src = countryData.flags.png;
                        flagImg.alt = `Flag of ${country}`;
                        flagImg.style.width = "150px";
                        flagImg.style.borderRadius = "5px";

                        resultContainer.appendChild(capitalP);
                        resultContainer.appendChild(populationP);
                        resultContainer.appendChild(regionP);
                        resultContainer.appendChild(flagImg);
                                            })
                        .catch(error => console.error("Error fetching country info:", error));
            }

            //Saves visited places in local storage
            function saveToLocalStorage(country) {
                let visitedPlaces = JSON.parse(localStorage.getItem("visitedPlaces")) || [];
                visitedPlaces.push(country);
                localStorage.setItem("visitedPlaces", JSON.stringify(visitedPlaces));
                updatePopularPlaces();
            }

            //to update the top popular when you submit new ones 
            function updatePopularPlaces() {
                let visitedPlaces = JSON.parse(localStorage.getItem("visitedPlaces")) || [];
                let counts = visitedPlaces.reduce((acc, place) => {
                    acc[place] = (acc[place] || 0) + 1;
                    return acc;
                }, {});

                let sortedPlaces = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
                while (popularPlacesContainer.firstChild) {
                    popularPlacesContainer.removeChild(popularPlacesContainer.firstChild);
                }
                const heading = document.createElement("h2");
                heading.textContent = "5 Most Popular Destinations";
                popularPlacesContainer.appendChild(heading);
                
                sortedPlaces.slice(0, Math.min(5, sortedPlaces.length)).forEach(place => {
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

            //Saves country and name with cookies
            function saveToCookies(name, country) {
                if (navigator.cookieEnabled) {
                    let pastCountries = getPastCountries();
                    pastCountries.push(country);
                    document.cookie = `pastCountries=${JSON.stringify(pastCountries)}; path=/; max-age=31536000`; // Store for 1 year
                    document.cookie = `userName=${encodeURIComponent(name)}; path=/; max-age=31536000`; // Save name for 1 year
                }
            }

            //Fetches the value to display from cookies
            function getCookieValue(name) {
                const cookies = document.cookie.split("; ");
                for (let cookie of cookies) {
                    let [cookieName, value] = cookie.split("=");
                    if (cookieName === name) {
                        return decodeURIComponent(value);
                    }
                }
                return null;
            }
            
            // Gets all the past values to display
            function getPastCountries() {
                const cookies = document.cookie.split("; ");
                for (let cookie of cookies) {
                    let [name, value] = cookie.split("=");
                    if (name === "pastCountries") {
                        return JSON.parse(decodeURIComponent(value)) || [];
                    }
                }
                return [];
            }

            // Where other/past data is shown
            function createPastCountriesSection() {
                let pastCountriesContainer = document.getElementById("past-countries");
                if (!pastCountriesContainer) {
                    pastCountriesContainer = document.createElement("div");
                    pastCountriesContainer.id = "past-countries";
                } else {
                    // Clear container by removing all its child elements
                    while (pastCountriesContainer.firstChild) {
                        pastCountriesContainer.removeChild(pastCountriesContainer.firstChild);
                    }
                }

                const heading = document.createElement("h2");
                heading.textContent = "Recent Selected Countries";
                pastCountriesContainer.appendChild(heading);

                let pastCountries = getPastCountries();
                
                // Slice the array to get only the most recent 10 countries
                let recentCountries = pastCountries.slice(-10);
                
                // Iterate through the recent countries and display them in the order they appear (most recent first)
                recentCountries.reverse().forEach(country => {
                    const p = document.createElement("p");
                    p.textContent = country;
                    pastCountriesContainer.appendChild(p);
                });

                pastCountriesContainer.style.opacity = "0";
                setTimeout(() => {
                    pastCountriesContainer.style.transition = "opacity 1s";
                    pastCountriesContainer.style.opacity = "1";
                }, 10);

                return pastCountriesContainer;
            }


            function createDestinationsVisitedSection() {
                let destinationsVisitedContainer = document.getElementById("destinations-visited");
                if (!destinationsVisitedContainer) {
                    destinationsVisitedContainer = document.createElement("div");
                    destinationsVisitedContainer.id = "destinations-visited";
                } else {
                    while (destinationsVisitedContainer.firstChild) {
                        destinationsVisitedContainer.removeChild(destinationsVisitedContainer.firstChild);
                    }
                }
            
                const heading = document.createElement("h2");
                heading.textContent = "Destinations Visited";
                destinationsVisitedContainer.appendChild(heading);
            
                const visitedData = JSON.parse(localStorage.getItem("visitedData")) || [];
                visitedData.filter(data => data.visited === "Yes").forEach(data => {
                    const p = document.createElement("p");
                    p.textContent = `${data.name} - Country: ${data.country} - Comment: ${data.comment || "No comments"}`;
                    destinationsVisitedContainer.appendChild(p);
                });
            
                destinationsVisitedContainer.style.opacity = "0";
                setTimeout(() => {
                    destinationsVisitedContainer.style.transition = "opacity 1s";
                    destinationsVisitedContainer.style.opacity = "1";
                }, 10);
            
                return destinationsVisitedContainer;
            }
            
            //to hold they in a flex together
            function createPastCountriesAndDestinationsSection() {
                let container = document.getElementById("past-and-visited");
                if (!container) {
                    container = document.createElement("div");
                    container.id = "past-and-visited";
                    container.style.display = "flex";
                    container.style.justifyContent = "space-evenly";
                    container.style.marginTop = "20px";
                    document.body.appendChild(container);
                } else {
                    while (container.firstChild) {
                        container.removeChild(container.firstChild);
                    }
                }
            
                const pastCountriesContainer = createPastCountriesSection();
                const destinationsVisitedContainer = createDestinationsVisitedSection();
            
                container.appendChild(pastCountriesContainer);
                container.appendChild(destinationsVisitedContainer);
            }
            
            function createVisitForm(selectedCountry) {
                
                let formContainer = document.getElementById("visit-form-container");
            
                // Only create the form if it doesn't yet exist
                if (!formContainer) {
                    formContainer = document.createElement("div");
                    formContainer.id = "visit-form-container";
                    document.body.appendChild(formContainer);
                }
            
                // So the form container is cleared before adding new stuff
                while (formContainer.firstChild) {
                    formContainer.removeChild(formContainer.firstChild);
                }
            
                const formHeading = document.createElement("h2");
                formHeading.textContent = `Plan Your Visit to ${selectedCountry}`;
                formContainer.appendChild(formHeading);
            
                const form = document.createElement("form");
                form.id = "visit-form";
            
                const nameLabel = document.createElement("label");
                nameLabel.setAttribute("for", "name");
                nameLabel.textContent = "Your Name:";
                const nameInput = document.createElement("input");
                nameInput.type = "text";
                nameInput.id = "name";
                nameInput.name = "name";
                nameInput.required = true;
            
                const visitedLabel = document.createElement("label");
                visitedLabel.setAttribute("for", "visited");
                visitedLabel.textContent = "Have you visited before?";
                const visitedSelect = document.createElement("select");
                visitedSelect.id = "visited";
                visitedSelect.name = "visited";
                visitedSelect.required = true;
                ["", "Yes", "No"].forEach(optionValue => {
                    const option = document.createElement("option");
                    option.value = optionValue;
                    option.textContent = optionValue || "Select...";
                    visitedSelect.appendChild(option);
                });
            
                const wantToVisitLabel = document.createElement("label");
                wantToVisitLabel.setAttribute("for", "wantToVisit");
                wantToVisitLabel.textContent = "Do you want to visit?";
                const wantToVisitSelect = document.createElement("select");
                wantToVisitSelect.id = "wantToVisit";
                wantToVisitSelect.name = "wantToVisit";
                wantToVisitSelect.required = true;
                ["", "Yes", "No"].forEach(optionValue => {
                    const option = document.createElement("option");
                    option.value = optionValue;
                    option.textContent = optionValue || "Select...";
                    wantToVisitSelect.appendChild(option);
                });
            
                const commentLabel = document.createElement("label");
                commentLabel.setAttribute("for", "comment");
                commentLabel.textContent = "Any comments?";
                const commentTextarea = document.createElement("textarea");
                commentTextarea.id = "comment";
                commentTextarea.name = "comment";
                commentTextarea.rows = 3;
                commentTextarea.placeholder = "Share your thoughts...";
            
                const submitButton = document.createElement("button");
                submitButton.type = "submit";
                submitButton.textContent = "Submit";
            
                form.appendChild(nameLabel);
                form.appendChild(nameInput);
                form.appendChild(visitedLabel);
                form.appendChild(visitedSelect);
                form.appendChild(wantToVisitLabel);
                form.appendChild(wantToVisitSelect);
                form.appendChild(commentLabel);
                form.appendChild(commentTextarea);
                form.appendChild(submitButton);
            
                formContainer.appendChild(form);
            
                form.addEventListener("submit", function (event) {
                    event.preventDefault();
                    handleFormSubmit(selectedCountry);
                });
            }

            // Helper function to clean inputs
            function sanitizeInput(input) {
                return input.replace(/[<>&"'\/]/g, "");
            }

            // when form is submitted => update the Destinations Visited without clearing the existing
            function handleFormSubmit(country) {
                const nameInput = document.getElementById("name");
                const visitedSelect = document.getElementById("visited");
                const wantToVisitSelect = document.getElementById("wantToVisit");
                const commentInput = document.getElementById("comment");
            
                const name = nameInput.value.trim();
                const visited = visitedSelect.value;
                const wantToVisit = wantToVisitSelect.value;
                const comment = commentInput.value.trim();

                const formContainer = document.getElementById("visit-form-container");
                const formHeading = formContainer.querySelector("h2");
            
                let isValid = true;
                let errors = [];
            
                // Name Validation
                if (!name) {
                    isValid = false;
                    errors.push("Name is required.");
                    nameInput.classList.add("error");
                } else if (name.length < 2) {
                    isValid = false;
                    errors.push("Name must be at least 2 characters.");
                    nameInput.classList.add("error");
                } else if (!/^[a-zA-Z\s]+$/.test(name)) {
                  isValid = false;
                  errors.push("Name can only contain letters and spaces");
                  nameInput.classList.add("error");
                } else {
                    nameInput.classList.remove("error");
                }
            
                // Visited Validation
                if (!visited) {
                    isValid = false;
                    errors.push("Visited is required.");
                    visitedSelect.classList.add("error");
                } else {
                    visitedSelect.classList.remove("error");
                }
            
                // Want to Visit Validation
                if (!wantToVisit) {
                    isValid = false;
                    errors.push("Want to visit is required.");
                    wantToVisitSelect.classList.add("error");
                } else {
                    wantToVisitSelect.classList.remove("error");
                }
            
                // Comment Validation
                if (comment.length > 200) {
                    isValid = false;
                    errors.push("Comment is too long (max 200 characters).");
                    commentInput.classList.add("error");
                } else {
                    commentInput.classList.remove("error");
                }
            
            
                if (!isValid) {
                    alert(errors.join("\n")); // Display all errors
                    return; // Stop form submission
                }
            
                const sanitizedName = sanitizeInput(name);
                const sanitizedComment = sanitizeInput(comment);
            
                const formData = { name: sanitizedName, visited, wantToVisit, comment: sanitizedComment, country };
            
                saveFormData(formData);
                displayVisitedDestinations(visited);
                formHeading.textContent = "Thank you for your response!";

            
                document.getElementById("visit-form")?.remove();
            }

            function saveFormData(data) {
                let visitedData = JSON.parse(localStorage.getItem("visitedData")) || [];
                visitedData.push(data);
                localStorage.setItem("visitedData", JSON.stringify(visitedData));
            }

            function displayVisitedDestinations(visited) {
                const visitedData = JSON.parse(localStorage.getItem("visitedData")) || [];
                let destinationsContainer = document.getElementById("destinations-visited");
            
                // "destinations-visited" section doesn't exist, create it
                if (!destinationsContainer) {
                    destinationsContainer = document.createElement("div");
                    destinationsContainer.id = "destinations-visited";
                    document.body.appendChild(destinationsContainer);
                }
            
                if (visited === "Yes") {
                    // so we do not duplicate if this is a repeat submission
                    const existingCountries = new Set();
                    visitedData.forEach(data => {
                        if (data.visited === "Yes" && !existingCountries.has(data.country)) {
                            const p = document.createElement("p");
                            p.textContent = `${data.name} - Country: ${data.country} - Comment: ${data.comment || "No comments"}`;
                            destinationsContainer.appendChild(p);
                            existingCountries.add(data.country);
                        }
                    });
                }
            }

            if (data.init) {
                createDropdown(data.init, "select-init", handleSelection);
            } else {
                console.error("Initial data missing from JSON.");
            }
            updatePopularPlaces();
        })
        //data not working
        .catch(error => console.error("Error loading data:", error));
});
