import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://701b5a20-b241-4286-b767-8173b8566bfd-bluemix.cloudant.com/mydb',
  timeout: 10000,
  headers: {
    Authorization:
      'Basic bXVuZGVwdGVyYmVhcmVueWJydWNoYXN0OmQwZmE2ODgxM2U2ZTAwYzlkMTJjOTcwMWIwNGVjNzg4MjVkZmQyZDM=',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export function getAxiosInstance() {
  return instance;
}

export function updateStudent(data) {
  return instance
    .put(`/${data._id}`, JSON.stringify(data))
    .then(function(response) {
      console.log('updateStudent');
      console.log(response.data);
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
}

// add return to the instance call to "wait"
export function getAllStudent() {
  return dispatch => {
    var data = {
      selector: {
        _id: { $gt: 0 }, // retrieve's all data
      },
      fields: ['_id', '_rev', 'name', 'dob'], // retrieves the "columns"
    };
    // forced to use "post -> data search", bec getAlldocs will only return "all ids"
    return instance
      .post('/_find', JSON.stringify(data))
      .then(function(response) {
        let student = [];
        student = [...response.data.docs];
        console.log(student);
        // once we have all the data in the array "student", call the action "loadStudentList"
        dispatch(loadStudentList(student));
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
}

export function loadStudentList(post) {
  // calling an action will automatically call "reducer"
  return {
    type: 'GET_ALL_STUDENT',
    post: post,
  };
}
