<template>
  <div
    class="drop"
    :style="
      `top: ` +
        dropTopPosition +
        `.px; left: ` +
        dropLeftPosition +
        `.px; animation-duration: ` +
        dropAnimationDuration +
        `s; animation-delay:` +
        dropAnimationDelay +
        `s; transform: scale(` +
        dropScale +
        `);`
    "
  >
    <img :src="
        require(`../assets/drops/drop` +
          Math.ceil(Math.random() * 7) +
          `.png`)
      " />
  </div>
</template>

<script>
export default {
  name: "RainDrop",

  props: ["index"],

  mounted() {},

  computed: {
    dropTopPosition() {
      return Math.round(Math.random() * window.innerHeight);
    },

    dropLeftPosition() {
      return Math.round(Math.random() * window.innerWidth);
    },

    dropAnimationDuration() {
      return Math.round(Math.random(200)) + 200;
    },

    dropAnimationDelay() {
      return Math.round(Math.random() * - 400);
    },

    dropScale() {
      let scale = Math.random() * 0.5 + 0.5;
      return scale.toFixed(1);
    },
  },
};
</script>

<style lang="scss">
.drop {
  position: absolute;
  width: 20px;
  height: 20px;
  animation: drop-move;
  animation-timing-function: easeIn;
  animation-iteration-count: infinite;
  transform: scale(0.5);
  opacity: .5;
}

@keyframes drop-move {
  from {
    transform: translateY(0);
    opacity: .75;
  }
  to {
    transform: translateY(400px);
    opacity: 0;
  }
}
</style>
