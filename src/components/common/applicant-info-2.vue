<template>
  <v-form v-model="isValid" ref="step2" id="applicant-info-2-form">
    <v-container fluid class="pa-0 mt-5" id="applicant-info-2">
      <v-row>
        <v-col cols="12" md="2" lg="2" class="h6 align-self-start pt-0">Contact Info</v-col>
        <v-col cols="12" md="5" lg="5" class="py-0">
          <v-text-field :messages="messages['email']"
                        :rules="emailRules"
                        :value="getApplicant.emailAddress"
                        @blur="messages = {}"
                        @input="updateApplicant('emailAddress', $event)"
                        id="emailAddress"
                        filled
                        hide-details="auto"
                        :name="Math.random()"
                        autocomplete="chrome-off"
                        label="Email Address (for notifications)" />
        </v-col>
        <v-col cols="5" class="py-0" />
      </v-row>

      <v-row>
        <v-col cols="12" md="2" lg="2" />
        <v-col cols="12" md="5" lg="5">
          <v-text-field :messages="messages['phone']"
                        :value="getApplicant.phoneNumber"
                        type="tel"
                        :rules="phoneRules"
                        @blur="messages = {}"
                        @input="updateApplicant('phoneNumber', $event.trim())"
                        id="phoneNumber"
                        :name="Math.random()"
                        autocomplete="chrome-off"
                        filled
                        hide-details="auto"
                        label="Phone Number" />
        </v-col>
        <v-col cols="12" md="5" lg="5">
          <v-text-field :messages="messages['fax']"
                        :value="getApplicant.faxNumber"
                        :rules="faxRules"
                        @blur="messages = {}"
                        @input="updateApplicant('faxNumber', $event)"
                        id="faxNumber"
                        :name="Math.random()"
                        autocomplete="chrome-off"
                        filled
                        hide-details="auto"
                        label="Fax Number (Optional)" />
        </v-col>
      </v-row>

      <v-row v-if="showAllFields">
        <v-col cols="12" md="2" lg="2" class="h6">About Your Business</v-col>
        <v-col cols="12" md="5" lg="5" align-self="start">
          <v-tooltip top
            content-class="top-tooltip"
            transition="fade-transition"
            :disabled="isMobile"
          >
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-textarea :messages="messages['nature']"
                            :rules="businessNatureRules"
                            :value="getNrData.natureBusinessInfo"
                            @blur="messages = {}"
                            @input="updateNrData('natureBusinessInfo', $event)"
                            id="natureBusinessInfo"
                            name="natureBusinessInfo"
                            filled
                            hide-details="auto"
                            label="Nature of Business"
                            no-resize
                            rows="3" />
              </div>
            </template>
            <span>
              Nature of business information collected is for name review purposes only.
              What is entered here does not limit the business activities of your company.
            </span>
          </v-tooltip>
        </v-col>
        <v-col cols="12" md="5" lg="5" align-self="start">
          <v-tooltip top
            content-class="top-tooltip"
            transition="fade-transition"
            :disabled="isMobile"
          >
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-textarea :messages="messages['additional']"
                            :value="getNrData.additionalInfo"
                            :rules="additionalInfoRules"
                            @blur="messages = {}"
                            @input="updateNrData('additionalInfo', $event)"
                            id="additionalInfo"
                            name="additionalInfo"
                            filled
                            hide-details="auto"
                            label="Additional Information (Optional)"
                            no-resize
                            rows="3" />
              </div>
            </template>
            <span>
              Enter information you think Registries staff should know to help them review your
              name such as details regarding previous name requests, related business, etc.
            </span>
          </v-tooltip>
        </v-col>
        <v-col cols="12" md="2" lg="2" />
        <v-col cols="12" md="5" lg="5" v-if="getShowCorpNum === CorpNumRequests.COLIN">
          <v-tooltip top
            content-class="top-tooltip"
            transition="fade-transition"
            :disabled="isMobile"
          >
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-text-field :messages="messages['corpNum']"
                              :rules="corpNumRules"
                              :error-messages="corpNumError"
                              @focus="corpNumError = ''"
                              :loading="loading"
                              filled
                              :label="corpNumFieldLabel"
                              v-model="corpNum">
                </v-text-field>
              </div>
            </template>
            <span>
              Enter the BC incorporation number of your business.
            </span>
          </v-tooltip>
        </v-col>
        <v-col cols="12" md="5" lg="5">
          <v-tooltip top
            content-class="top-tooltip"
            transition="fade-transition"
            :disabled="isMobile"
          >
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-text-field :messages="messages['tradeMark']"
                              :value="getNrData.tradeMark"
                              :rules="trademarkRules"
                              @blur="messages = {}"
                              @input="updateNrData('tradeMark', $event)"
                              id="tradeMark"
                              :name="Math.random()"
                              autocomplete="chrome-off"
                              filled
                              hide-details="auto"
                              label="Registered Canadian Trademark (Optional)" />
              </div>
            </template>
            <span>
              If your name is a registered trademark in Canada, enter your trademark name and registration number.
            </span>
          </v-tooltip>
        </v-col>
      </v-row>

      <v-row class="mt-2">
        <v-col cols="12" md="2" lg="2" />
        <v-col cols="12" md="5" lg="5">
          <v-tooltip top
            content-class="top-tooltip"
            transition="fade-transition"
            :disabled="isMobile"
          >
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-checkbox
                  v-if="getShowPriorityRequest"
                  hide-details
                  v-model="priorityRequest"
                  class="mt-0 pt-0"
                >
                  <template v-slot:label>
                    <span>Make this a Priority Request <b>($100.00)</b></span>
                  </template>
                </v-checkbox>
              </div>
            </template>
            <span>
              Priority name requests are typically reviewed within 1-2 business days.
            </span>
          </v-tooltip>
        </v-col>
        <ApplicantInfoNav @nextAction="nextAction()" />
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ApplicantInfoNav from '@/components/common/applicant-info-nav.vue'
import { Action, Getter } from 'vuex-class'
import { ApplicantI } from '@/interfaces'
import { ActionBindingIF } from '@/interfaces/store-interfaces'
import { CorpNumRequests, NrState, RequestCode } from '@/enums'

