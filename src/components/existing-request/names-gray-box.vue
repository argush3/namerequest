<template>
  <div id="names-container" class="bg-light-gray">
    <div class="px-5 py-4 text-name">
      <v-tooltip v-for="name of names" :key="name.choice"
        transition="fade-transition" right content-class="tooltip" :disabled="isMobile"
      >
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on" :class="getClass(name)" class="cursor-default">
            <span>{{name.choice}}.</span>&nbsp;
            <span class="dotted-underline">{{name.name}}</span>&nbsp;
            <v-icon v-if="getIcon(name)" class="mt-n1" :class="getClass(name)">
              {{ getIcon(name) }}
            </v-icon>
          </div>
        </template>
        {{ getTooltipText(name) }}
      </v-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { NameState } from '@/enums'

@Component({})
export default class NamesGrayBox extends Vue {
  // Global getter
  @Getter isMobile!: boolean

  // enum used in the template
  NameState = NameState

  @Prop({ default: () => [] })
  readonly names: any[]

  private getTooltipText (name: any): string {
    switch (name.state) {
      case NameState.APPROVED: return 'Approved for use.'
      case NameState.CONDITIONAL: return `Approved for use.`
      case NameState.NOT_EXAMINED: return `Not reviewed. ${name.decision_text}`
      case NameState.REJECTED: return `Rejected. ${name.decision_text}`
      default: return ''
    }
  }

  private getIcon (name:any): string {
    switch (name.state) {
      case NameState.APPROVED: return 'mdi-check'
      case NameState.CONDITIONAL: return 'mdi-check'
      case NameState.NOT_EXAMINED: return ''
      case NameState.REJECTED: return 'mdi-close'
      default: return ''
    }
  }

  private getClass (name: any): string {
    switch (name.state) {
      case NameState.APPROVED: return 'approved'
      case NameState.CONDITIONAL: return 'approved'
      case NameState.NOT_EXAMINED: return ''
      case NameState.REJECTED: return 'rejected'
      default: return ''
    }
  }
}
</script>

<style lang="scss" scoped>
#names-container {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
}

.tooltip {
  width: unset !important;
  max-width: 270px;
}
</style>
