<template>
  <q-page>
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
          />
      </div>
    </div>

    <q-separator class="divider" size="10px" color="grey-2" />

    <q-list>
      <q-item class="q-py-md">
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
            </span>
          </q-item-label>
          <q-item-label class="qweet-content text-body1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Veniam harum illum aspernatur nam nesciunt nulla,

            voluptatum repudiandae aliquam consectetur dolor
            accusantium officia quidem non esse corrupti delectus
            odit est dolore.
          </q-item-label>
          <div class="row qweet-icons justify-between q-mt-sm">
            <q-btn flat round color="grey" size="sm" icon="far fa-comment" />
            <q-btn flat round color="grey" size="sm" icon="fas fa-retweet" />
            <q-btn flat round color="grey" size="sm" icon="far fa-heart" />
            <q-btn flat round color="grey" size="sm" icon="fas fa-trash" />
          </div>
        </q-item-section>

        <q-item-section side top>
          1 min ago
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      newQweetContent: ''
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
</style>
