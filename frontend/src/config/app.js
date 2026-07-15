/**
 * Application-level configuration.
 *
 * Secondary developers: customise these values for your project.
 * Header.jsx and other shell components read from here — you should
 * not need to touch those files just to rebrand the template.
 */

export const appConfig = {
  /** Displayed in the header and browser tab title (future). */
  name: 'Ruyi Gin React Admin',

  /** Short name used where space is limited. */
  shortName: 'Ruyi Admin',

  /** Semantic version — update when shipping releases. */
  version: '0.2.0',

  /** Default username shown in the header before auth is wired up. */
  defaultUser: 'Admin',

  /**
   * Primary brand color — metadata only.
   * This value is NOT injected into CSS at runtime.
   * To change the UI color, edit --primary-color in assets/theme.css.
   * Keep this in sync with that variable manually.
   */
  primaryColor: '#1890ff',
}
