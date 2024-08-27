import { Icon, divIcon, point } from "leaflet";
import laboratoryIconUrl from "../icons/Laboratory.png";
import researchFacilityIconUrl from "../icons/ResearchFacility.png";
import sponsorCompanyIconUrl from "../icons/SponsorCompany.png";


//<---ICONS--->
const laboratoryIcon = new Icon({
    iconSize: [50, 50],
    iconUrl: laboratoryIconUrl,
  });
  
  const researchFacilityIcon = new Icon({
    iconSize: [50, 50],
    iconUrl: researchFacilityIconUrl,
  });
  
  const sponsorCompanyIcon = new Icon({
    iconSize: [50, 50],
    iconUrl: sponsorCompanyIconUrl,
  });
  //<---!ICONS--->

  //<---SETTING ICONS ACCORDING TO ROLES ---> 
  export const setIconForRole = (role) => {
    switch (role) {
      case "Sponsor Company":
        return sponsorCompanyIcon;
      case "Laboratory":
        return laboratoryIcon;
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