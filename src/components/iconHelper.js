import { Icon, divIcon, point } from "leaflet";
import researchGroupIconUrl from "../icons/Laboratory.png";
import researchFacilityIconUrl from "../icons/ResearchFacility.png";
import companyIconUrl from "../icons/SponsorCompany.png";


//<---ICONS--->
const researchGroupIcon = new Icon({
    iconSize: [50, 50],
    iconUrl: researchGroupIconUrl,
  });
  
  const researchFacilityIcon = new Icon({
    iconSize: [50, 50],
    iconUrl: researchFacilityIconUrl,
  });
  
  const companyIcon = new Icon({
    iconSize: [50, 50],
    iconUrl: companyIconUrl,
  });
  //<---!ICONS--->

  //<---SETTING ICONS ACCORDING TO ROLES ---> 
  export const setIconForRole = (role) => {
    switch (role) {
      case "Company":
        return companyIcon;
      case "Research Group":
        return researchGroupIcon;
      case "Research Facility":
        return researchFacilityIcon;
      default:
        return null; // or a default icon if applicable
    }
  };

  // <---!CLUSTER POINTS FUNCTIONALITY --->
export const createClusterCustomIcon = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true)
    });
  };
  //<---!SETTING ICONS ACCORDING TO ROLES ---> 
