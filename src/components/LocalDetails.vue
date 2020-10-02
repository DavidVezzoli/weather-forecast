<template>
  <div class="container" v-if="this.$store.state.localDataLoaded">
    <div id="locationWeather">
      <div class="location-header">
        <h1>{{ weatherData.name }}</h1>
        <h2>{{ updateTime }}</h2>
      </div>

      <div class="local-weather-container">
        <h1>{{ updateTemperature(weatherData.main.temp) }}&#176;</h1>
        <img class="icon" :src="getWeatherIcon(weatherData.weather[0].icon)" />
        <p>
          feels like
          {{ Math.round(updateTemperature(weatherData.main.feels_like)) }}&#176;
        </p>
        <div class="local-weather">
          <p>{{ weatherData.weather[0].description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import main from "../mixins/main";

export default {
  name: "LocalDetails",

  mixins: [main],

  data() {
    return {
      month: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      week: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      secCounter: "",
      cd: "",
      localTime: new Date(this.$store.state.localTime),
      date: "",
      time: "",
      timeItv: "",
    };
  },

  mounted() {
    setInterval(this.secondTick, 1000);
  },

  methods: {
    secondTick() {
      this.$store.dispatch("addSecond");
    },

    addRemoveZero(num, digit) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },

    updateTemperature(temp) {
      return Math.round(temp - 273.15);
    },
  },

  computed: {
    weatherData() {
      return this.$store.state.appData;
    },

    updateTime() {
      const cd = new Date(this.$store.state.localTime);

      const time =
        this.addRemoveZero(cd.getHours(), 2) +
        ":" +
        this.addRemoveZero(cd.getMinutes(), 2);

      const date =
        this.week[cd.getDay()] +
        " " +
        this.month[cd.getMonth()] +
        " " +
        cd.getDate() +
        " " +
        cd.getFullYear();

      return time + " " + date;
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px 0 15px 0;
  height: 35%;
  width: 100%;
}

#locationWeather {
  width: 100%;
  margin: auto;

  text-align: center;
}

.location-header {
  width: 90%;
  margin-left: 5%;
}

.local-weather-container {
  display: grid;
  max-width: 300px;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  grid-template-columns: auto auto;
  padding-top: 20px;
  margin: auto;
}

.icon {
  margin: auto;
  padding: 0;
  width: 80px;
  height: 80px;

  @media screen and (max-width: 576px) {
    width: 50px;
    height: 50px;
  }
}

h1 {
  line-height: 60px;

  @media screen and (max-width: 576px) {
    line-height: 40px;
  }

  @media screen and (min-width: 576px + 1) and (max-width: 992px) {
    line-height: 70px;
  }
}

h2 {
  padding-top: 10px;
}
</style>
