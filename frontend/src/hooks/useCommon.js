/**
 * @deprecated Import directly from the individual hook files or from
 * the barrel (hooks/index.js):
 *
 *   import { useMenu }    from '../hooks/useMenu'
 *   import { useApiData } from '../hooks/useApiData'
 *   import { useMenu, useApiData } from '../hooks'
 *
 * This shim exists for backwards compatibility and will be removed
 * in a future cleanup phase.
 */
export { useMenu }    from './useMenu'
export { useApiData } from './useApiData'
