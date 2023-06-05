
// UTILITIES

function download(json_data, file_name) {
    const data_string = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json_data));

    const link_element = document.createElement('a')
    link_element.setAttribute("href", data_string)
    link_element.setAttribute("download", file_name)

    document.body.appendChild(link_element)
    link_element.click()
}


const data = document.querySelectorAll('pub-dita-content')

const text_arr = []

data.forEach((entry) => {
  const header = `#${entry.querySelector('div.paragraphId').innerText}\n`

  let definitions = ''

  const links = entry.querySelectorAll('a') ?? []

  links.forEach((link) => {
    const def = `${link.innerText}:\n${link.title}\n${link.href}\n`
    definitions += def
  })

  const content = entry.querySelector('div.print-content').innerText

  text_arr.push(`${header}---\n${definitions}---\n${content}`)
})

const title = document.querySelector('div#main-section-name')
const file_handle = title.textContent.trim().toLowerCase().replaceAll(' ', '_')

download(text_arr, `${file_handle}.json`)