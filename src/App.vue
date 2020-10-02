<template>
  <div id="app">
    <div id="backgroundScene">
      <day-scene></day-scene>
    </div>
    <div id="content">
      <post-code-search></post-code-search>
      <local-details></local-details>
      <weather-details></weather-details>
    </div>
    <div id="forecast">
      <weather-forecast></weather-forecast>
    </div>
  </div>
</template>

<script>

import PostCodeSearch from "./components/PostCodeSearch.vue";
import LocalDetails from "./components/LocalDetails.vue";
import WeatherDetails from "./components/WeatherDetails.vue";
import WeatherForecast from "./components/WeatherForecast.vue";
import DayScene from "./components/DayScene.vue";

export default {
  name: "HomePage",
  components: {
    PostCodeSearch,
    LocalDetails,
    WeatherDetails,
    WeatherForecast,
    DayScene,
  },

  mounted: function() {
    this.getWeatherByCoordinates();
  },

  methods: {
    getWeatherByCoordinates() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.coordinatesResult,
          this.handle_error
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },

    handle_error(err) {
      console.log(err);
    },

    coordinatesResult(position) {
      let coordObj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      this.$store.dispatch("getLatLon", coordObj);
      this.getWeatherData();
    },

    getWeatherData() {
      let urlLocal = "https://api.openweathermap.org/data/2.5/weather?lat=";
      let urlForecast =
        "https://api.openweathermap.org/data/2.5/forecast/?lat=";
      let urlConst =
        this.$store.state.latitude +
        "&lon=" +
        this.$store.state.longitude +
        "&appid=" +
        this.$store.state.appid;

      let localObj = {
        id: "local",
        url: urlLocal + urlConst,
      };

      let forecastObj = {
        id: "forecast",
        url: urlForecast + urlConst,
      };

      this.$store.dispatch("getAppData", localObj);
      this.$store.dispatch("getAppData", forecastObj);
    },
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&family=Raleway:wght@400;500&display=swap");

#app {
  width: 100%;
  height: 100%;
  min-height: 640px;
  font-family: "Raleway", sans-serif;
  font-weight: 500;
}

.container {
  width: 100%;
}

h1,
h2,
p {
  margin: 0;
  color: white;
  text-align: center;
}

h1 {
  font-size: 50px;
  line-height: 60px;
}

h2 {
  font-size: 22px;
  line-height: 28px;
}

p {
  font-size: 14px;
  line-height: 18px;
}

button:focus {
  outline: 0;
}

.inline {
  display: inline-block;
}

.invert {
  transform: scaleX(-1);
}

#backgroundScene,
#content {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

#content {
  position: relative;
  height: 100%;
  h1,
  h2,
  p {
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  }
}

#forecast {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 33%;
}

@media screen and (max-width: 576px) {
  h1 {
    font-size: 35px;
    line-height: 45px;
  }

  h2 {
    font-size: 14px;
    line-height: 22px;
  }

  p {
    font-size: 16px;
    line-height: 22px;
  }

  #forecast {
    height: 55%;
  }
}

@media only screen and (min-width: 576px + 1) and (max-width: 768px) {
  h1 {
    font-size: 70px;
    line-height: 80px;
  }

  h2 {
    font-size: 22px;
    line-height: 28px;
  }

  p {
    font-size: 19px;
    line-height: 27px;
  }

  li p {
    margin: 5px 0;
    font-size: 22px;
    line-height: 28px;
  }

  #forecast {
    height: 25%;
  }
}

.bg-black {
  background-color: rgba(0, 0, 0, 0.3);
}

/* width */
::-webkit-scrollbar {
  height: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0.25);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
}

/* TESTING */
.bg-red {
  background-color: red;
}
.bg-green {
  background-color: green;
}
.bg-blue {
  background-color: blue;
}
</style>
