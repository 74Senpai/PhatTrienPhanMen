
import Home from '../componests/pages.js';


function changePages(site, setContents) {
    switch (site) {
      case "Home":
        setContents(<Home />);
        break;
      case "Hello":
        // setContents(<Hello />);
        break;
      default:
        setContents("Default");
    }
}

export default changePages;