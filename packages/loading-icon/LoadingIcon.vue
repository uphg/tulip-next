<template functional>
  <svg
    class="tulp-button__loading-icon"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 100 100"
        to="360 100 100"
        dur="1s"
        repeatCount="indefinite"
      />
      <circle
        fill="none"
        stroke="currentColor"
        stroke-width="20"
        stroke-linecap="round"
        cx="100"
        cy="100"
        r="90"
        stroke-dasharray="700"
        stroke-dashoffset="1000"
      />
    </g>
  </svg>
</template>
