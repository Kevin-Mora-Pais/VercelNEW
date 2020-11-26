module.exports = async (req, res =>{
    if (req.method == "GET"){
        res.status(200).JSON({
            name: "test"
        })
    }
})