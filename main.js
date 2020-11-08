import processClasses from 'https://unpkg.com/runcss@^0/dist/runcss.modern.js'
// Get all elements that have a class attribute.
for (const element of document.querySelectorAll('*[class]')) {
    processClasses(element.className)
}
// Display elements
document.body.style.display = "block"




function app() {
    return {
        results: [],
        data: null,
        // NOTE - Initialize data
        init: function () {
            const data = [];
            const results = [];
            this.$el.querySelectorAll('.item').forEach(function (item, index) {
                // NOTE - create data array with all data
                const gradeLevels = item.querySelector('.gradeLevels').innerText.split(', ');
                const status = item.querySelector('.status').innerText;
                const district = item.querySelector('.district').innerText;
                data.push({
                    id: item.id,
                    text: item.innerText,
                    gradeLevels,
                    status,
                    district
                });
                // NOTE - fill results arrays with initial values
                results.push(item.id);
            });
            // TODO - Find all options for districts 
            const districts = data.map(i => i.district).filter((value, index, array) => array.indexOf(
                value) === index);
            // TODO - Find all options for grade levels
            // NOTE - push data to main object
            console.log(districts);
            this.data = data;
            this.districts = districts;
            this.searchResults = results;
            this.gradeLevelResults = results;
            this.results = results;
        },
        // NOTE - Search
        searchResults: [],
        search: "",
        searchClasses: function () {
            let searchResults = [];
            const searchTerm = this.search;
            const result = this.data.filter(i => i.text.toLowerCase().includes(searchTerm.toLowerCase()));
            result.forEach(i => searchResults.push(i.id));
            this.searchResults = [...searchResults];
            this.compileResults();
        },
        // NOTE - filter grade levels
        gradeLevels: [{
            name: 'Upper',
            order: 3,
            show: false,
        },
        {
            name: 'Middle',
            order: 2,
            show: false,
        },
        {
            name: 'Lower',
            order: 1,
            show: false,
        },
        ],
        gradeLevelResults: [],
        filterGradeLevels: function () {
            let filteredGradeLevels = this.gradeLevels.filter(i => i.show === true).map(i => i.name);
            let gradeLevelResults = [];
            const data = this.data;
            if (filteredGradeLevels.length) {
                const result = data.filter(i => i.gradeLevels.some(i => filteredGradeLevels.includes(i)));
                result.forEach(i => gradeLevelResults.push(i.id));
                // console.log('start grade level filter');
                // console.log(result);
                // console.log('end grade level filter');
            } else {
                data.forEach(i => gradeLevelResults.push(i.id));
            }
            this.gradeLevelResults = [...gradeLevelResults];
            // console.log('start grade levels');
            // console.log(gradeLevelResults);
            // console.log('end grade levels')
            this.compileResults();
        },
        // TODO filter by district

        allDistricts: [],
        filteredDistricts: [],
        districtResults: [],
        filterDistricts: function () {

        },
        // TODO filter by status
        // Compile results array
        compileResults: function () {
            const gradeLevelResults = [...this.gradeLevelResults];
            const searchResults = [...this.searchResults];
            const resultsArray = [gradeLevelResults, searchResults];
            const results = resultsArray.reduce((acc, current) => acc.filter(i => current.includes(i)));
            console.log('start compile');
            console.log(results);
            console.log('end compile');
            this.results = [...results];
        },
        isVisible: function (id) {
            return this.results.includes(id);
        },
    }
}