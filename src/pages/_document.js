import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <Script
          type="text/javascript"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          const SiteType = {
            BeeSubfolder: 'BeeSubfolder',
            Web2Root: 'Web2Root',
        };
    
        function detectSiteType() {
            let type = SiteType.Web2Root;
            let url = '';
            const parts = window.location.pathname.split('/');
            if (parts.length >= 3 && parts[1] === 'bzz') {
                type = SiteType.BeeSubfolder;
                url = window.location.origin + "/" + parts[1] + "/" + parts[2];
            } else if (parts[1] === 'web3') {
                type = SiteType.BeeSubfolder;
                url = window.location.origin + "/" + "web3";
            }
    
            return {type, url};
        }
    
        function wrapUrl(url) {
            if (detectedSiteType.type === SiteType.BeeSubfolder) {
                return detectedSiteType.url + url;
            }
    
            return document.location.origin + url;
        }
    
        const detectedSiteType = detectSiteType();
        console.log('Site info', detectedSiteType);
        window._detectedSiteType = detectedSiteType;
    
        const base = document.createElement('base');
        base.href = "http://127.0.0.1:3000/test/"
        document.write(base.outerHTML);
          `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
