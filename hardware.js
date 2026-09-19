/* Presentation helpers keep saved IDs and imported configurations stable. */
(function(root){
  'use strict';
  const locales={es:'es-EC',en:'en-US',zh:'zh-CN'};
  const format=(n,lang='es')=>new Intl.NumberFormat(locales[lang]||locales.es,{maximumFractionDigits:2}).format(n);
  function capacity(value,kind='memory',lang='es'){
    if(!Number.isFinite(value))return '—';
    if(kind==='storage')return format(value>=1000?value/1000:value,lang)+(value>=1000?' TB':' GB');
    return format(value>0&&value<1?value*1024:value,lang)+(value>0&&value<1?' MB':' GB');
  }
  function name(item,lang='es'){
    if(!item)return '';
    const index={es:0,en:1,zh:2}[lang]||0;
    let text=item.name.replace(/(\d)(GB|MB)\b/g,'$1 $2').replace(/\b2304SP\b/g,'2304 SP');
    text=text.replace(/\s+FE$/,' (Founders Edition)');
    if(item.kind==='profile'){
      text=text.replace(/^Perfil /,['Perfil ','Profile ','配置 '][index]);
      text=text.replace(/3\.5-inch/g,['3,5 pulgadas','3.5-inch','3.5 英寸'][index]).replace(/2\.5-inch/g,['2,5 pulgadas','2.5-inch','2.5 英寸'][index]);
      if(item.type==='HDD')text=`HDD SATA · ${capacity(item.capacity,'storage',lang)} · ${['3,5 pulgadas','3.5-inch','3.5 英寸'][index]}`;
      if(item.modules){
        const ddr=item.memory==='DDR (DDR1)'?'DDR1':item.memory;
        text=`${item.form} · ${ddr}-${item.speed} · ${capacity(item.capacity,'memory',lang)} (${item.modules} × ${capacity(item.capacity/item.modules,'memory',lang)}) · CL${format(item.cl,lang)}`;
      }
    }
    return text;
  }
  function form(value,lang='es'){
    const map={'External':['Externo','External','外置'],'Air':['Aire','Air','风冷'],'3.5-inch':['3,5 pulgadas','3.5-inch','3.5 英寸'],'2.5-inch':['2,5 pulgadas','2.5-inch','2.5 英寸']};
    return map[value]?.[{es:0,en:1,zh:2}[lang]||0]||value;
  }
  root.PC_FORMAT={name,capacity,number:format,form};
})(typeof window!=='undefined'?window:globalThis);
