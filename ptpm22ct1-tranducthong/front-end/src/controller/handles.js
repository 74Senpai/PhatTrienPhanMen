
import InformationTechnology from '../componests/pages.js';


function changePages(site, setContents) {
    switch (site) {
      case "Home":
        // setContents(<Home />);
        break;
      case "Hello":
        // setContents(<Hello />);
        break;
      case "IT":
        setContents(<InformationTechnology />);
        break;
      default:
        setContents("Default");
    }
}

export default changePages;