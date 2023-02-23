<template>
  <transition-group  name="fade" :style="{ '--total': itemsLength }">
    <slot />
  </transition-group >
</template>

<script setup lang="ts">
defineProps({ itemsLength: { type: Number, default: 0}})
</script>

<style>
.fade-move {
  transition: opacity .5s linear, transform .5s ease-in-out;
}
.fade-enter-active {
  transition: opacity .5s linear, transform .5s cubic-bezier(.2,.5,.1,1);
  transition-delay: calc( 70ms * var(--i) );

}
.fade-leave-active {
  transition: opacity .4s linear, transform .4s cubic-bezier(.5,0,.7,.4);
  transition-delay: calc( 70ms * (var(--total) - var(--i)) );
}

.fade-enter-from {
  opacity: 0;
  transform: scaleY(0.01);
}

.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01);
}

.fade-leave-active {
  flex-shrink: 0;
  width: 100%;
}
</style>