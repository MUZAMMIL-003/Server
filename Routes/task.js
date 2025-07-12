import express from 'express';
import HelperFunction from '../HelperFunction/HelperFunction.js';

const router = express.Router();



let data = [
    { id: 1, task: "Sample Task 1" , completed: false },
    { id: 2, task: "Sample Task 2" , completed: true },
    { id: 3, task: "Sample Task 3", completed: false },
]


router.get('/', (req, res) => { // Get all Data
    HelperFunction(res, 200, false, data, 'Tasks retrieved successfully');
});


router.get('/:id', (req, res) => { // Get simple Data
    const { id } = req.params;
    if (!id) {
        return HelperFunction(res, 400, true, null, 'Task ID for retrieval is required');
    }
    const task = data.find(t => t.id === parseInt(id, 10));
    if (!task) {
        return HelperFunction(res, 404, true, null, 'Task not found');
    }
    HelperFunction(res, 200, false, task, 'Task retrieved successfully');
});

router.post('/', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return HelperFunction(res, 400, true, null, 'Task is required');
    }

    const newTask = {
        id: data.length + 1,
        task
    };

    data = [...data, newTask];
    HelperFunction(res, 201, false, data, 'Task added successfully');
});

router.put('/:id', (req, res) => { // update Data
    const { id } = req.params;
    const { task } = req.body;
    if (!id) {
        return HelperFunction(res, 400, true, null, 'Task ID for update is required');
    }

    const updatedTask = {
        id: parseInt(id, 10),
        task
    };

    data = [...data, updatedTask];
    HelperFunction(res, 200, false, data, 'Task updated successfully');
});

router.delete('/:id', (req, res) => { // delete Data
    const { id } = req.params;

    if (!id) {
        return HelperFunction(res, 400, true, null, 'Task ID is required');
    }

    const taskId = parseInt(id, 10);

    const filteredData = data.filter(task => task.id !== taskId);

    if (filteredData.length === data.length) {
        return HelperFunction(res, 404, true, null, 'Task not found');
    }

    data = filteredData;

    HelperFunction(res, 200, false, data, 'Task deleted successfully');
});


export default router;