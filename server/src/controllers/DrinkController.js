module.exports = {
    index(req, res) {
        res.send("get all drinks")
    },
 
    show(req, res) {
        res.send("get drink " + req.params.id)
    },
 
    create(req, res) {
        res.send("create drink")
    },
 
    update(req, res) {
        res.send("update drink " + req.params.id)
    },
 
    delete(req, res) {
        res.send("delete drink " + req.params.id)
    }
}