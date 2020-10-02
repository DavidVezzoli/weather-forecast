<template>
  <div class="container" v-if="this.$store.state.forecastDataLoaded">
    <transition :name="transitionName">
      <div id="forecastContainer" v-if="bol">
        <ul id="daysOfTheWeek">
          <li
            class="week-day"
            v-for="(weeDay, index) in weekDays"
            :key="weeDay.date"
            @click="day = index"
            :class="{ active: index == day }"
          >
            <p>
              {{ dayName[weekDays[index].day] }}
              {{ weekDays[index].date }}
            </p>
          </li>
        </ul>

        <ul id="forecastContent">
          <li
            v-for="(forecast, index) in fiveDayForecast"
            :key="forecast.date"
            class="forecast-tile"
          >
            <img
              class="icon"
              :src="getWeatherIcon(fiveDayForecast[index].icon)"
            />
            <p>{{ fiveDayForecast[index].time() }}</p>
            <div class="dot-container">
              <div class="dot">
                {{ fiveDayForecast[index].temperature }}&#176;
              </div>
            </div>
          </li>
        </ul>
      </div>
    </transition>

    <div class="open-close" @click="bol = !bol">
      <i class="fa fa-chevron-up bg-black" aria-hidden="true" v-if="!bol"></i>
      <i class="fa fa-chevron-down bg-black" aria-hidden="true" v-if="bol"></i>
    </div>
  </div>
</template>

<script>
import main from "../mixins/main";

export default {
  name: "weather-forecast",

  mixins: [main],

  data() {
    return {
      dayName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      transitionName: "",
      bol: "",
      day: 0,
    };
  },

  created() {
    window.addEventListener("resize", this.resizeHandler);
  },

  mounted() {
    this.resizeHandler();
  },

  methods: {
    resizeHandler() {
      this.bol = false;
      this.transitionName = "slideUp";

      if (window.innerWidth > 576) {
        this.bol = true;
        this.transitionName = "";
      }
    },
  },

  computed: {
    forecastData() {
      return this.$store.state.forecastData.list;
    },

    weekDays() {
      let weekDaysArr = [];

      for (let g = 0; g < this.forecastData.length; g++) {
        const dt = new Date(this.forecastData[g].dt * 1000);
        weekDaysArr.push({ day: dt.getDay(), date: dt.getDate() });
      }

      return this.multiDimensionalUnique(weekDaysArr);
    },

    fiveDayForecast() {
      let tempForecastArr = [];

      for (let d = 0; d < this.forecastData.length; d++) {
        const dt = new Date(this.forecastData[d].dt * 1000);
        const dtDay = dt.getDay();
        if (dtDay == this.weekDays[this.day].day) {
          tempForecastArr.push({
            date: this.forecastData[d].dt,
            time: function() {
              const tempDate = new Date(this.date * 1000);
              const hours = tempDate.getHours();
              return hours + ":00";
            },
            icon: this.forecastData[d].weather[0].icon,
            temperature: Math.round(this.forecastData[d].main.temp - 273.15),
          });
        }
      }

      return tempForecastArr;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/_animations.scss";

.container {
  position: relative;
  width: 100%;
  max-width: 600px;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

#forecastContainer {
  position: relative;
  width: 100%;
  height: 200px;
  top: 0;
}

#daysOfTheWeek {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
}

.week-day {
  height: 40px;
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.65);

  cursor: pointer;

  p {
    margin: 0;
    font-size: 16px;
    line-height: 40px;
  }

  @media only screen and (max-width: 576px) {
    p {
      font-size: 13px;
    }
  }
}

.week-day.active {
  background-color: orange;
}

.active-day {
  color: black;
  background-color: orange;
}

#forecastContent {
  height: 180px;
  white-space: nowrap;
  overflow-x: scroll;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;

  @media only screen and (max-width: 992px) and (min-width: 576px + 1) {
    height: 200px;
  }

  @media only screen and (max-width: 576px) {
    height: 400px;
    background-color: rgba(0, 0, 0, 0.8);
  }
}

.forecast-tile {
  position: relative;
  display: inline-block;
  padding: 10px 0 20px 0;
  width: 125px;
  height: 100%;
  text-align: center;
  img,
  p,
  .dot-container {
    padding: 5px 0;
  }
  @media only screen and (max-width: 576px) {
    img,
    p,
    .dot-container {
      padding: 15px 0;
    }
  }

  @media only screen and (max-width: 996px) {
    p {
      font-size: 16px;
    }
  }
}

.icon {
  margin: 0;
  padding: 0;
  width: 40%;
}

.dot {
  width: 100%;
  margin: 10px auto;

  width: 24px;
  height: 24px;
  font-size: 12px;
  line-height: 24px;
  color: black;
  text-align: center;
  border-radius: 50%;
  background: white;
}

.open-close {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 50px;
  text-align: center;

  margin-bottom: 10px;

  i {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;

    color: white;
    font-size: 25px;
    text-align: center;
    line-height: 50px;
  }

  p {
    padding-left: 15px;
  }

  @media only screen and (min-width: 576px + 1) {
    display: none;
  }
}
</style>
