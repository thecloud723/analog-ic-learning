(() => {
  function revealFormulaRef() {
    const id = location.hash.slice(1);
    if (!/^f\d{2}-\d{3}$/.test(id)) return;
    const ref = document.getElementById(id);
    const panel = ref?.closest('section[role="tabpanel"]');
    if (!panel) return;
    const position = /^p(\d+)$/.exec(panel.id);
    const button = document.getElementById(panel.getAttribute('aria-labelledby'))
      ?? document.querySelector('[role="tab"][aria-controls="'+panel.id+'"]')
      ?? (position ? document.querySelector('[role="tab"][data-tab="'+(Number(position[1])-1)+'"]') : null);
    if (button && (panel.hidden || button.getAttribute('aria-selected') !== 'true')) {
      button.click();
      if (location.hash !== '#' + id) history.replaceState(history.state, '', '#' + id);
    }
    for (let details = ref.closest('details'); details; details = details.parentElement.closest('details')) {
      details.open = true;
    }
    requestAnimationFrame(() => ref.scrollIntoView({block:'center'}));
  }
  addEventListener('hashchange', revealFormulaRef);
  revealFormulaRef();
})();
