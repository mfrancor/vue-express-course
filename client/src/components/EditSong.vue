<template>
  <div>
    <v-layout>
      <v-flex xs4>
        <panel title="Dados da Música">
          <v-text-field
            label="Título"
            required
            :rules="[required]"
            v-model="song.title"
          ></v-text-field>
          <v-text-field
            label="Artista"
            required
            :rules="[required]"
            v-model="song.artist"
          ></v-text-field>
          <v-text-field
            label="Estilo"
            v-model="song.genre"
          ></v-text-field>
          <v-text-field
            label="Álbum"
            v-model="song.album"
          ></v-text-field>
          <v-text-field
            label="Url da imagem"
            v-model="song.albumImageUrl"
          ></v-text-field>
          <v-text-field
            label="Id YouTube"
            v-model="song.youtubeId"
          ></v-text-field>
        </panel>
      </v-flex>

      <v-flex xs8>
        <panel title="Detalhes" class="ml-2">
          <v-text-field
              label="Tab"
              multi-line
              v-model="song.tab"
            ></v-text-field>
          <v-text-field
              label="Letra"
              multi-line
              v-model="song.lyrics"
            ></v-text-field>
        </panel>
        <div class="danger-alert" v-if="error">
          {{error}}
        </div>
        <v-btn
          dark
          class="cyan"
          @click="save">
          Salvar Música
        </v-btn>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      song: null,
      error: null,
      required: (value) => !!value || 'Preenchimento obrigatório'
    }
  },
  components: {
    Panel
  },
  methods: {
    async save () {
      this.error = null
      const camposObrigatorios = ['title', 'artist']
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => camposObrigatorios.indexOf(key) < 0 || !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Preencha todos os campos obrigatórios'
        return
      }
      try {
        const songId = this.$store.state.route.params.songId
        await SongsService.put(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: songId
          }
        })
      } catch (error) {
        this.error = error
      }
    }
  },

  async mounted () {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>
.danger-alert{
  color:red
}
</style>
