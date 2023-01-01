import { defineComponent } from 'vue'

const LoadingIcon = defineComponent({
  setup() {
    return () => (
      <svg
        class="tu-button__loading-icon"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 100 100;270 100 100"
            begin="0s"
            dur="1.6s"
            fill="freeze"
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
            stroke-dasharray="567"
            stroke-dashoffset="1848"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 100 100;135 100 100;450 100 100"
              begin="0s"
              dur="1.6s"
              fill="freeze"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              values="567;142;567"
              begin="0s"
              dur="1.6s"
              fill="freeze"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    )
  }
})

export default LoadingIcon