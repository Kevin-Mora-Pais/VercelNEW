import { connectToDatabase } from '../lib/database'

module.exports = async (req, res) => {
    let userSearch


    const db = await connectToDatabase();
    const collection = await db.collection("users");
    if (req.method === 'POST') {
        try {

            userSearch = await collection.find({ email: req.body.email, passwd: req.body.passwd }).toArray();
            console.log(userSearch)
            let conf = true
            try {
                userSearch[0].email



            } catch (err) {
                conf = false;
                return res.json({
                    _links: {
                        self: {
                            href: 'http://localhost:3000/login2'
                        }
                    },
                    found: "false"

                })
            }
            if (conf == true) {
                return res.status(404).json({
                    _links: {
                        self: {
                            href: 'http://localhost:3000/login1'
                        }
                    },
                    userSearch
                })
            }


        } catch (err) {
            return res.status(500).json({ error: console.log(err) })
        }
    }
}