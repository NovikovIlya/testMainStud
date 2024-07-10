export function practiceDocument(token: string, url: string) {
    fetch(`https://newlk.kpfu.ru/services/api-practices/contracts/agreement-file/${url}`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    }).then(data => data.blob())
        .then(x => {
            const url = URL.createObjectURL(new Blob([x]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'практика.doc')
            document.body.appendChild(link)
            link.click()
        })
}