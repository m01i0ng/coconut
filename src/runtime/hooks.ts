import { createContext, useContext } from 'react'
import { PageData } from '../shared/types'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const DataContext = createContext({} as PageData)

export const usePageData = () => {
  return useContext(DataContext)
}
