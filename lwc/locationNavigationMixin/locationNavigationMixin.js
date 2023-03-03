import { LightningElement, api, wire } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";

const NAME_FIELD = "customObject__c.Name__c";
const LOCATION_LATITUDE_FIELD = "customObject__c.Location__Latitude__s";
const LOCATION_LONGITUDE_FIELD = "customObject__c.Location__Longitude__s";

const customFields = [
  NAME_FIELD,
  LOCATION_LATITUDE_FIELD,
  LOCATION_LONGITUDE_FIELD
];
export default class locationNavigationMixin extends LightningElement {
  @api recordId;
  name;
  mapMarkers = [];

  @wire(getRecord, {
    recordId: "$recordId",
    fields: customFields
  })
  loadCustom({ error, data }) {
    if (error) {
      console.log(
        "Unexpected error has been occured during getting customObject information"
      );
    } else if (data) {
      this.name = getFieldValue(data, NAME_FIELD);
      const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
      const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD);

      this.mapMarkers = [
        {
          location: { Latitude, Longitude },
          title: this.name,
          description: `Coords: ${Latitude}, ${Longitude}`
        }
      ];
    }
  }
  get cardTitle() {
    return this.name ? `${this.name}'s location` : "customObject location";
  }
}
