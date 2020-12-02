import { connectToDatabase } from '../lib/database'

module.exports = async (req, res) => {
    let loanSearch
    let userSearch

    const db = await connectToDatabase();
    const collectionT = await db.collection("loans");
    const collectionU = await db.collection("users");
    if (req.method === 'POST') {
        try {
            userSearch = await collectionU.find({ email: req.body.email }).toArray();
            loanSearch = await collectionT.find({}).toArray();
            let conf = true
            try {
                userSearch[0].email
            } catch {
                conf = false
                console.log(req.body.email)
                return res.json({
                    _links: {
                        self: {
                            href: 'https://vercelworking-ej6t36ecv.vercel.app/api/returnLoans'
                        }
                    },
                    message: "User not found"

                })

            }

            if (conf == true) {
                if (userSearch[0].userType == "ADMIN") {

                    try {
                        loanSearch[0].userName

                    } catch (err) {
                        conf = false;
                        return res.json({
                            _links: {
                                self: {
                                    href: 'https://vercelworking-ej6t36ecv.vercel.app/api/returnLoans'
                                }
                            },
                            message: "No loans found"

                        })
                    }

                    if (conf == true) {
                        return res.json({
                            _links: {
                                self: {
                                    href: 'https://vercelworking-ej6t36ecv.vercel.app/api/returnLoans'
                                }
                            },
                            loans: loanSearch,
                            test: loanSearch[0].state

                        })
                    }

                } else {
                    return res.json({
                        _links: {
                            self: {
                                href: 'https://vercelworking-ej6t36ecv.vercel.app/api/returnLoans'
                            }
                        },
                        message: "Access denied"

                    })
                }
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