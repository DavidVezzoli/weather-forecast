<template>
  <div class="container" v-if="this.$store.state.localDataLoaded">
    <ul>
      <li>
        <p>max/min</p>
        <p>
          {{ getTemp(theData.main.temp_min) }}&#176; /
          {{ getTemp(theData.main.temp_max) }}&#176;
        </p>
      </li>
      <li>
        <p>wind speed</p>
        <p>{{ windSpeed }} km/h</p>
      </li>
      <li>
        <p>wind direction</p>
        <p>{{ windDeg }}</p>
      </li>
      <li>
        <p>humidity</p>
        <p>{{ this.theData.main.humidity }}%</p>
      </li>
      <li>
        <p>sunrise</p>
        <p>{{ sunrise }}</p>
      </li>
      <li>
        <p>sunset</p>
        <p>{{ sunset }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "weatherDetails",

  methods: {
    degToCompass(num) {
      const val = Math.floor(num / 22.5 + 0.5);
      const arr = [
        "N",
        "N/NE",
        "NE",
        "E/NE",
        "E",
        "E/SE",
        "SE",
        "S/SE",
        "S",
        "S/SW",
        "SW",
        "W/SW",
        "W",
        "WNW",
        "NW",
        "N/NW",
      ];
      return arr[val % 16];
    },

    timestampToTime(_timestamp) {
      const date = new Date(_timestamp * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();

      return hours + ":" + minutes.substr(-2);
    },

    getTemp(temp) {
      return Math.round(temp - 273.15);
    },
  },

  computed: {
    theData() {
      return this.$store.state.appData;
    },

    windDeg() {
      return this.degToCompass(this.theData.wind.deg);
    },

    windSpeed() {
      return Math.round(this.theData.wind.speed * 3.6);
    },

    sunrise() {
      return this.timestampToTime(this.theData.sys.sunrise);
    },

    sunset() {
      return this.timestampToTime(this.theData.sys.sunset);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 50%;
  padding-top: 20px;
}

ul {
  padding-inline-start: 0;
}

li {
  display: inline-block;
  text-align: center;
  padding: 0 15px;
}

li:last-child {
  border-right: none;
}

@media only screen and (max-width: 768px) {
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    height: 65%;
  }

  @media only screen and (max-width: 992px) {
    .container {
      padding-top: 50px;
      height: 32%;
    }
  }

  @media only screen and (max-width: 576px) {
    .container {
      padding-top: 30px;
      height: Calc(60% - 80px);
    }
  }

  li {
    width: 100%;
  }

  li p {
    display: inline-block;
    width: 50%;
    padding: 5px;

    &:first-child {
      text-align: right;
      padding-right: 20px;
    }

    &:last-child {
      text-align: left;
      padding-left: 20px;
    }
  }
}

@media only screen and (max-width: 576px) {
  .container {
    margin-top: 0;
  }
}
</style>
