import axios from "axios";

const url = "http://localhost:1212/api/posts";

class PostService {
  static getPosts() {
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

  static insertPost(text) {
    return axios.post(url, {
      text,
    });
  }
}

export default PostService;
