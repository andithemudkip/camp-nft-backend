const getCloudflareURL = (url) => `https://cloudflare-ipfs.com/ipfs/${url.replace ("ipfs://", "")}`;

const getDwebURL = (url) => {
    let [hash, filename] = url.replace("ipfs://", "").split("/")
    return `https://${hash}.ipfs.dweb.link/${filename}`
}

const getInfuraURL = url => `https://camp.infura-ipfs.io/ipfs/${url.replace ("ipfs://", "")}`;

module.exports = {
    getCloudflareURL,
    getDwebURL,
    getInfuraURL
}