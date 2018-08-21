const axios = require('axios');
const moment = require('moment');

module.exports = {
  search: (req, res) => {
    const {term} = req.query;
    axios.get(`https://gitlab.com/api/v4/users?search=${term}`, {headers: {'Private-Token': process.env.GL_KEY}})
      .then(response => {
        res.status(200).json(response.data)
      })
      .catch(err => console.log('err', err))
  },

  add: (req, res) => {
    const {studentID, assessmentID} = req.body;
    axios.post(`https://gitlab.com/api/v4/projects/${assessmentID}/members`, {user_id: studentID, access_level: 20, expires_at: moment().add(1, 'd').format('YYYY-MM-DD')}, {headers: {'Private-Token': process.env.GL_KEY}})
      .then(response => {
        res.status(200).send("Success")
      })
      .catch(err => {
        res.status(200).send("Already added")
      })
  },

  getProjects: (req, res) => {
    axios.get(`https://gitlab.com/api/v4/groups/2487502/`, {headers: {'Private-Token': process.env.GL_KEY}})
    .then(response => {
      console.log(response.data.projects)
        res.status(200).json({assessments: response.data.projects})
      })
      .catch(err => console.log('err', err))
  }
}