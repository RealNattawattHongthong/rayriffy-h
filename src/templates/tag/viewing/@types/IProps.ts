import { IDatabaseTag } from '../../../../core/@types/IDatabaseTag'
import { IFetchedRaw } from '../../../../core/@types/IFetchedRaw'
import { ITag } from '../../../../core/@types/ITag'

export interface IProps {
  pageContext: {
    raw: IFetchedRaw[]
    page: {
      current: number
      max: number
    }
    prefix: string
    tag: ITag
    tagStack: IDatabaseTag[]
    subtitle: string
  }
}
