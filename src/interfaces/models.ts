import {
  EntityType,
  Location,
  NameCheckAnalysisJurisdiction,
  NameCheckAnalysisType,
  NrState,
  PriorityCode,
  RequestCode
} from '@/enums'

export type SubmissionTypeT = 'examination' | 'consent' | 'normal'

export interface AnalysisJSONI {
  header?: string
  issues: IssueI[]
  status: 'fa' | 'rc' | 'ar'
}

export interface ApplicantI {
  addrLine1: string
  addrLine2?: string
  addrLine3?: string
  city: string
  clientFirstName?: string
  clientLastName?: string
  contact: string
  countryTypeCd: string
  declineNotificationInd?: string
  emailAddress: string
  faxNumber?: string
  firstName: string
  lastName: string
  middleName?: string
  partyId?: number | string
  phoneNumber?: string
  postalCd: string
  stateProvinceCd: string
}

export interface ConditionalReqI {
  additionalInfo: string
  applicants: [ ApplicantI ]
  corpNum?: string
  english: boolean
  entity_type_cd: string
  homeJurisNum?: string
  id?: number
  nameFlag: boolean
  names: RequestNameI[]
  natureBusinessInfo: string
  previousRequestId?: string
  priorityCd: PriorityCode
  request_action_cd: RequestCode
  request_type_cd?: string
  stateCd: NrState.COND_RESERVED
  submit_count: number
  tradeMark: string
  xproJurisdiction?: string
  hotjarUserId?: string
}

export interface ConsentConflictI {
  name: string
  [propName: string]: any // excess properties
}

// NB: this is similar to EntityI
export interface ConversionTypesI {
  blurbs?: string[]
  desc?: string
  entity_type_cd?: EntityType
  rank?: number
  short?: string
  shortlist?: boolean
  text: string
  value: string
}

export interface DraftReqI {
  additionalInfo?: string
  applicants: [ ApplicantI ]
  corpNum?: string
  english: boolean
  entity_type_cd: string
  homeJurisNum?: string
  id?: number
  nameFlag: boolean
  names: RequestNameI[]
  natureBusinessInfo?: string
  previousRequestId?: string
  priorityCd: PriorityCode
  request_action_cd: RequestCode
  stateCd: NrState.DRAFT
  submit_count: number
  tradeMark?: string
  xproJurisdiction?: string
  request_type_cd?: string
  hotjarUserId?: string
}

export interface EntityI {
  blurbs?: string | string[] | string[][] // FUTURE: clean up return type; also below
  intBlurbs?: string[]
  mveBlurbs?: string[]
  rehBlurbs?: string[]
  amlBlurbs?: string[] | string[][]
  chgBlurbs?: string[] | string[][]
  cat?: string
  rank?: number
  shortlist?: boolean
  text: string
  value: EntityType
}

export interface ExistingRequestSearchI {
  emailAddress?: string
  nrNum: string
  phoneNumber?: string
}

export interface IssueI {
  conflicts?: {
    name: string
    date: string
  }
  consenting_body?: {
    name: string
    contact: string
  }
  designations?: string[]
  issue_type: string
  line1?: string
  line2?: string
  name_actions?: [
    {
      index: number
      message ?: string
      position ?: 'start' | 'end'
      type: 'brackets' | 'highlight' | 'spelling' | 'strike'
      word: string
    }
  ]
  setup: SetupI[]
  show_examination_button: boolean
  show_reservxe_button: boolean
}

export interface NameDesignationI {
  designation: string
  name: string
}

export interface NameRequestI {
  [propName: string]: any // excess properties
}

export interface NewRequestNameSearchI {
  analysis_type: NameCheckAnalysisType
  jurisdiction: NameCheckAnalysisJurisdiction
  entity_type_cd: string
  location: Location
  name: string
  request_action_cd: RequestCode
  request_type_cd?: string
}

export interface OptionI {
  button?: string
  checkbox?: string
  header: string
  label?: string
  line1: string
  line2?: string
  type: string
}

interface QuillAttributesI {
  color: string
  strike?: boolean
}

export interface QuillOpsI {
  insert: string
  attributes?: QuillAttributesI
}

export interface RequestActionMappingI {
  [propName: string]: string[] // misc properties that are arrays of strings
}

export interface RequestActionsI {
  text: string
  value: RequestCode
  blurbs?: string
  rank?: number
  shortDesc?: string
}

export interface RequestNameI {
  id?: number
  choice: number
  name: string
  name_type_cd: string
  designation: string
  consent_words: '' | string[]
  conflict1: string
  conflict1_num: string
  request_type_cd?: string
}

export interface ReservedReqI {
  id?: number
  additionalInfo: string
  applicants: [ ApplicantI ]
  corpNum?: string
  english: boolean
  entity_type_cd: string
  homeJurisNum?: string
  nameFlag: boolean
  names: RequestNameI[]
  natureBusinessInfo: string
  previousRequestId?: string
  priorityCd: PriorityCode
  request_action_cd: RequestCode
  stateCd: NrState.RESERVED
  submit_count: number
  tradeMark: string
  xproJurisdiction?: string
  hotjarUserId?: string
}

export interface SearchDataI {
  emailAddress?: string
  name?: string
  nrNumber?: string
  phoneNumber?: string
}

export interface SelectionI {
  index?: number
  length?: number
}

export interface SelectOptionsI {
  text: string
  value: any
  [propName: string]: any // excess properties
}

export interface SetupI {
  button?: 'examine' | 'reserve' | 'consent-body' | 'consent-corp' | 'restart' | 'next'
  checkbox?: 'examine' | 'consent-corp' | 'consent-body'
  header: string
  text1: string
  text2?: string
}

export interface StatsI {
  auto_approved_count: number
  priority_wait_time: number
  regular_wait_time: number
}

export interface WaitingAddressSearchI {
  text: string
  value: string
}

// For advanced search query where all parameters *values* are optional
export interface AdvancedSearchI {
  compName: string
  firstName: string
  lastName: string
  submittedStartDate: string
  submittedEndDate: string
}

// The complete results from advanced nr search
export interface AdvancedSearchResultsI {
  nameRequests: NameRequestI
  response: AdvancedSearchResponseI
}

// Meta data on the advanced search results
export interface AdvancedSearchResponseI {
  numFound: number
  numPriorities: number
  numUpdatedToday: number
  order: string
  queue: number
  rows: number
  start: number
}

// Used for Date collection subcomponent. Both are required when collecting dates.
export interface StartEndDatesI {
  startDate: string
  endDate: string
}
