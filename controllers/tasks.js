const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(201).json({ tasks })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const createNewTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getSingleTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })

    if (!task) {
      return res.status(404).json({ msg: `No task with ID : ${taskID}` }) // you get this error when number of _id characters are same but value is different
    }

    res.status(201).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error }) // you get this error when number of _id characters are not same.
  }
  //res.json({ id: req.params.id })
}

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true
    })

    if (!task) {
      return res.status(404).json({ msg: `No task with ID : ${taskID}` })
    }

    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })

    if (!task) {
      return res.status(404).json({ msg: `No task with ID : ${taskID}` }) // you get this error when number of _id characters are same but value is different
    }

    //res.status(201).json({deleteTask})
    //res.status(201).send()
    res.status(201).json({ deleteTask: null, status: 'success' })
  } catch (error) {
    res.status(500).json({ msg: error }) // you get this error when number of _id characters are not same.
  }
}

module.exports = {
  getAllTasks,
  createNewTask,
  getSingleTask,
  updateTask,
  deleteTask
}
