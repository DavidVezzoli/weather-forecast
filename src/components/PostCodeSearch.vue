<template>
  <div class="container bg-black">
    <div class="input-container">
      <input
        id="searchBox"
        type="text"
        placeholder="Enter location or postcode"
        v-model="postCode"
      />
      <input id="submitButton" type="button" value="Search" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostCodeSearch",
  data() {
    return {
      postCode: "",
    };
  },

  mounted() {
    let that = this;

    document
      .getElementById("searchBox")
      .addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          that.getPostcodeData();
        }
      });

    document
      .getElementById("submitButton")
      .addEventListener("click", function() {
        that.getPostcodeData();
      });
  },

  methods: {
    hasNumber(myString) {
      return /\d/.test(myString);
    },

    getPostcodeData() {
      let localUrl;
      let forecastUrl;

      if (this.hasNumber(this.postCode)) {
        const postCodeURL =
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          this.postCode +
          "&key=" +
          this.$store.state.gMapKey;

        axios
          .get(postCodeURL)
          .then((response) => {
            const lat = response.data.results[0].geometry.location.lat;
            const lng = response.data.results[0].geometry.location.lng;

            localUrl =
              "https://api.openweathermap.org/data/2.5/weather?lat=" +
              lat +
              "&lon=" +
              lng +
              "&appid=" +
              this.$store.state.appid;

            forecastUrl =
              "https://api.openweathermap.org/data/2.5/forecast/?lat=" +
              lat +
              "&lon=" +
              lng +
              "&appid=" +
              this.$store.state.appid;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        localUrl =
          "https://api.openweathermap.org/data/2.5/weather?q=" +
          this.postCode +
          "&appid=" +
          this.$store.state.appid;

        forecastUrl =
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
          this.postCode +
          "&appid=" +
          this.$store.state.appid;
      }

      this.$store.dispatch("getAppData", { id: "forecast", url: forecastUrl });
      this.$store.dispatch("getAppData", { id: "local", url: localUrl });
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  padding: 15px auto 0;
  height: 60px;
  width: 100%;
  @media screen and (max-width: 567px) {
    height: 50px;
  }
}

.input-container {
  max-width: 600px;
  padding-top: 5px;
  margin: 0 auto;

  @media screen and (max-width: 567px) {
    padding-top: 0;
  }
}

#searchBox,
#submitButton {
  height: 40px;
  font-size: 15px;
  border: none;
}

#searchBox {
  display: inline-block;
  width: Calc(100% - 110px);
  margin: 5px 0 5px 5px;
  padding: 10px;
  border-radius: 5px 0 0 5px;
}

#submitButton {
  display: inline-block;
  width: 100px;
  margin: 5px 5px 5px 0;
  border-radius: 0 5px 5px 0;
}
</style>
