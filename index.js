// Definerer base URL for API-anmodninger
const baseUrl = "https://api.dataforsyningen.dk/postnumre"

Vue.createApp({
    // Definerer data-egenskaber for Vue-komponenten
    data() {
        return {
            allCities: [], // Array til at gemme alle byer hentet fra API
            cities: [], // Array til at gemme filtrerede/sorterede byer
            cityName: null, // Inputfeltets værdi for bynavn
            isAscending: true // Tilstand for sorteringsretning (stigende/faldende)
        }
    },
    // Lifecycle method, der kaldes, når komponenten er oprettet
    async created() {
        this.getAll(baseUrl) // Henter alle byer fra API'et ved opstart
    },
    methods: {
        // Asynkron metode til at hente alle byer fra API'et
        async getAll(url) {
            try {
                const response = await axios.get(url) // Udfører GET-anmodning til API'et
                this.allCities = response.data // Gemmer de hentede byer i allCities
                this.cities = this.allCities // Initialiserer cities med alle byer
                console.log(this.allCities) // Logger de hentede byer til konsollen
            } catch (ex) {
                alert(ex.message) // Viser en alert med fejlbeskeden, hvis anmodningen fejler
            }
        },
        // Metode til at sortere byer efter navn
        sortByCityName() {
            if (this.isAscending) {
                // Sorterer byer i stigende rækkefølge
                this.cities.sort((city1, city2) =>
                    city1.navn.localeCompare(city2.navn))
            } else {
                // Sorterer byer i faldende rækkefølge
                this.cities.sort((city1, city2) =>
                    city2.navn.localeCompare(city1.navn))
            }
            this.isAscending = !this.isAscending // Skifter sorteringsretning til næste gang
        },
        // Metode til at sortere byer efter postnummer i stigende rækkefølge
        sortByPostNrAscending() {
            this.cities.sort((city1, city2) => city1.nr - city2.nr)
        },
        // Metode til at sortere byer efter postnummer i faldende rækkefølge
        sortByPostNrDescending() {
            this.cities.sort((city1, city2) => city2.nr - city1.nr)
        },
        // Metode til at filtrere byer baseret på inputfeltets værdi
        filterByCityName(cityName) {
            console.log("City Name:" + cityName + ":")
            console.log("All cities " + this.allCities)
            // Filtrerer byer, der indeholder den indtastede tekst (case-insensitive)
            this.cities = this.allCities.filter(city => 
                city.navn.toLowerCase().includes(cityName.toLowerCase())
            )
            console.log("filtered cities: " + this.cities)
        }
    }
}).mount("#app") // Monterer Vue-applikationen på elementet med id="app"