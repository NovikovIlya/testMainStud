export function copyFileDocument(token: string, id: string) {
    fetch(`https://newlk.kpfu.ru/services/api-practices/contracts/copy-file/${id}`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    }).then(data => data.blob())
        .then(x => {
            const url = URL.createObjectURL(new Blob([x]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'Скан договора.pdf')
            document.body.appendChild(link)
            link.click()
        })
}