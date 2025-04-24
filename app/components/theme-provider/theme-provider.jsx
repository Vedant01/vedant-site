// Update font imports to use public paths
const fonts = {
  GothamBoldItalic: '/assets/fonts/gotham-bold-italic.woff2',
  GothamBold: '/assets/fonts/gotham-bold.woff2',
  GothamBookItalic: '/assets/fonts/gotham-book-italic.woff2',
  GothamBook: '/assets/fonts/gotham-book.woff2',
  GothamMediumItalic: '/assets/fonts/gotham-medium-italic.woff2',
  GothamMedium: '/assets/fonts/gotham-medium.woff2',
  IPAGothic: '/assets/fonts/ipa-gothic.woff2'
};

// Reminder: Always use root-relative paths (e.g. /assets/...) for static assets in code and CSS.
// Reminder: Move all runtime assets (fonts, .glb, images) to public/assets/ and update code references accordingly.
// Reminder: Check file/folder case sensitivity and ensure all assets are committed and pushed to git before deploying to Vercel.

import { createContext, useContext } from 'react';
import { classes, media } from '~/utils/style';
import { themes, tokens } from './theme';

export const ThemeContext = createContext({});

export const ThemeProvider = ({
  theme = 'dark',
  children,
  className,
  as: Component = 'div',
  toggleTheme,
  ...rest
}) => {
  const parentTheme = useTheme();
  const isRootProvider = !parentTheme.theme;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: toggleTheme || parentTheme.toggleTheme,
      }}
    >
      {isRootProvider && children}
      {/* Nested providers need a div to override theme tokens */}
      {!isRootProvider && (
        <Component className={classes(className)} data-theme={theme} {...rest}>
          {children}
        </Component>
      )}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const currentTheme = useContext(ThemeContext);
  return currentTheme;
}

/**
 * Squeeze out spaces and newlines
 */
export function squish(styles) {
  return styles.replace(/\s\s+/g, ' ');
}

/**
 * Transform theme token objects into CSS custom property strings
 */
export function createThemeProperties(theme) {
  return squish(
    Object.keys(theme)
      .map(key => `--${key}: ${theme[key]};`)
      .join('\n\n')
  );
}

/**
 * Transform theme tokens into a React CSSProperties object
 */
export function createThemeStyleObject(theme) {
  let style = {};

  for (const key of Object.keys(theme)) {
    style[`--${key}`] = theme[key];
  }

  return style;
}

/**
 * Generate media queries for tokens
 */
export function createMediaTokenProperties() {
  return squish(
    Object.keys(media)
      .map(key => {
        return `
        @media (max-width: ${media[key]}px) {
          :root {
            ${createThemeProperties(tokens[key])}
          }
        }
      `;
      })
      .join('\n')
  );
}

const layerStyles = squish(`
  @layer theme, base, components, layout;
`);

const tokenStyles = squish(`
  :root {
    ${createThemeProperties(tokens.base)}
  }

  ${createMediaTokenProperties()}

  [data-theme='dark'] {
    ${createThemeProperties(themes.dark)}
  }

  [data-theme='light'] {
    ${createThemeProperties(themes.light)}
  }
`);

const createFontStyles = fonts => `
  @font-face {
    font-family: 'GothamBook';
    src: url('/assets/fonts/gotham-book.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'GothamBook';
    src: url('/assets/fonts/gotham-book-italic.woff2') format('woff2');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'GothamMedium';
    src: url('/assets/fonts/gotham-medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'GothamMedium';
    src: url('/assets/fonts/gotham-medium-italic.woff2') format('woff2');
    font-weight: 500;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'GothamBold';
    src: url('/assets/fonts/gotham-bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'GothamBold';
    src: url('/assets/fonts/gotham-bold-italic.woff2') format('woff2');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'IPA Gothic';
    src: url('/assets/fonts/ipa-gothic.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;

export const fontStyles = createFontStyles(fonts);

export const themeStyles = squish(`
  ${layerStyles}

  @layer theme {
    ${tokenStyles}
    ${fontStyles}
  }
`);
