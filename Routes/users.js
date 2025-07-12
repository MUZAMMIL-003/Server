import express from "express"
const router = express.Router()

const users = [
    { name : "abc",
        email : "abc@gmail.com",
        id: 1.
    }
]

router.get('/', (req, res) => {
    res.status(200).json({
        data: users,
        message: "Users fetched successfully",
        error: false,
    })
});


router.post('/', (req, res) => {
    const { name, email, } = req.body;
    users.push({ name, email, id: users.length + 1 });
    res.status(201).json({
        data: users,
        message: "User created successfully",
        error: false,
    });
});


router.post('/:id', (req, res) => {
    
  const user = users.find(data => data.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({
            message: "User not found",
            error: true,
            data: null,
        });
    }
    res.status(200).json({
        data: users,
        message: "User created successfully",
        error: false,
    });
});

router.put('/:id', (req, res) => {
    const user = users.find(data => data.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({
            message: "User not found",
            error: true,
            data: null,
        });
    }
    const { name, email } = req.body;
    user.name = name;
    user.email = email;
    res.status(200).json({
        data: users,
        message: "User updated successfully",
        error: false,
    });
});


router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(data => data.id === parseInt(req.params.id)); 
    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found",
            error: true,
            data: null,
        });
    }
    users.splice(userIndex, 1);
    res.status(200).json({
        data: users,
        message: "User deleted successfully",
        error: false,
    });
});


export default router;