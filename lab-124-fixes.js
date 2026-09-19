/* Final 1.24.0 CPU Lab repair layer: one tab controller, expanded history,
   explicit current models, and a reliable way back to the PC builder. */
(() => {
  'use strict';
  window.APP_BUILD = '1.24.0';
  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const language = () => {
    const value = (q('#language')?.value || document.documentElement.lang || 'es').toLowerCase();
    return value.startsWith('en') ? 'en' : value.startsWith('zh') ? 'zh' : 'es';
  };
  const text = {
    es:{back:'Volver al constructor 3D',version:'CPU LAB · 1.24.0',historyA:'K8 · DDR/DDR1',historyI:'Prescott · DDR/DDR1'},
    en:{back:'Back to the 3D builder',version:'CPU LAB · 1.24.0',historyA:'K8 · DDR/DDR1',historyI:'Prescott · DDR/DDR1'},
    zh:{back:'返回 3D 装机工具',version:'CPU LAB · 1.24.0',historyA:'K8 · DDR/DDR1',historyI:'Prescott · DDR/DDR1'}
  };

  function extendModels() {
    if (typeof models === 'undefined' || !Array.isArray(models)) return;
    const additions = [
      ['AMD','Athlon 64','Athlon 64 3200+ (Socket 939)','K8 / 2004','1','1','2.0 GHz','512 KB L2','67 W','No'],
      ['Intel','Pentium 4','Pentium 4 3.0E (Socket 478)','Prescott / 2004','1','2','3.0 GHz','1 MB L2','89 W','No'],
      ['AMD','Ryzen 5','Ryzen 5 9500F','9000','6','12','3.8 / 5.0 GHz','38 MB (L2 + L3)','65 W','No'],
      ['AMD','Ryzen 5','Ryzen 5 9600','9000','6','12','3.8 / 5.2 GHz','38 MB (L2 + L3)','65 W','AMD Radeon Graphics'],
      ['AMD','Ryzen X3D','Ryzen 7 9850X3D','9000X3D','8','16','4.7 / 5.6 GHz','104 MB (L2 + L3)','120 W','AMD Radeon Graphics']
    ];
    const known = new Set(models.map(row => row[2]));
    additions.forEach(row => { if (!known.has(row[2])) models.push(row); });
  }

  function installNavigation() {
    if (!q('#pcLabBack')) {
      const nav = document.createElement('nav');
      nav.id = 'pcLabBack';
      nav.innerHTML = '<a href="./index.html"></a><span></span>';
      document.body.appendChild(nav);
    }
    if (!q('#pcLab124Style')) {
      const style = document.createElement('style');
      style.id = 'pcLab124Style';
      style.textContent = [
        '#pcLabBack{position:fixed;right:14px;bottom:14px;z-index:10000;display:flex;align-items:center;gap:9px;padding:8px 10px;border:1px solid #385778;border-radius:12px;background:#081321ed;box-shadow:0 10px 30px #0008;backdrop-filter:blur(10px)}',
        '#pcLabBack a{color:#dcecff;font-size:12px;font-weight:800;text-decoration:none}',
        '#pcLabBack span{color:#78b9ff;font:10px ui-monospace,monospace}',
        '#tab-gens .timeline{grid-template-columns:repeat(12,minmax(150px,1fr))}',
        '@media(max-width:760px){header{position:relative!important;padding:10px 12px!important}header .top{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;align-items:center!important;gap:8px!important}header .title-zone{grid-column:1/2!important}header .title-zone .sub,header .brand-duo,header .brand-tech,header .touch-chip,header .lang>span:first-child{display:none!important}header .title-zone h1{font-size:20px!important;margin:0!important;padding:0!important}header .lang{grid-column:2/3!important;display:flex!important;width:auto!important;gap:0!important}header .lang select{width:104px!important;min-height:42px!important;padding:7px 9px!important;border-radius:11px!important}header .v15-header-actions{grid-column:1/-1!important;display:grid!important;grid-template-columns:1fr 1fr auto!important;gap:6px!important;width:100%!important}header .v15-action,header .v15-status{min-height:42px!important;padding:7px 8px!important;border-radius:11px!important;font-size:12px!important}header .v15-header-actions>.v15-status{grid-column:auto!important;white-space:nowrap!important}#pcLabBack{left:10px;right:10px;bottom:86px;justify-content:space-between}#tab-gens .timeline{grid-template-columns:repeat(12,145px)}}',
        '@media(max-width:390px){header .v15-header-actions{grid-template-columns:1fr 1fr auto!important}header .v15-status{font-size:0!important;min-width:42px!important}header .v15-status i{margin:0!important}}'
      ].join('\n');
      document.head.appendChild(style);
    }
  }

  function localizeNavigation() {
    const value = text[language()];
    const nav = q('#pcLabBack');
    if (!nav) return;
    q('a', nav).textContent = '← ' + value.back;
    q('span', nav).textContent = value.version;
  }

  function extendTimeline() {
    const timeline = q('#tab-gens .timeline');
    if (!timeline || q('[data-pc-history="1"]', timeline)) return;
    const make = (brand, year, name, description) => {
      const card = document.createElement('article');
      card.className = 'tl-card ' + brand;
      card.dataset.pcHistory = '1';
      card.innerHTML = `<span class="year">${year}</span><b>${name}</b><small>${description}</small>`;
      return card;
    };
    const axis = q('.axis', timeline);
    axis.insertAdjacentElement('afterend', make('amd','2003–04','AMD Athlon 64',text[language()].historyA));
    q('[data-pc-history="1"]', timeline).insertAdjacentElement('afterend', make('intel','2004','Intel Pentium 4',text[language()].historyI));
  }

  function localizeTimeline() {
    const cards = qa('[data-pc-history="1"]');
    if (cards[0]) q('small', cards[0]).textContent = text[language()].historyA;
    if (cards[1]) q('small', cards[1]).textContent = text[language()].historyI;
  }

  function localizeModelMeta() {
    const labels = {
      es: {
        Laptop: 'Portátil',
        Desktop: 'Escritorio',
        Embedded: 'Integrado',
        'Embedded / Workstation': 'Integrado / estación de trabajo'
      },
      en: {
        Portátil: 'Laptop',
        Escritorio: 'Desktop',
        Integrado: 'Embedded',
        'Integrado / estación de trabajo': 'Embedded / Workstation'
      },
      zh: {
        Laptop: '笔记本电脑',
        Desktop: '台式机',
        Embedded: '嵌入式',
        'Embedded / Workstation': '嵌入式 / 工作站',
        Portátil: '笔记本电脑',
        Escritorio: '台式机',
        Integrado: '嵌入式',
        'Integrado / estación de trabajo': '嵌入式 / 工作站'
      }
    }[language()];
    qa('#v5ModelMeta .meta-chip').forEach(chip => {
      const current = chip.textContent.trim();
      if (labels[current]) chip.textContent = labels[current];
    });
  }

  function repairTabs() {
    const bar = q('#architectureSection .arch-tabs');
    if (!bar || bar.dataset.pcLab124Tabs) return;
    const oldButtons = qa('button[data-tab]', bar);
    const current = oldButtons.find(button => button.classList.contains('active'))?.dataset.tab || 'inside';
    oldButtons.forEach(button => button.replaceWith(button.cloneNode(true)));
    const buttons = qa('button[data-tab]', bar);
    const activate = tab => {
      buttons.forEach(button => {
        const selected = button.dataset.tab === tab;
        button.classList.toggle('active', selected);
        button.setAttribute('aria-selected', String(selected));
      });
      qa('#architectureSection .arch-panel').forEach(panel => {
        const selected = panel.id === 'tab-' + tab;
        panel.classList.toggle('hidden', !selected);
        panel.classList.add('visible');
        panel.hidden = false;
        panel.setAttribute('aria-hidden', String(!selected));
      });
    };
    buttons.forEach(button => button.addEventListener('click', event => {
      event.preventDefault();
      activate(button.dataset.tab);
    }));
    bar.dataset.pcLab124Tabs = '1';
    window.activateCpuLabTab = activate;
    activate(current);
  }

  function refreshCatalog() {
    try { window.populateFamilies?.(); } catch (error) {}
    try { window.populateGenerations?.(); } catch (error) {}
    try { window.render?.(); } catch (error) {}
    try { window.populateSelects?.(); } catch (error) {}
    try { window.compare?.(); } catch (error) {}
    try { window.updateCoreBench?.(); } catch (error) {}
    try { window.updSpecs?.(); } catch (error) {}
  }

  extendModels();
  installNavigation();
  extendTimeline();
  repairTabs();
  localizeNavigation();
  localizeTimeline();
  q('#v5Model')?.addEventListener('change', () => setTimeout(localizeModelMeta, 140));
  q('#language')?.addEventListener('change', () => setTimeout(() => {
    localizeNavigation();
    localizeTimeline();
    localizeModelMeta();
    repairTabs();
  }, 180));
  setTimeout(refreshCatalog, 30);
  setTimeout(() => { repairTabs(); localizeNavigation(); localizeModelMeta(); }, 700);
})();
