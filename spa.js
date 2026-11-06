(() => {
  const isInternalPage = href => {
    if (!href || href.startsWith('#') || /^(https?:|mailto:|tel:)/i.test(href) || /\.pdf(?:$|#)/i.test(href)) return false;
    const url = new URL(href, location.href);
    return url.origin === location.origin && /\.html$/i.test(url.pathname);
  };

  const loadPage = async url => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Page request failed: ${response.status}`);
    const html = await response.text();
    document.open();
    document.write(html);
    document.close();
  };

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || link.target || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !isInternalPage(link.href)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    document.body.classList.add('out');
    loadPage(link.href).catch(error => {
      document.body.classList.remove('out');
      console.error(error);
    });
  }, true);
})();
