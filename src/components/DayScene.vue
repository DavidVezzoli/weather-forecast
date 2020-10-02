<template>
  <div
    class="container"
    :class="setSkyColor"
    id="sky"
    v-if="this.$store.state.localDataLoaded"
  >
    <div id="sun-moon-container">
      <div
        id="sun-glare"
        :style="{ top: posY(false) + 'px', left: posX(false) + 'px' }"
      ></div>
      <div
        id="sun"
        :style="{ top: posY(false) + 'px', left: posX(false) + 'px' }"
      ></div>

      <div
        id="moon-glare"
        :style="{ top: posY(true) + 'px', left: posX(true) + 'px' }"
      ></div>
      <div
        id="moon"
        :style="{ top: posY(true) + 'px', left: posX(true) + 'px' }"
      ></div>
    </div>
    <div
      id="bad-weather"
      :style="{ backgroundColor: getWeatherData()[1] }"
    ></div>
    <div id="clouds">
      <div v-for="(cloud, index) in cloudQty" :key="cloud.index">
        <cloud-sprite
          :index="index"
          :cloudQty="getWeatherData()[0]"
          :pcentTop="0.4"
          :pcentBottom="0.65"
        ></cloud-sprite>
      </div>
    </div>

    <div v-if="dropQty > 0" id="rain"></div>
  </div>
</template>

<script>
import CloudSprite from "./CloudSprite.vue";

export default {
  name: "DayScene",
  components: {
    CloudSprite,
  },

  data() {
    return {
      cloudQty: 0,
      dropQty: 0,
      bwColor: "rgba(140, 140, 140, 0)",
      testId: "04",
    };
  },

  methods: {
    getWeatherData() {
      switch (this.weatherData.weather[0].icon.substr(0, 2)) {
        case "01": // CLEAR SKY
          this.dropQty = 0;
          this.cloudQty = 0;
          this.bwColor = "rgba(140, 140, 140, 0)";
          break;
        case "02": //FEW CLOUDS
          this.dropQty = 0;
          this.cloudQty = 6;
          this.bwColor = "rgba(140, 140, 140, 0)";
          break;
        case "03": // SCATTERED CLOUDS
          this.dropQty = 0;
          this.cloudQty = 10;
          this.bwColor = "rgba(140, 140, 140, 0.25)";
          break;
        case "04": // BROKEN CLOUDS
          this.dropQty = 0;
          this.cloudQty = 16;
          this.bwColor = "rgba(140, 140, 140, 0.6)";
          break;
        case "09": // SHOWER RAIN
          this.dropQty = 150;
          this.cloudQty = 26;
          this.bwColor = "rgba(94, 94, 94, 0.8)";
          break;
        case "10": // RAIN
          this.dropQty = 250;
          this.cloudQty = 30;
          this.bwColor = "rgba(94, 94, 94, 0.5)";
          break;
        case "11": // THUNDERSTORM
          this.dropQty = 500;
          this.cloudQty = 36;
          this.bwColor = "rgba(94, 94, 94, 1)";
          break;
        case "13": // SNOW
          this.dropQty = 20;
          this.cloudQty = 20;
          this.bwColor = "rgba(140, 140, 140, 0.95)";
          break;
        case "50": // MIST
          this.dropQty = 0;
          this.cloudQty = 10;
          this.bwColor = "rgba(140, 140, 140, 0.75)";
          break;
      }

      window.innerWidth < 576 ? this.cloudQty / 2 : this.cloudQty;

      return [this.cloudQty, this.bwColor];
    },

    posX(invert) {
      let x = invert ? this.sunMoonAngle - 180 : this.sunMoonAngle;
      x *= Math.PI / 180;
      return Math.round(
        window.innerWidth / 2 + this.getRadius() * Math.cos(x) - 75
      );
    },

    posY(invert) {
      let y = invert ? this.sunMoonAngle - 180 : this.sunMoonAngle;
      y *= Math.PI / 180;

      return Math.round(
        window.innerHeight / 2 + this.getRadius() * Math.sin(y) - 75
      );
    },

    getRadius() {
      let r;
      if (window.innerWidth <= 576) {
        r = 200;
      } else if (window.innerWidth <= 768) {
        r = 550;
      } else if (window.innerWidth <= 12008) {
        r = 600;
      } else {
        r = 700;
      }

      return r;
    },
  },

  computed: {
    weatherData() {
      return this.$store.state.appData;
    },

    hours() {
      return new Date(this.$store.state.localTime).getHours();
    },

    sunMoonAngle() {
      return Math.round((360 / 24) * this.hours) - 270;
    },

    setSkyColor() {
      let timeOfDay = "";
      const h = this.hours;

      if (h >= 4 && h < 6) {
        timeOfDay = "dawn";
      } else if (h >= 6 && h < 8) {
        timeOfDay = "pre-morning";
      } else if (h >= 8 && h < 12) {
        timeOfDay = "morning";
      } else if (h >= 12 && h < 17) {
        timeOfDay = "afternoon";
      } else if (h >= 17 && h < 18) {
        timeOfDay = "dusk";
      } else if (h >= 20 && h <= 21) {
        timeOfDay = "pre-night";
      } else {
        timeOfDay = "night";
      }

      return timeOfDay;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/_variables.scss";
@import "../scss/_animations.scss";
canvas {
  display: block;
}
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#sun-moon-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 70%;

  #sun,
  #moon {
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  #sun {
    background-color: rgb(248, 248, 7);
  }

  #moon {
    background-color: #f0f0f0;
  }

  #sun-glare,
  #moon-glare {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    transform: translate(-25%, -25%);

    @media only screen and (max-width: 768px) {
      top: 50%;
    }
  }

  #sun-glare {
    background-image: radial-gradient(
      rgba(248, 248, 7, 0.5),
      rgba(248, 248, 7, 0)
    );
  }

  #moon-glare {
    background-image: radial-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
  }

  @media only screen and (max-width: 768px) {
    top: 60%;
  }
}

#bad-weather {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(140, 140, 140, 0.9);
}

.night {
  background: $night;
}
.dawn {
  background: linear-gradient($night, $dawn);
}
.pre-morning {
  background: linear-gradient($dawn, $morning);
}
.morning {
  background: $morning;
}
.afternoon {
  background: linear-gradient($morning, $afternoon);
}
.dusk {
  background: linear-gradient($afternoon, $dusk);
}
.pre-night {
  background: linear-gradient($dusk, $night);
}
</style>
