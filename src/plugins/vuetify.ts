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

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          background: "#F9FEFD", // App background 1 or 2
          "component-background": "#DDF9F2", // Interactive components 3
          "component-background-hover": "#C8F4E9", // Interactive components 4
          "component-background-pressed": "#B3ECDE", // Interactive components 5
          "border-color": "#9CE0D0", // Borders and separators 6
          "border-interactive-color": "#7ECFBD", // Borders and separators 7
          "border-interactive-stronger-color": "#4CBBA5", // Borders and separators 8
          "solid-background": "#86EAD4", // Solid backgrounds, disabled text 9
          "solid-background-hover": "#7DE0CB", // Solid backgrounds, disabled text 10
          "color-low-contrast": "#027864", // Text 11
          "color-high-contrast": "#16433C", // Text 12
        },
      },
      dark: {
        colors: {
          background: "#F9F9F9", // App background 1 or 2
          "component-background": "#F0F0F0", // Interactive components 3
          "component-background-hover": "#E8E8E8", // Interactive components 4
          "component-background-pressed": "#E0E0E0", // Interactive components 5
          "border-color": "#D9D9D9", // Borders and separators 6
          "border-interactive-color": "#CECECE", // Borders and separators 7
          "border-interactive-stronger-color": "#BBBBBB", // Borders and separators 8
          "solid-background": "##8D8D8D", // Solid backgrounds, disabled text 9
          "solid-background-hover": "#F2F2F2", // Solid backgrounds, disabled text 10
          "text-color-low-contrast": "#646464", // Text 11
          "text-color-high-contrast": "#202020", // Text 12
        },
      },
    },
  },
});
