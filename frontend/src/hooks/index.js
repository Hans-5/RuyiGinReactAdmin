/**
 * Hooks barrel — import from here in new code:
 *   import { useMenu, useApiData } from '../hooks'
 *
 * Legacy imports from hooks/useCommon.js continue to work via
 * the useCommon shim — no existing files need updating.
 */
export { useMenu }    from './useMenu'
export { useApiData } from './useApiData'
