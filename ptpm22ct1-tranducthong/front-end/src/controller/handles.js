import Account from '../componests/Login_Sigup_Account';
import Home from '../componests/BASE/Home.js';
import Pages from '../componests/BASE/pages.js';
import BlogManage from '../componests/Blog';

function changePages(site, setContents) {
    
    site = site.toUpperCase();
    // console.log(site);
    switch (site) {
      case "HOME":
        setContents(<Home />);
        break;
      case "IT":
        setContents(<Pages />);
      break;
      case "LOGIN":
        setContents(<Account />);
        break;
      case "BLOG":
        setContents(<BlogManage />);
        break;
      default:
        setContents("Default");
    }
}


export default changePages;