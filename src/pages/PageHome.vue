<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
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
              <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
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
              :key="qweet.id"
            >
              <q-item-section avatar top>
                <q-avatar size="xl">
                  <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
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
                  <q-btn
                    flat
                    round
                    color="grey"
                    size="sm"
                    icon="fas fa-retweet"
                  />
                  <q-btn
                    @click="toggledLiked(qweet)"
                    flat
                    round
                    :color="qweet.liked ? 'pink' : 'grey'"
                    size="sm"
                    :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                  />
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
import db from 'src/boot/firebase'
import { collection, addDoc, query, doc, onSnapshot, orderBy, deleteDoc, updateDoc } from "firebase/firestore";
import { defineComponent } from 'vue'
import { formatDistance } from 'date-fns'

export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      formatDistance,
      newQweetContent: '',
      qweets: [
        // {
        //   id: 'ID1',
        //   content: 'Lorem ipsum dolor sit amet, consectetur',
        //   date: 1689696263435,
        //   liked: false
        // },
        // {
        //   id: 'ID2',
        //   content: 'Lorem ipsum dolor sit amet, consectetur',
        //   date: 1689696288566,
        //   liked: true
        // },
        // {
        //   id: 'ID3',
        //   content: 'Lorem ipsum dolor sit amet, consectetur',
        //   date: 1689696294905,
        //   liked: false
        // },
        // {
        //   id: 'ID4',
        //   content: 'Lorem ipsum dolor sit amet, consectetur',
        //   date: 1689696303785,
        //   liked: true
        // },
      ]
    }
  },
  methods: {
    addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
        liked: false
      }

      // this.qweets.unshift(newQweet);
      addDoc(collection(db, 'qweets'), newQweet).then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      }).catch((err) => {
        console.error('Error adding document: ', err);
      });
      this.newQweetContent = '';
    },
    deleteQweet(qweet) {

      deleteDoc(doc(db, 'qweets', qweet.id)).then(() => {
        console.log('Document successfully deleted!');
      }).catch((err) => {
        console.error('Error removing document: ', err);
      })
    },
    toggledLiked(qweet) {
      updateDoc(doc(db, 'qweets', qweet.id), {
        liked: !qweet.liked
      }).then(() => {
        console.log('Document successfully updated!');
      }).catch((error) => {
        console.error('Error updating document: ', error);
      })
    }
  },
  mounted() {
    const q = query(collection(db, 'qweets'), orderBy('date'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(change => {
        let qweetChange = change.doc.data();
        qweetChange.id = change.doc.id;
        if (change.type === 'added') {
          console.log('New qweet: ' + qweetChange);
          this.qweets.unshift(qweetChange);
        }
        if (change.type === 'modified') {
          console.log('Modified qweet: ' + qweetChange);
          let index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id);
          Object.assign(this.qweets[index], qweetChange);
        }
        if (change.type === 'removed') {
          console.log('Removed qweet: ' + qweetChange);
          let index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id);
          this.qweets.splice(index, 1);
        }
      });
    });
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