@Component({
  components: {
    ApplicantInfoNav
  }
})
export default class ApplicantInfo2 extends Vue {
  // Global getters
  @Getter getCorpNum!: string
  @Getter getApplicant!: ApplicantI
  @Getter getPriorityRequest!: boolean
  @Getter getEditMode!: boolean
  @Getter getNrData!: any
  @Getter getNrState!: string
  @Getter getRequestActionCd!: RequestCode
  @Getter getShowPriorityRequest!: boolean
  @Getter getShowCorpNum!: string
  @Getter isMobile!: boolean

  // Global actions
  @Action setCorpNum!: ActionBindingIF
  @Action setPriorityRequest!: ActionBindingIF
  @Action fetchCorpNum!: ActionBindingIF
  @Action setApplicantDetails: ActionBindingIF
  @Action submit!: ActionBindingIF
  @Action setNRData!: ActionBindingIF
  @Action setIsLoadingSubmission!: ActionBindingIF

  // Enum declaration
  readonly CorpNumRequests = CorpNumRequests

  corpNumError: string = ''
  corpNumFieldLabel = 'Incorporation or Registration Number'
  additionalInfoRules = [
    v => (!v || v.length <= 120) || 'Cannot exceed 120 characters'
  ]
  businessNatureRules = [
    v => !!v || 'Required field',
    v => (!v || v.length <= 1000) || 'Cannot exceed 1000 characters'
  ]
  corpNumRules = [
    v => !!v || 'Required field',
    v => (!v || v.length > 3) || 'Must be at least 4 characters'
  ]
  emailRules = [
    (v: string) => !!v || 'Required field',
    (v: string) => {
      // eslint-disable-next-line max-len
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(v) || 'Not a valid email'
    },
    (v: string) => (!v || v.length <= 75) || 'Cannot exceed 75 characters'
  ]
  phoneRules = [
    v => !!v || 'Required field',
    v => (!v || v.length <= 30) || 'Cannot exceed 30 characters'
  ]
  faxRules = [
    v => (!v || v.length <= 30) || 'Cannot exceed 30 characters'
  ]
  trademarkRules = [
    v => (!v || v.length <= 100) || 'Cannot exceed 100 characters'
  ]
  error: boolean = false
  isEditingCorpNum: boolean = false
  isValid: boolean = false
  hideCorpNum: boolean | 'auto' = true
  loading: boolean = false
  messages = {}

