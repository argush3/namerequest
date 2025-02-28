<template>
  <v-dialog v-model="dialog" width="45rem" persistent :attach="attach" content-class="payment-error-dialog">
    <v-card>
      <v-card-title id="dialog-title">Unable to Process Payment</v-card-title>

      <v-card-text id="dialog-text">
        <!-- display common message -->
        <div class="general-error" v-if="numErrors == 0">
          <p>We are unable to process your payment at this time.</p>
        </div>

        <!-- display errors -->
        <div class="general-error mb-4" v-else>
          <p>We were unable to process your payment due to the following error(s):</p>
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>

        <!-- display warnings-->
        <div class="general-error mb-4" v-if="numWarnings > 0">
          <p>Please note the following warning(s):</p>
          <ul>
            <li v-for="(warning, index) in warnings" :key="index">{{ warning }}</li>
          </ul>
        </div>

      </v-card-text>

      <v-divider class="my-0"></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn id="dialog-exit-button" class="dialog-close" text @click="close()">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({})
export default class StaffPaymentErrorDialog extends Vue {
  /** Prop to display the dialog. */
  @Prop() private dialog: boolean

  /** Prop to provide attachment selector. */
  @Prop() private attach: string

  /** Prop containing error messages. */
  @Prop({ default: () => [] }) private errors: string[]

  /** Prop containing warning messages. */
  @Prop({ default: () => [] }) private warnings: string[]

  /** Pass click event to parent. */
  @Emit() private close () { }

  /** The number of errors in the passed-in array. */
  private get numErrors (): number {
    return this.errors?.length || 0
  }

  /** The number of warnings in the passed-in array. */
  private get numWarnings (): number {
    return this.warnings?.length || 0
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/theme.scss";

.v-dialog {
  margin: 2rem;

  .v-card {
    padding: 0;

    .v-card__title {
      padding: 1.25rem 1.5rem;
      color: $BCgovFontColorInverted;
      background: $BCgovBlue5;
      font-size: 1.125rem;
      font-weight: bold;
      margin: 0;
    }

    .v-card__text {
      padding: 1.5rem !important;
      font-weight: 300;
      color: $gray7 !important;
      font-size: 1rem;
    }

    .v-card__actions {
      padding: 1rem;
    }
  }
}
</style>
