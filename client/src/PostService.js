import axios from "axios";

const url = "/api/posts";

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
}

export default PostService;
