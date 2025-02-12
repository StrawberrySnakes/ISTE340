document.addEventListener("DOMContentLoaded", function () {
    const formContainer = document.getElementById("form-container");
    const resultContainer = document.getElementById("result");
    
    // Data structure for selections
    var data = {
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
    }
    
    function displayFinalSelection(result) {
        resultContainer.textContent = `Your ideal vacation destination is: ${result}`;
    }
    
    function removeFollowingElements(id) {
        let elements = document.querySelectorAll(`[id^="select-"]`);
        let remove = false;
        
        elements.forEach(el => {
            if (remove) el.remove();
            if (el.id === id) remove = true;
        });
    }
    
    createDropdown(data.init, "select-init", handleSelection);
});
