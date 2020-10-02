export default {
    methods: {

        multiDimensionalUnique(arr) {
            let uniques = [];
            let itemsFound = {};
            for (let i = 0, l = arr.length; i < l; i++) {
                const stringified = JSON.stringify(arr[i]);
                if (itemsFound[stringified]) {
                    continue;
                }
                uniques.push(arr[i]);
                itemsFound[stringified] = true;
            }
            return uniques;
        },

        getWeatherIcon(_iconId) {
            const baseUrl = "assets/icons/";
            let url;

            switch (_iconId) {
                case "01d":
                    url = baseUrl + "sun.svg";
                    break;
                case "01n":
                    url = baseUrl + "moon.svg";
                    break;
                case "02d":
                    url = baseUrl + "sun-cloud.svg";
                    break;
                case "02n":
                    url = baseUrl + "moon-cloud.svg";
                    break;
                case "03d":
                    url = baseUrl + "light-cloud.svg";
                    break;
                case "03n":
                    url = baseUrl + "light-cloud.svg";
                    break;
                case "04d":
                    url = baseUrl + "dark-cloud.svg";
                    break;
                case "04n":
                    url = baseUrl + "dark-cloud.svg";
                    break;
                case "09d":
                    url = baseUrl + "rain.svg";
                    break;
                case "09n":
                    url = baseUrl + "rain.svg";
                    break;
                case "10d":
                    url = baseUrl + "rain-sun.svg";
                    break;
                case "10n":
                    url = baseUrl + "rain-moon.svg";
                    break;
                case "11d":
                    url = baseUrl + "thunder.svg";
                    break;
                case "11n":
                    url = baseUrl + "thunder.svg";
                    break;
                case "13d":
                    url = baseUrl + "snow.svg";
                    break;
                case "13n":
                    url = baseUrl + "snow.svg";
                    break;
                case "50d":
                    url = baseUrl + "fog.svg";
                    break;
                case "50n":
                    url = baseUrl + "fog.svg";
                    break;
                default:
                    url = baseUrl + "sun.svg";
            }

            return url;
        },
    },
};