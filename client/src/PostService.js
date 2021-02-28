import axios from "axios";

const url = "/api/posts";
const urlCoef = "/api/posts/coef";
const urlHistorique = "/api/posts/historique";

class PostService {
  static getRunes() {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          const data = res.data;
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getAllEquipments() {
    return new Promise((resolve, reject) => {
      axios
        .get("https://fr.dofus.dofapi.fr/equipments")
        .then((res) => {
          const data = res.data;
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getAllWeapons() {
    return new Promise((resolve, reject) => {
      axios
        .get("https://fr.dofus.dofapi.fr/weapons")
        .then((res) => {
          const data = res.data;
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static insertRune(text) {
    return axios.post(url, {
      text,
    });
  }

  static getCoefs() {
    return new Promise((resolve, reject) => {
      axios
        .get(urlCoef)
        .then((res) => {
          const data = res.data;
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static updateCoef(itemEtCoef) {
    return axios.post(urlCoef, {
      itemEtCoef,
    });
  }

  static getHistorique() {
    return new Promise((resolve, reject) => {
      axios
        .get(urlHistorique)
        .then((res) => {
          const data = res.data;
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static addHistorique(historique) {
    return axios.post(urlHistorique, {
      historique,
    });
  }
}

export default PostService;
