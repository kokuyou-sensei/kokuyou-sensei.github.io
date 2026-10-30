// GA4計測(script.jsを読み込まない静的ページ用の共有スニペット)。
// ローカル開発サーバーからのアクセスは除外し、本番GA4へのダミーpageview記録を防ぐ。
(function () {
  const GA_MEASUREMENT_ID = 'G-NHH50DVLVN';
  const isLocalDev = ['localhost', '127.0.0.1', ''].includes(location.hostname);
  if (!GA_MEASUREMENT_ID || isLocalDev) return;
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(gaScript);
  window.dataLayer = window.dataLayer || [];
  // window.gtagとして公開(script.js/spinoff-common.jsのシェアイベント計測から呼べるようにするため)
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  // 結果の符号(?r=・?guess=)などのクエリは送らない。参照元も同じくクエリ・ハッシュを除く(2026-10-31)
  let referrer = '';
  try { if (document.referrer) { const r = new URL(document.referrer); referrer = r.origin + r.pathname; } } catch (e) { referrer = ''; }
  window.gtag('config', GA_MEASUREMENT_ID, { page_location: location.origin + location.pathname, page_referrer: referrer });
})();
