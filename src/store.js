import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex, axios);

export default new Vuex.Store({
    state: {
        appid: process.env.VUE_APP_OWAPI,
        gMapKey: process.env.VUE_APP_MAPAPI,

        appData: [],
        forecastData: [],
        latitude: "",
        longitude: "",
        localTime: "",
        weatherIcon: "",
        localDataLoaded: false,
        forecastDataLoaded: false,
    },

    actions: {
        getAppData(context, obj) {
            const url = obj.url;

            axios
                .get(url)
                .then((jsonData) => {
                    const data = jsonData.data;
                    switch (obj.id) {
                        case "local":
                            context.commit("setData", data);
                            break;
                        case "forecast":
                            context.commit("setForecastData", data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        addSecond(context) {
            context.commit("addSecond");
        },

        getLatLon(context, lat, lon) {
            context.commit("setLatLon", lat, lon);
        },
    },

    mutations: {
        setData(state, data) {
            state.localDataLoaded = true;

            state.appData = data;
            state.localTime = new Date().setSeconds(
                new Date().getSeconds() + data.timezone - 3600
            );
            state.weatherIcon = data.weather[0].icon;
        },

        setForecastData(state, data) {
            state.forecastDataLoaded = true;
            state.forecastData = data;
        },

        setLatLon(state, cObj) {
            state.latitude = cObj.lat;
            state.longitude = cObj.lon;
        },

        addSecond(state) {
            const t = new Date(state.localTime);
            t.setSeconds(t.getSeconds() + 1);
            state.localTime = t;
        },
    },
});