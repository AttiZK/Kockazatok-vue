<template>
  <button class="btn-primary">
    {{ text }}
    <svg width="29" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26.03.729H3.075A2.622 2.622 0 0 0 .466 3.338V22.12a2.622 2.622 0 0 0 2.608 2.609h22.957a2.621 2.621 0 0 0 2.609-2.609V3.338A2.622 2.622 0 0 0 26.03.729Zm-.52 20.87H3.595V3.859h21.913V21.6ZM5.682 8.033a2.087 2.087 0 1 1 4.174 0 2.087 2.087 0 0 1-4.174 0Zm6.26 0a2.086 2.086 0 1 1 4.174 0 2.086 2.086 0 0 1-4.173 0Z"
        fill="#fff"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'btnPrimary',
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>