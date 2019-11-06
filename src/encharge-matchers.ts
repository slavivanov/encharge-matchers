// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
import "core-js";
import * as _ from "lodash";

export interface EventPropertyFilter {
  propertyName: string;
  condition:
    | "is"
    | "is not"
    | "contains"
    | "does not contain"
    | "starts with"
    | "ends with"
    | "does not start with"
    | "does not end with"
    | "is more than"
    | "is less than"
    | "is empty"
    | "is not empty";
  propertyValue: string;
}

export const eventPassesFilters = ({
  event,
  filters
}: {
  event: { [propertyName: string]: any };
  filters: EventPropertyFilter[];
}) => {
  let propertiesSatisfyFilters = true;
  _.each(filters, filter => {
    switch (filter.condition) {
      case "is": {
        const property = event[filter.propertyName];
        // null and undefined are considered not equal to anything
        if (_.isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast the filter value to the type of the segment property
        if (property !== castTo(filter.propertyValue, typeof property)) {
          propertiesSatisfyFilters = false;
        }
        break;
      }

      case "is not": {
        const property = event[filter.propertyName];
        // null and undefined are considered not equal to anything
        if (!_.isNil(property)) {
          // cast the filter value to the type of the segment property
          if (property === castTo(filter.propertyValue, typeof property)) {
            propertiesSatisfyFilters = false;
          }
        }
        break;
      }

      case "contains": {
        const property = event[filter.propertyName];
        // null and undefined are considered not equal to anything
        if (_.isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (!String(property).includes(String(filter.propertyValue))) {
          propertiesSatisfyFilters = false;
        }
        break;
      }

      case "does not contain": {
        const property = event[filter.propertyName];
        // null and undefined are considered not equal to anything
        if (_.isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (String(property).includes(String(filter.propertyValue))) {
          propertiesSatisfyFilters = false;
        }
        break;
      }

      case "starts with": {
        const property = event[filter.propertyName];
        // null and undefined are considered not equal to anything
        if (_.isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (!String(property).startsWith(String(filter.propertyValue))) {
          propertiesSatisfyFilters = false;
        }
        break;
      }
      case "does not start with": {
        const property = event[filter.propertyName];
        // null and undefined are considered not equal to anything
        if (_.isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (String(property).startsWith(String(filter.propertyValue))) {
          propertiesSatisfyFilters = false;
        }
        break;
      }
      case "ends with": {
        const property = event[filter.propertyName];
        // null and undefined are considered not equal to anything
        if (_.isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (!String(property).endsWith(String(filter.propertyValue))) {
          propertiesSatisfyFilters = false;
        }
        break;
      }
      case "does not end with": {
        const property = event[filter.propertyName];
        // null and undefined are considered not equal to anything
        if (_.isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (String(property).endsWith(String(filter.propertyValue))) {
          propertiesSatisfyFilters = false;
        }
        break;
      }

      case "is more than": {
        const property = event[filter.propertyName];
        // null and undefined are considered not equal to anything
        if (_.isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (Number(property) <= Number(filter.propertyValue)) {
          propertiesSatisfyFilters = false;
        }
        break;
      }

      case "is less than": {
        const property = event[filter.propertyName];
        // null and undefined are considered not equal to anything
        if (_.isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (Number(property) >= Number(filter.propertyValue)) {
          propertiesSatisfyFilters = false;
        }
        break;
      }

      case "is empty": {
        const property = event[filter.propertyName];
        // null and undefined are considered empty
        if (property !== "" && !_.isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        break;
      }
      case "is not empty": {
        const property = event[filter.propertyName];
        // null and undefined are considered not equal to anything
        if (property === "" || _.isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        break;
      }

      default:
        break;
    }
  });
  return propertiesSatisfyFilters;
};

// Cast value to type
const castTo = (value: any, type: string) => {
  if (type === "boolean") {
    if (String(value).toLowerCase() === "true") {
      return true;
    }
    if (String(value).toLowerCase() === "false") {
      return false;
    }
  }
  if (type === "number" || type === "bigint") {
    return Number(value);
  }
  if (type === "string") {
    return String(value);
  }
  // no suitable cast found
  return value;
};
