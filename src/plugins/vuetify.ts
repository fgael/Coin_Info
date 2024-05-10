/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// Labs
// import { VSparkline } from "vuetify/labs/VSparkline";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light", // mint on radix-ui
    themes: {
      light: {
        colors: {
          "light-background": "#FCFDFC", // App background 1
          background: "#F0F0F0", // App background 2
          "component-background": "#DDF9F2", // Interactive components 3
          "component-background-hover": "#C8F4E9", // Interactive components 4
          "component-background-pressed": "#B3ECDE", // Interactive components 5
          "border-color": "#9CE0D0", // Borders and separators 6
          "border-interactive-color": "#7ECFBD", // Borders and separators 7
          "border-interactive-stronger-color": "#4CBBA5", // Borders and separators 8
          "solid-background": "#898E87", // Solid backgrounds, disabled text 9
          "solid-background-hover": "#7DE0CB", // Solid backgrounds, disabled text 10
          "color-low-contrast": "#60655F", // Text 11
          "color-high-contrast": "#1D211C", // Text 12
        },
      },
      dark: {
        colors: {
          background: "#0E1515", // App background 1 or 2
          "component-background": "#092C2B", // Interactive components 3
          "component-background-hover": "#003A38", // Interactive components 4
          "component-background-pressed": "#004744", // Interactive components 5
          "border-color": "#105650", // Borders and separators 6
          "border-interactive-color": "#1E685F", // Borders and separators 7
          "border-interactive-stronger-color": "#277F70", // Borders and separators 8
          "solid-background": "#86EAD4", // Solid backgrounds, disabled text 9
          "solid-background-hover": "#A8F5E5", // Solid backgrounds, disabled text 10
          "color-low-contrast": "#58D5BA", // Text 11
          "color-high-contrast": "#C4F5E1", // Text 12
        },
      },
    },
  },
  // components: {
  //   VSparkline,
  // },
});