  mounted () {
    // Apply optional corpNum validations for Amalgamations as they are NOT a required field but require COLIN lookup.
    if (this.getRequestActionCd === RequestCode.AML) {
      this.corpNumFieldLabel += ' (Optional)'
      this.corpNumRules = [
        v => (!v || v.length > 3) || 'Must be at least 4 characters'
      ]
    }
  }

  @Watch('xproJurisdiction')
  async hanldeJurisdiction (newVal, oldVal) {
    if (newVal !== oldVal) {
      await this.$nextTick()
      this.validate()
    }
  }

  get corpNum () {
    return this.getCorpNum
  }

  set corpNum (num) {
    this.setCorpNum(num)
  }

  get priorityRequest (): boolean {
    return this.getPriorityRequest
  }

  set priorityRequest (value: boolean) {
    this.setPriorityRequest(value)
  }

  get showAllFields (): boolean {
    return (!this.getEditMode || this.getNrState === NrState.DRAFT)
  }

  get xproJurisdiction () {
    return (this.getNrData || {}).xproJurisdiction
  }

  async validateCorpNum (num) {
    this.isEditingCorpNum = false
    if (!num || num.length < 4) {
      return false
    }
    this.loading = true
    try {
      await this.fetchCorpNum(num)
      this.corpNumError = ''
      this.loading = false
      return true
    } catch (error) {
      this.corpNumError = 'Error validating number. Please try again.'
      this.loading = false
      return false
    }
  }

  setError (error) {
    this.error = error
  }

  updateApplicant (key, value) {
    this.setApplicantDetails({ key, value })
  }

  updateNrData (key, value) {
    this.setNRData({ key, value })
  }

  validate () {
    if (this.hideCorpNum !== 'auto') {
      this.hideCorpNum = 'auto'
    }
    if (this.$refs.step2 as Vue) {
      (this.$refs.step2 as any).validate()
    }
  }

  @Watch('isValid')
  onValidChanged (val: boolean) {
    if (val) {
      this.$nextTick(() => {
        if (this.$el?.querySelector instanceof Function) {
          // add classname to button text (for more detail in Sentry breadcrumbs)
          const selfReviewBackBtn = this.$el.querySelector('.submit-back-btn > span')
          if (selfReviewBackBtn) selfReviewBackBtn.classList.add('self-review-back-btn')
          const selfReviewConfirmBtn = this.$el.querySelector('.submit-continue-btn > span')
          if (selfReviewConfirmBtn) selfReviewConfirmBtn.classList.add('self-review-confirm-btn')
        }
      })
    }
  }

  async nextAction () {
    this.setIsLoadingSubmission(true)
    this.validate()
    if (this.getShowCorpNum === CorpNumRequests.COLIN) {
      this.$root.$emit('showSpinner', true)
      await this.validateCorpNum(this.getCorpNum)
      this.$root.$emit('showSpinner', false)
    }
    if (this.isValid && !this.corpNumError) {
      await this.submit(null)
    }
    // hang on to the loading state for a bit
    // to prevent users clicking button again while next component displays
    setTimeout(() => this.setIsLoadingSubmission(false), 1000)
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-textarea textarea {
  line-height: 1.375rem !important;
  font-size: 0.875rem !important;
}
</style>
