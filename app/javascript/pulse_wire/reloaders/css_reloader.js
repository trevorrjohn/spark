export class CssReloader {
  reload() {
    console.debug("CSS reloaded")

    const links = document.querySelectorAll('link[rel="stylesheet"]')
    links.forEach(link => {
      const href = link.getAttribute('href')
      link.setAttribute('href', `${href}?reload=${Date.now()}`)
    })
  }
}
