export class CssReloader {
  static reload(...params) {
    new CssReloader(...params).reload();
  }

  reload() {
    console.debug("CSS reloaded");

    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      link.setAttribute('href', `${href}?reload=${Date.now()}`);
    });
  }
}
