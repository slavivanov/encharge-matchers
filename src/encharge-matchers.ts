// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
import { get, each, isNil } from "lodash";

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
  each(filters, filter => {
    const property = get(event, filter.propertyName);
    switch (filter.condition) {
      case "is": {
        // null and undefined are considered not equal to anything
        if (isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast the filter value to the type of the segment property
        if (property !== castTo(filter.propertyValue, typeof property)) {
          propertiesSatisfyFilters = false;
        }
        break;
      }

      case "is not": {
        // null and undefined are considered not equal to anything
        if (!isNil(property)) {
          // cast the filter value to the type of the segment property
          if (property === castTo(filter.propertyValue, typeof property)) {
            propertiesSatisfyFilters = false;
          }
        }
        break;
      }

      case "contains": {
        // null and undefined are considered not equal to anything
        if (isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (!String(property).includes(String(filter.propertyValue))) {
          propertiesSatisfyFilters = false;
        }
        break;
      }

      case "does not contain": {
        // null and undefined are considered not equal to anything
        if (isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (String(property).includes(String(filter.propertyValue))) {
          propertiesSatisfyFilters = false;
        }
        break;
      }

      case "starts with": {
        // null and undefined are considered not equal to anything
        if (isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (!String(property).startsWith(String(filter.propertyValue))) {
          propertiesSatisfyFilters = false;
        }
        break;
      }
      case "does not start with": {
        // null and undefined are considered not equal to anything
        if (isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (String(property).startsWith(String(filter.propertyValue))) {
          propertiesSatisfyFilters = false;
        }
        break;
      }
      case "ends with": {
        // null and undefined are considered not equal to anything
        if (isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (!String(property).endsWith(String(filter.propertyValue))) {
          propertiesSatisfyFilters = false;
        }
        break;
      }
      case "does not end with": {
        // null and undefined are considered not equal to anything
        if (isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (String(property).endsWith(String(filter.propertyValue))) {
          propertiesSatisfyFilters = false;
        }
        break;
      }

      case "is more than": {
        // null and undefined are considered not equal to anything
        if (isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (Number(property) <= Number(filter.propertyValue)) {
          propertiesSatisfyFilters = false;
        }
        break;
      }

      case "is less than": {
        // null and undefined are considered not equal to anything
        if (isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        // cast both to string to make sure
        if (Number(property) >= Number(filter.propertyValue)) {
          propertiesSatisfyFilters = false;
        }
        break;
      }

      case "is empty": {
        // null and undefined are considered empty
        if (property !== "" && !isNil(property)) {
          propertiesSatisfyFilters = false;
        }
        break;
      }
      case "is not empty": {
        // null and undefined are considered not equal to anything
        if (property === "" || isNil(property)) {
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
