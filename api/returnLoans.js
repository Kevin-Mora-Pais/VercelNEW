import { connectToDatabase } from '../lib/database'

module.exports = async (req, res) => {
    let loanSearch


    const db = await connectToDatabase();
    const collection = await db.collection("Loans");
    if (req.method === 'GET') {
        try {

            loanSearch = await collection.find({}).toArray();
       
            let conf = true
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
                    loans: loanSearch
                   
                })
            }


        } catch (err) {
            return res.status(500).json({ error: console.log(err) })
        }
    }
}