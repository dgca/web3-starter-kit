const sharedConfig = require("ui-utils/src/tailwind/tailwind.config")

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...sharedConfig.content,
  ],
  theme: {
    extend: {
      ...sharedConfig.theme.extend,
    },
  },
  plugins: [...sharedConfig.plugins],
}

