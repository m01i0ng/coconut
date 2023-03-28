import { join } from 'path'

export const PACKAGE_ROOT = join(__dirname, '..', '..', '..')
export const DEFAULT_TEMPLATE_PATH = join(PACKAGE_ROOT, 'template.html')

export const CSR_ENTRY_PATH = join(PACKAGE_ROOT, 'src', 'runtime', 'csr-entry.tsx')
export const SSR_ENTRY_PATH = join(PACKAGE_ROOT, 'src', 'runtime', 'ssr-entry.tsx')
