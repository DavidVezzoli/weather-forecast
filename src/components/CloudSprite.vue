<template>
  <div
    class="cloud"
    :style="
      `top: ` +
        cloudTopPosition +
        `.px; left: ` +
        cloudLeftPosition +
        `.px; animation-duration: ` +
        cloudAnimationDuration +
        `s; animation-delay:` +
        cloudAnimationDelay +
        `s; transform: scale(` +
        cloudScale +
        `);`
    "
  >
    <img
      :class="Math.random() > 0.5 ? 'invert' : ''"
      :src="
        require(`../assets/clouds/cloud` +
          Math.ceil(Math.random() * 4) +
          `.svg`)
      "
    />
  </div>
</template>

<script>
export default {
  name: "CloudSprite",

  props: ["index", "cloudQty", "pcentTop", "pcentBottom"],

  mounted() {},

  computed: {
    cloudTopPosition() {
      let hgt = window.innerHeight;
      let gap = hgt * this.pcentBottom * (this.pcentBottom / this.cloudQty);
      let padding = gap * this.index;

      return Math.round(hgt * this.pcentTop + Math.random() * gap + padding);
    },

    cloudLeftPosition() {
      return Math.round(Math.random() * window.innerWidth);
    },

    cloudAnimationDuration() {
      return Math.round(100 + 100/(this.index+1));
    },

    cloudAnimationDelay() {
      return Math.random() * - 200;
    },

    cloudScale() {
      let scale = 0.4 + (0.6 / this.cloudQty) * this.index;
      return scale.toFixed(1);
    },
  },
};
</script>

<style lang="scss">
.cloud,
.cloud-invert {
  position: absolute;
  width: 400px;
  height: 200px;
  animation: cloud-move;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  img {
    width: 100%;
    object-fit: cover;
    filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.4));
  }
}

@keyframes cloud-move {
  from {
    left: -400px;
  }
  to {
    left: Calc(100%);
  }
}
</style>
