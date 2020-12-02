import { connectToDatabase } from '../lib/database'
const cors = require('cors')

module.exports = async (req, res) => {
    let userSearch


    const db = await connectToDatabase();
    const collection = await db.collection("users");
    if (req.method === 'POST') {
        try {

            userSearch = await collection.find({ email: req.body.email, passwd: req.body.passwd }).toArray();

            let conf = true
            try {
                userSearch[0].email

            } catch (err) {
                conf = false;
                return res.json({
                    _links: {
                        self: {
                            href: 'https://vercelworking-ej6t36ecv.vercel.app/api/login'
                        }
                    },
                    found: "false"

                })
            }
            if (conf == true) {
                return res.json({
                    _links: {
                        self: {
                            href: 'https://vercelworking-ej6t36ecv.vercel.app/api/login'
                        }
                    },
                    email: userSearch[0].email,
                    rol: userSearch[0].userType
                })
            }


        } catch (err) {
            return res.status(500).json({ error: console.log(err) })
        }
    }

    const allowCors = fn => async (req, res) => {
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Access-Control-Allow-Origin', '*')
        // another common pattern
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )
        if (req.method === 'OPTIONS') {
            res.status(200).end()
            return
        }
        return await fn(req, res)
    }

    const handler = (req, res) => {
        const d = new Date()
        res.end(d.toString())
    }

    module.exports = allowCors(handler)

}