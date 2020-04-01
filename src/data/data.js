const data = {
    get: (name) => {
        const data = localStorage.getItem(name)
        return data !== null ? JSON.parse(data) : []
    },
    set: (name, data) => {
        localStorage.setItem(name, JSON.stringify(data))
    }
}

export default data