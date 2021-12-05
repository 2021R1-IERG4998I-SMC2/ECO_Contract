import * as ethers from 'ethers'
import * as express from 'express'

const app = express()

const MEMONIC = process.env.MEMONIC
const CONTRACT_ADDRESS = '0x0d197CDef9AfbBA73d1f18D3eA29803e3da72EA5'

const ABI = [
    'function balanceOf(address owner) public view returns(uint)'
]

app.get('/get', async (req, res) => {
    const provider = ethers.getDefaultProvider('rinkeby')
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
    try{
        const value = await contract.value()
        res.send(value)
    }catch(e){
        res.send(e)
    }
})

app.listen()