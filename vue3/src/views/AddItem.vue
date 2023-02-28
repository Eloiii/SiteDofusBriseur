<template>
  <v-dialog persistent :value="props.value" width="1000">
    <v-card max-width="1000">
      <v-card-title>Ajouter un item</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field label="Nom" required v-model="name"></v-text-field>
          <div v-for="(carac, counter) in listCaracs" v-bind:key="counter">
            <v-row justify="center">
              <v-col cols="18" md="5">
                <v-autocomplete
                  auto-select-first
                  clearable
                  :items="items"
                  label="Caracteristique"
                  v-model="carac.caracName"
                ></v-autocomplete>
              </v-col>
              <v-col cols="18" md="5">
                <v-text-field
                  label="Valeur"
                  required
                  v-model="carac.caracValue"
                ></v-text-field>
              </v-col>
              <v-col cols="18" md="1" style="padding-top: 30px">
                <v-btn depressed small dark @click="removeCarac(counter)">
                  <v-icon dark left> mdi-minus-circle</v-icon>
                  Retirer
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="success"
          @click="
            addItem();
            $emit('input', false);
          "
          v-if="listCaracs.length > 0"
        >Ajouter l'item
        </v-btn
        >
        <v-spacer/>
        <v-btn @click="addCarac">Ajouter une caracteristique</v-btn>
        <v-spacer/>
        <v-btn elevation="3" color="error" @click="$emit('input', false)"
        >Fermer
        </v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>

import {ref} from "vue";

const props = defineProps(['value'])

const name = ref("")
const listCaracs = ref([])
const items = ref([
  "PA",
  "PM",
  "Initiative",
  "Vitalité",
  "PO",
  "Invocation",
  "Prospection",
  "Sagesse",
  "Force",
  "Intelligence",
  "Chance",
  "Agilité",
  "Esquive PA",
  "Esquive PM",
  "Tacle",
  "Fuite",
  "Puissance",
  "Dommages",
  "Dommages Terre",
  "Dommages Feu",
  "Dommages Eau",
  "Dommages Air",
  "Dommages Neutre",
  "Dommages distance",
  "Dommages poussée",
  "Dommages pièges",
  "Dommages mêlée",
  "Dommages sort",
  "Pods",
  "Critiques",
  "Soins",
  "Renvoi",
  "Resistance Poussée",
  "Resistance % Terre",
  "Resistance % Feu",
  "Resistance % Eau",
  "Resistance % Air",
  "Resistance % Neutre",
  "Resistance fixe Terre",
  "Resistance fixe Feu",
  "Resistance fixe Eau",
  "Resistance fixe Air",
  "Resistance fixe Neutre",
  "Esquive PA",
  "Esquive PM",
  "Retrait PA",
])

async function addItem() {
  let res = {};
  res["name"] = name.value;
  for (const carac of listCaracs.value) {
    let nom = carac.caracName;
    res[nom] = carac.caracValue;
  }
  await PostService.insertPost(res);
}

function addCarac() {
  listCaracs.value.push({caracName: "", caracValue: ""});
}

function removeCarac(counter) {
  listCaracs.value.splice(counter, 1);
}
</script>
