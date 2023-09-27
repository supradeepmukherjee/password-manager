const maskPassword = password => {
    let str = ''
    for (let i = 0; i < password.length; i++) str += '*'
    return str
}

const update = () => {
    let tb = document.querySelector('table')
    let data = localStorage.getItem('passwords')

    if (!data || !JSON.parse(data).length) tb.innerHTML = 'No Data to show'
    else {
        tb.innerHTML = `
            <tr>
                <th>
                    Website
                </th>
                <th>
                    Username
                </th>
                <th>
                    Password
                </th>
                <th>
                    Delete
                </th>
            </tr>
        `
        JSON.parse(data).forEach(elem => {
            str = `
        <tr>
            <td>
                ${elem.website}
            </td>
            <td>
                ${elem.username}
            </td>
            <td>
                ${maskPassword(elem.password)} 
                <button class='del' onClick="copy('${elem.password}')">
                    Copy
                </button>
            </td>
            <td>
                <button class='del' onClick="del('${elem.website}')">
                    X
                </button>
            </td>
        </tr>
        `
            tb.innerHTML = tb.innerHTML + str
        });
    }
    website.value = ''
    username.value = ''
    password.value = ''
}
update()

const copy = async text => {
    await navigator.clipboard.writeText(text)
    alert('copied')
}

const del = website => {
    let data = localStorage.getItem('passwords')
    arrUpdated = JSON.parse(data).filter(e => e.website != website)
    localStorage.setItem('passwords', JSON.stringify(arrUpdated))
    update()
    alert(`deleted ${website}`)
}

document.querySelector('.btn').addEventListener('click', e => {
    e.preventDefault()
    let passwords = localStorage.getItem('passwords')
    if (!passwords) {
        let json = []
        json.push({ username: username.value, password: password.value, website: website.value })
        localStorage.setItem('passwords', JSON.stringify(json))
        alert('saved')
    } else {
        let json = JSON.parse(localStorage.getItem('passwords'))
        json.push({ username: username.value, password: password.value, website: website.value })
        localStorage.setItem('passwords', JSON.stringify(json))
        alert('saved')
    }
    update()
})