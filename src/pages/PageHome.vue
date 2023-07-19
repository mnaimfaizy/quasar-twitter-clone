<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class="row q-py-lg q-px-md items-end q-col-gutter-md">
        <div class="col">
          <q-input
          bottom-slots
          v-model="newQweetContent"
          placeholder="What's happening"
          counter
          maxlength="280"
          autogrow
          class="new-qweet"
        >
          <template v-slot:before>
            <q-avatar size="xl">
              <img src="https://cdn.quasar.de/img/avatar5.jpg" />
            </q-avatar>
          </template>
        </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
              :disabled="!newQweetContent"
              unelevated
              rounded
              no-caps
              color="primary"
              label="Qweet"
              class="q-mb-lg"
              @click="addNewQweet"
            />
        </div>
      </div>

      <q-separator class="divider" size="10px" color="grey-2" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
            <q-item
              class="q-py-md qweet"
              v-for="qweet in qweets"
              :key="qweet.date"
            >
              <q-item-section avatar top>
                <q-avatar size="xl">
                  <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-subtitle1">
                  <strong>Naim Faizy</strong>
                  <span class="text-gray-7">
                    @naimSoft
                    <br class="lt-md" />&bull; {{  formatDistance(qweet.date, new Date()) }}
                  </span>
                </q-item-label>
                <q-item-label class="qweet-content text-body1">
                  {{ qweet.content }}
                </q-item-label>
                <div class="row qweet-icons justify-between q-mt-sm">
                  <q-btn
                    flat
                    round
                    color="grey"
                    size="sm"
                    icon="far fa-comment"
                  />
                  <q-btn flat round color="grey" size="sm" icon="fas fa-retweet" />
                  <q-btn flat round color="grey" size="sm" icon="far fa-heart" />
                  <q-btn
                    flat
                    round
                    color="grey"
                    size="sm"
                    icon="fas fa-trash"
                    @click="deleteQweet(qweet)"
                  />
                </div>
              </q-item-section>
            </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { formatDistance } from 'date-fns'

export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      formatDistance,
      newQweetContent: '',
      qweets: [
        {
          content: 'Lorem ipsum dolor sit amet, consectetur',
          date: 1689696263435
        },
        {
          content: 'Lorem ipsum dolor sit amet, consectetur',
          date: 1689696288566
        },
        {
          content: 'Lorem ipsum dolor sit amet, consectetur',
          date: 1689696294905
        },
        {
          content: 'Lorem ipsum dolor sit amet, consectetur',
          date: 1689696303785
        },
      ]
    }
  },
  methods: {
    addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
      }

      this.qweets.unshift(newQweet);
      this.newQweetContent = '';
    },
    deleteQweet(qweet) {
      let dateToDelete = qweet.date
      let index = this.qweets.findIndex(qweet => qweet.date === dateToDelete)
      this.qweets.splice(index, 1);
    }
  }
})
</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.qweet-content
  white-space: pre-line
.qweet-icons
  margin-left: -5px
.qweet:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)
</style>
