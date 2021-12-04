import { original } from './original'

import { data2020_11 } from './months/2020-11'
import { data2020_12 } from './months/2020-12'
import { data2021_01 } from './months/2021-01'
import { data2021_02 } from './months/2021-02'
import { data2021_03 } from './months/2021-03'
import { data2021_04 } from './months/2021-04'
import { data2021_05 } from './months/2021-05'
import { data2021_06 } from './months/2021-06'
import { data2021_07 } from './months/2021-07'
import { data2021_08 } from './months/2021-08'
import { data2021_09 } from './months/2021-09'
import { data2021_10 } from './months/2021-10'
import { data2021_11 } from './months/2021-11'
import { data2021_12 } from './months/2021-12'

import { DatabaseCode } from '../@types/DatabaseCode'

export const codes: DatabaseCode[] = original
  .concat(data2020_11)
  .concat(data2020_12)
  .concat(data2021_01)
  .concat(data2021_02)
  .concat(data2021_03)
  .concat(data2021_04)
  .concat(data2021_05)
  .concat(data2021_06)
  .concat(data2021_07)
  .concat(data2021_08)
  .concat(data2021_09)
  .concat(data2021_10)
  .concat(data2021_11)
  .concat(data2021_12)
