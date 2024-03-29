
/**
 * Found react jss implentation/integration here:
 * https://medium.com/wesionary-team/implementing-react-jss-on-next-js-projects-7ceaee985cad
 */
import Document, { Html, Head, Main, NextScript } from "next/document";
import { SheetsRegistry, JssProvider, createGenerateId } from "react-jss";
class MyDocument extends Document {
  static async getInitialProps(ctx:any) {
    const registry = new SheetsRegistry();
    const generateId = createGenerateId();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        // eslint-disable-next-line react/display-name
        enhanceApp: (App:any) => (props:any) => (
          <JssProvider registry={registry} generateId={generateId}>
            <App {...props} />
          </JssProvider>
        ),
      });
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="server-side-styles">{registry.toString()}</style>
        </>
      ),
    };
  }
  render() {
    return (
      <Html style={{
        height: '100%',
        width: '100%'
      }}>
        <Head>
          <link rel="icon" href="/cube.svg" />
        </Head>
        <body style={{
          height: '100%',
          width: '100%'
        }}>
          <Main/>
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument