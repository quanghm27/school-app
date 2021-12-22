<script>
export default {
  name: 'MSTabs',
  watch: {},
  props: {
    value: {
      required: true,
      default: 0,
      type: Number,
    },
    tabName: {
      required: false,
      default: 'announce',
      type: String,
    },
  },
  computed: {
    childTabsPropsData() {
      const childTabs = this.$slots.default.map(sChild => {
        return sChild.componentOptions ? sChild.componentOptions.propsData : null
      })
      return childTabs.filter(Boolean)
    },
  },
  methods: {
    onSelect(tabId) {
      if (this.value === tabId) return

      this.$emit('input', tabId)
    },
  },
  render() {
    return (
      <div>
        {this.tabName === 'announce' ? (
          <div class="tab">
            <ul class="u-tb">
              {this.childTabsPropsData.map((tab, tabId) => {
                return (
                  <li
                    key={tabId}
                    class={['tab-item', { 'is-active': this.value === tabId }]}
                    v-on:click={() => this.onSelect(tabId)}
                  >
                    <a class="tab-link">
                      <span>{tab.name}</span> {tab.isNew && <span class="icon-new">{this.$t('text_new')}</span>}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : (
          <div class="showDaySwipe">
            <div class="daySwipe">
              <div class="u-swipe" id="daySwipe">
                <div class="u-swipeArea">
                  {this.childTabsPropsData.map((tab, tabId) => {
                    return (
                      <div
                        key={tabId}
                        class={{
                          'is-active': this.value === tabId,
                          'is-new': tab.isNew,
                          'u-swipe-item': true,
                        }}
                      >
                        <a class="u-swipe-link" v-on:click={() => this.onSelect(tabId)}>
                          <span>{tab.name}</span>
                        </a>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        {this.$slots.default.map((vNode, index) => {
          if (index === this.value) {
            return vNode
          }
        })}
      </div>
    )
  },
}
</script>
